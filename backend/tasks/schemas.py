from ninja import Schema
import datetime
import uuid


class TaskOut(Schema):
    uuid: uuid.UUID
    photo: str
    text: str
    reward: int
    link: str
    imitate: bool
    timer: datetime.datetime | None = None


class DetailOut(Schema):
    detail: str


class DetailWithRewardOut(Schema):
    detail: str
    reward: int
