import discord
from discord.ext import commands
import os

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

class Bot(commands.Bot):
    def __init__(self, *args, **kwargs) -> None:
        print('Bot init')
        super().__init__(command_prefix=(self.get_prefix), *args, **kwargs)

    async def get_prefix(self, message):
        prefixes = ['!']
        return commands.when_mentioned_or(*prefixes)(self, message)

bot = Bot(intents=intents)

@bot.event
async def on_ready() -> None:
    for filename in os.listdir('./cogs'):
        if filename.endswith('.py'):
            await bot.load_extension(f'cogs.{filename[:-3]}')
            print(f'{filename[:-3]} loaded')

bot.run(os.getenv("DISCORD_TOKEN"))
