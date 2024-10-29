from django.contrib import admin
from .models import TgUser, Referrals, DailyReward, UserDailyReward, Game

# Register your models here.
admin.site.register(TgUser)
admin.site.register(Referrals)
admin.site.register(DailyReward)
admin.site.register(UserDailyReward)
admin.site.register(Game)
