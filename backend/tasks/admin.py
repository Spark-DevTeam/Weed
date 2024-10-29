from django.contrib import admin
from .models import Task, TgChannel, Complete

# Register your models here.
admin.site.register(Task)
admin.site.register(TgChannel)
admin.site.register(Complete)
