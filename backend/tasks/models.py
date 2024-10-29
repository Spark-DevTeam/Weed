from django.db import models
from users.models import TgUser
import uuid


class TimeBasedModel(models.Model):
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата добавления в базу"
    )
    updatedAt = models.DateTimeField(
        auto_now=True, verbose_name="Дата изменения в базе"
    )

    class Meta:
        abstract = True


class TgChannel(TimeBasedModel):
    uri = models.CharField(
        verbose_name="Ссылка канала",
        help_text="Ссылка должна быть в формате @[name] и бот в администраторах",
    )

    def __str__(self) -> str:
        return self.uri

    class Meta:
        verbose_name = "Канал"
        verbose_name_plural = "Каналы"


class Task(TimeBasedModel):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    photo = models.ImageField(verbose_name="Иконка")
    imitate = models.BooleanField(default=False, verbose_name="Имитация проверки")
    seconds = models.IntegerField(
        default=0,
        verbose_name="Секунды",
        help_text="Кол-во секунд, через которое будет активна кнопка 'Claim'",
    )
    text = models.CharField(verbose_name="Заголовок")
    link = models.CharField(verbose_name="Ссылка")
    reward = models.IntegerField(verbose_name="Награда")
    channel = models.ForeignKey(
        TgChannel,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="ТГ канал",
        help_text="Должен быть выбран канал, либо включена имитация, иначе задания не будут засчитываться",
    )


class Complete(TimeBasedModel):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    user = models.ForeignKey(TgUser, on_delete=models.CASCADE, verbose_name="Юзер")
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="Таска")
    claimed = models.BooleanField(default=False, verbose_name="Награда получена")
    claimAt = models.DateTimeField(blank=True, null=True)
