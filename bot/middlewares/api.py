from collections.abc import Awaitable, Callable
from typing import Any

from aiogram import BaseMiddleware
from aiogram.types import TelegramObject

from worker import APIWorker


class APISessionMiddleware(BaseMiddleware):
    def __init__(self) -> None:
        super().__init__()

        self.api = APIWorker()

    async def __call__(
        self,
        handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: dict[str, Any],
    ) -> Any:
        data["api"] = self.api
        return await handler(event, data)
