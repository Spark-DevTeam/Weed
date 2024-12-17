from django.contrib import admin
from .models import TgUser, Referrals, DailyReward, UserDailyReward, Game, Coin, DiscordUser

# Register your models here.
admin.site.register(TgUser)
admin.site.register(Referrals)
admin.site.register(DailyReward)
admin.site.register(UserDailyReward)
admin.site.register(Game)
admin.site.register(Coin)
admin.site.register(DiscordUser)