from ninja import Router
from users.api import authenticate
from users.models import TgUser
from .models import Task, Complete
from .schemas import TaskOut, DetailOut, DetailWithRewardOut
from django.core.handlers.wsgi import WSGIRequest
from django.core.handlers.asgi import ASGIRequest
import uuid
import datetime
import json
from .checker import Checker

router = Router(auth=authenticate)


@router.get("/", response={200: list[TaskOut]})
async def tasks(request: WSGIRequest | ASGIRequest):
    user = await TgUser.objects.aget(id=request.auth)

    response = []

    async for i in Task.objects.all():
        _ = await Complete.objects.filter(user=user, task=i).afirst()

        if _:
            if not _.claimed:
                response.append({**i.__dict__, "timer": _.claimAt})
        else:
            response.append(i)

    return response


@router.post(
    "/{uuid}/", response={200: DetailWithRewardOut, 201: DetailOut, 400: DetailOut}
)
async def complete(request: WSGIRequest | ASGIRequest, uuid: uuid.UUID):
    user = await TgUser.objects.aget(id=request.auth)
    task = await Task.objects.filter(uuid=uuid).select_related("channel").afirst()

    if not task:
        return 400, {"detail": "Task not found"}

    _ = await Complete.objects.filter(user=user, task=task).afirst()

    if not _:
        await Complete.objects.acreate(
            task=task,
            user=user,
            claimed=False,
            claimAt=(
                datetime.datetime.now(datetime.timezone.utc)
                + datetime.timedelta(seconds=task.seconds)
            ),
        )
        return 201, {"detail": "Wait a little"}

    if _.claimed:
        return 400, {"detail": "Already Claimed"}

    if not task.imitate:
        if not task.channel:
            return 400, {"detail": "Checker fail"}

        resp = Checker().check_member(id=user.id, channel=task.channel.uri)

        if isinstance(resp, bytes):
            return 400, {"detail": "Checker fail"}

        data = resp.get("response")

        if not data:
            return 400, {"detail": "Checker fail"}

        payload = json.loads(data)

        status = payload.get("result", {"status": None}).get("status")

        if status != "member":
            return 400, {"detail": "Checker fail"}

        await Complete.objects.acreate(task=task, user=user, claimed=True)
        user.balance += task.reward
        await user.asave()

        return 200, {"detail": "Congrats!", "reward": task.reward}

    if (_.claimAt - datetime.datetime.now(datetime.timezone.utc)).total_seconds() <= 0:
        user.balance += task.reward
        _.claimed = True

        await user.asave()
        await _.asave()

        return 200, {"detail": "Congrats!", "reward": task.reward}

    return 400, {"detail": "Timer Error"}
