from ninja import Router
from django.core.handlers.wsgi import WSGIRequest
from django.core.handlers.asgi import ASGIRequest
from .models import TgUser, Referrals, UserDailyReward, DailyReward, Game, Coin, DiscordUser
from .schemas import (
    UserInitSchema,
    UserOut,
    DetailOut,
    UserTokenSchema,
    UserTokenOut,
    DailyOut,
    LeaderboardOut,
    ReferralsOut,
    ScreenIn,
    GameOut,
    GameIn,
    CodeOut,
    UserDiscordIn
)
import jwt
from django.conf import settings
import datetime
import hashlib
import hmac
import base64
import binascii
import os
from economic import (
    WEED_PER_CLICK,
    TOTAL_LEVELS,
    BASE_BAD,
    TOTAL_STAGES,
    LEVEL_TIMES,
    MINIMUM_PERCENTAGE,
)
import random
import math
import requests

router = Router()


def is_far_enough(new_x, new_y, existing_coordinates, min_distance):
    for x, y in existing_coordinates:
        distance = math.sqrt((new_x - x) ** 2 + (new_y - y) ** 2)
        if distance < min_distance:
            return False
    return True


def check_role(id: int):
    headers = {
        "Authorization": "Bot " + os.getenv("DISCORD_TOKEN")
    }

    resp = requests.get(url=f"{settings.DISCORD_URI}/{id}", headers=headers)

    data = resp.json()

    if data.get("code"):
        return False
    
    if settings.DISCORD_ROLE in data.get("roles", []):
        return True

    return all(el in data.get("roles") for el in settings.DISCORD_ROLE)


async def validate(hash_str, init_data, token, c_str="WebAppData"):
    init_data = {k: v for k, v in init_data.items() if v is not None}
    init_data["user"] = (
        "{"
        + ",".join(
            f'"{k}":"{v}"' if isinstance(v, str) else f'"{k}":{str(v).lower()}'
            for k, v in init_data["user"].items()
        )
        + "}"
    )

    _ = []

    for i in init_data.keys():
        _.append([i, str(init_data[i])])

    _ = sorted(_)

    init_data = "\n".join([f"{rec[0]}={rec[1]}" for rec in _])

    secret_key = hmac.new(c_str.encode(), token.encode(), hashlib.sha256).digest()
    data_check = hmac.new(secret_key, init_data.encode(), hashlib.sha256)

    return data_check.hexdigest() == hash_str


async def authenticate(request: WSGIRequest | ASGIRequest):
    _token = request.headers.get("Authorization")

    if not _token:
        return

    try:
        _payload = jwt.decode(jwt=_token, key=settings.SECRET_KEY, algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidSignatureError, jwt.DecodeError):
        return

    _user = _payload.get("user", None)

    if _user:
        return _user

    return


@router.get("/", auth=authenticate, response={200: UserOut})
async def me(request: WSGIRequest | ASGIRequest):
    return await TgUser.objects.filter(id=request.auth).afirst()


@router.post("/token/", response={200: UserTokenOut, 400: DetailOut})
async def retrieve_jwt_token(
    request: WSGIRequest | ASGIRequest, payload: UserTokenSchema
):
    if not await validate(
        hash_str=payload.hash,
        init_data={
            "user": payload.user,
            "auth_date": payload.auth_date,
            "query_id": payload.query_id,
            "chat_instance": payload.chat_instance,
            "chat_type": payload.chat_type,
            "start_param": payload.start_param,
        },
        token=os.getenv("TELEGRAM_TOKEN"),
    ):
        pass  # Debug only
        # return 400, {"detail": "Invalid hash"}

    instance, created = await TgUser.objects.select_related("discorduser").aget_or_create(id=payload.user.get("id"))

    if not instance.discorduser:
        return 400, {"detail": "Doesn't have a role"}
    
    if not check_role(id=instance.discorduser.id):
        return 400, {"detail": "Doesn't have a role"}

    name = payload.user.get("first_name") + (
        " " + payload.user.get("last_name") if payload.user.get("last_name") else ""
    )

    if instance.name != name:
        instance.name = name
        await instance.asave()

    if payload.start_param and created:
        try:
            ref_id = base64.decodebytes(payload.start_param.encode()).decode()
            ref = await TgUser.objects.filter(id=ref_id).afirst()
            if ref:
                await Referrals.objects.acreate(invited=instance, inviter=ref)
        except binascii.Error:
            pass

    payload = {
        "exp": datetime.datetime.now(datetime.timezone.utc)
        + datetime.timedelta(seconds=900),
        "user": payload.user.get("id"),
    }

    _token = jwt.encode(payload=payload, key=settings.SECRET_KEY)

    return {"token": _token}


@router.post("/", response={200: CodeOut})
async def create_user(request: WSGIRequest | ASGIRequest, payload: UserInitSchema):
    instance, created = await TgUser.objects.aget_or_create(id=payload.id)

    instance.name = payload.name

    if payload.ref and created:

        ref = await TgUser.objects.filter(id=payload.ref).afirst()
        if ref:
            await Referrals.objects.acreate(invited=instance, inviter=ref)

    await instance.asave()

    return {"code": instance.code}


@router.put("/", response={200: DetailOut, 400: DetailOut})
async def create_dsuser(request: WSGIRequest | ASGIRequest, payload: UserDiscordIn):
    print(payload.dict())
    try:
        id = base64.decodebytes(payload.code.encode()).decode()
    except Exception as e:
        print(e)
        return 400, {"detail": "Bad code"}

    if not await TgUser.objects.filter(id=id).aexists():
        return 400, {"detail": "User not found"}
    
    await DiscordUser.objects.acreate(id=payload.discord, user_id=id)

    return 200, {"detail": "Good"}


@router.get("/daily/", auth=authenticate, response={200: DailyOut, 400: DailyOut})
async def daily(request: WSGIRequest | ASGIRequest):
    instance = (
        await UserDailyReward.objects.select_related("day", "user")
        .filter(user_id=request.auth)
        .afirst()
    )

    if not instance:
        day = await DailyReward.objects.filter(day=1).afirst()

        if day:
            await UserDailyReward.objects.acreate(
                user_id=request.auth,
                day=day,
                lastAt=datetime.datetime.now(datetime.timezone.utc),
            )
            return 200, {"day": day.day, "points": day.points, "available": False}

        return 400, {"day": 0, "points": 0, "available": False}

    if (datetime.datetime.now(datetime.timezone.utc) - instance.lastAt).days == 0:
        return 200, {
            "day": instance.day.pk,
            "points": instance.day.points,
            "available": False,
        }

    return 200, {
        "day": instance.day.pk,
        "points": instance.day.points,
        "available": True,
    }


@router.post("/daily/", auth=authenticate, response={200: DetailOut, 400: DetailOut})
async def get_daily(request):
    instance = (
        await UserDailyReward.objects.select_related("day", "user")
        .filter(user_id=request.auth)
        .afirst()
    )

    if not instance:
        return 400, {"detail": "How this is possible?"}

    day = await DailyReward.objects.filter(day=instance.day.pk + 1).afirst()

    if day:
        instance.day = day
        await instance.asave()

    instance.user.balance += instance.day.points
    await instance.user.asave()

    return 200, {"detail": "Claimed"}


@router.get("/referrals/", auth=authenticate, response={200: ReferralsOut})
async def get_referrals(request: WSGIRequest | ASGIRequest):
    resp = []
    summary = 0

    async for i in (
        Referrals.objects.filter(inviter=request.auth)
        .select_related("invited")
        .order_by("-summary")
        .all()
    ):
        resp.append(i.invited)
        summary += i.summary

    return 200, {"friends": resp, "summary": summary}


@router.post("/referrals/", auth=authenticate, response={200: UserOut})
async def claim_referrals(request: WSGIRequest | ASGIRequest):
    instance = await TgUser.objects.aget(id=request.auth)
    summary = 0

    async for i in Referrals.objects.filter(inviter=instance).all():
        summary += i.summary
        i.summary = 0
        await i.asave()

    instance.balance += summary
    await instance.asave()

    return instance


@router.get("/leaderboard/", auth=authenticate, response={200: LeaderboardOut})
async def leaderboard(request: WSGIRequest | ASGIRequest):
    instance = await TgUser.objects.aget(id=request.auth)
    resp = []

    async for i in TgUser.objects.order_by("-balance").all():
        resp.append(i)

    return 200, {"users": resp, "position": resp.index(instance) + 1}


@router.post("/claim/", auth=authenticate, response={200: UserOut, 400: DetailOut})
async def claim(request: WSGIRequest | ASGIRequest):
    instance = await TgUser.objects.aget(id=request.auth)
    stamp = datetime.datetime.now(datetime.timezone.utc)

    if stamp < instance.claimAt:
        return 400, {"detail": "Not yet"}

    instance.balance += WEED_PER_CLICK
    instance.claimAt = stamp + datetime.timedelta(seconds=86400)

    await instance.asave()

    return 200, instance


@router.post("/game/", auth=authenticate, response={200: GameOut})
async def gen_game(request: WSGIRequest | ASGIRequest, payload: ScreenIn):
    resp = []
    coins = []

    async for i in Coin.objects.all():
        coins.append(i)

    for i in range(TOTAL_LEVELS):
        _pre_resp = []
        existing_coordinates = []

        for j in range(TOTAL_STAGES):
            _ = []
            coins_duplicate = coins.copy()
            for k in range(1, BASE_BAD + j):
                while True:
                    _x = random.randint(0, payload.width)
                    _y = random.randint(0, payload.height - 35)

                    if is_far_enough(
                        _x,
                        _y,
                        existing_coordinates,
                        min(payload.width, payload.height) * MINIMUM_PERCENTAGE,
                    ):
                        existing_coordinates.append((_x, _y))
                        _.append(
                            {
                                "type": "bad",
                                "x": _x,
                                "y": _y,
                                "image": coins.pop(random.randint(0, len(coins) - 1)),
                            }
                        )
                        break

            _[-1]["type"] = "good"

            _pre_resp.append({"stage": j + 1, "coins": _})

        resp.append({"level": i + 1, "data": _pre_resp, "time": LEVEL_TIMES[i]})

    instance = await Game.objects.acreate(data={"gen": resp}, user_id=request.auth)

    return 200, {"uuid": instance.uuid, "generated": resp}


@router.put("/game/", auth=authenticate, response={200: UserOut, 400: DetailOut})
async def finish_game(request: WSGIRequest | ASGIRequest, payload: GameIn):
    user = await TgUser.objects.aget(id=request.auth)

    try:
        game = await Game.objects.aget(uuid=payload.uuid)
    except Game.DoesNotExist:
        return 400, {"detail": "Bad game"}

    if game.data.get("resp"):
        return 400, {"detail": "Already played"}

    game.data["resp"] = [i.dict() for i in payload.data]

    user.balance += len(payload.data * 10)
    await user.asave()
    await game.asave()

    return 200, user


@router.get("/coins/", response={200: list[str]})
async def get_coins(request: WSGIRequest | ASGIRequest):
    resp = []

    async for i in Coin.objects.all():
        resp.append(i.image.url)

    return 200, resp