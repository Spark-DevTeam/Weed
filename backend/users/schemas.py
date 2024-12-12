from ninja import Schema
import datetime
import uuid


class UserInitSchema(Schema):
    id: int
    name: str
    ref: str = None


class UserTokenSchema(Schema):
    query_id: str | None = None
    chat_instance: str | None = None
    chat_type: str | None = None
    start_param: str | None = None
    user: dict
    auth_date: int
    hash: str


class UserTokenOut(Schema):
    token: str


class DetailOut(Schema):
    detail: str


class UserOut(Schema):
    id: int
    photo: str | None = None
    name: str
    banned: bool
    balance: int
    code: str
    claimAt: datetime.datetime


class DailyOut(Schema):
    day: int
    points: int
    available: bool


class UserBalanceOut(Schema):
    name: str
    photo: str | None = None
    balance: int


class ReferralsOut(Schema):
    friends: list[UserBalanceOut]
    summary: int


class LeaderboardOut(Schema):
    users: list[UserBalanceOut]
    position: int


class ScreenIn(Schema):
    width: int
    height: int


class CoinOut(Schema):
    type: str
    x: float
    y: float
    image: str


class StageOut(Schema):
    coins: list[CoinOut]
    stage: int


class LevelOut(Schema):
    level: int
    time: int
    data: list[StageOut]


class GameOut(Schema):
    uuid: uuid.UUID
    generated: list[LevelOut]


class CoinIn(Schema):
    levelIndex: int
    stageIndex: int
    timeLeft: int
    timestamp: str
    coinX: int
    coinY: int


class GameIn(Schema):
    uuid: uuid.UUID
    data: list[CoinIn]
