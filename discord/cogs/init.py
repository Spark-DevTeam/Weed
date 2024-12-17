from discord.ext import commands
from aiohttp import ClientSession
import json

class CodeCommands(commands.Cog):

    def __init__(self, bot: commands.Bot) -> None:
        self.bot = bot
        self.uri = "http://backend:8000"
        self.session = ClientSession()
        super().__init__()

    @commands.command("code")
    @commands.guild_only()
    async def integrate(self, ctx: commands.context.Context):
        data = {
            "code": ctx.message.content.split()[1],
            "discord": ctx.author.id
        }

        async with self.session.put(f"{self.uri}/api/v1/users/", data=json.dumps(data)) as resp:
            try:
                _resp_data = await resp.json()
            except:
                return print(await resp.text())
            
            if resp.status != 200:
                return await ctx.reply("We couldn't find you in our telegram bot for some reason")
            
        return await ctx.reply("Great! If you have needed role, then you can start your journey in our bot")


async def setup(bot: commands.Bot):
    await bot.add_cog(CodeCommands(bot))