from aiogram import Router
from aiogram.utils.deep_linking import decode_payload
from aiogram.filters import CommandStart, CommandObject
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from worker import APIWorker
from texts import START_TEXT
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import os

ikb_play = InlineKeyboardMarkup(
    row_width=1,
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text="Play 📸",
                web_app=WebAppInfo(url=os.getenv("TELEGRAM_URI")),
            )
        ],
    ],
)


router = Router(name="start")


@router.message(CommandStart(deep_link=True))
async def command_start_handler(
    message: Message, api: APIWorker, state: FSMContext, command: CommandObject = None
):
    await state.clear()
    args = command.args
    payload = decode_payload(args)
    await api.createUser(
        id=message.from_user.id, name=message.from_user.full_name, ref=payload
    )
    return await message.answer(START_TEXT)


@router.message(CommandStart())
async def command_ref_start_handler(
    message: Message, api: APIWorker, state: FSMContext, command: CommandObject = None
):
    await state.clear()
    await api.createUser(id=message.from_user.id, name=message.from_user.full_name)
    return await message.answer(START_TEXT)
