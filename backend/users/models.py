from django.db import models
from django.db.models.signals import post_init, pre_save
from django.dispatch import receiver
import base64
from django.db.models.base import ModelBase
import uuid
from economic import LEVELS_PERCENTAGES


class Levels(models.IntegerChoices):
    FIRST = 1, "1 level"
    SECOND = 2, "2 level"
    THIRD = 3, "3 level"


class TimeBasedModel(models.Model):
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата добавления в базу"
    )
    updatedAt = models.DateTimeField(
        auto_now=True, verbose_name="Дата изменения в базе"
    )

    class Meta:
        abstract = True


class TgUser(TimeBasedModel):
    id = models.BigIntegerField(primary_key=True, unique=True, verbose_name="TG ID")
    name = models.CharField(verbose_name="Имя")
    level = models.IntegerField(
        choices=Levels.choices, default=Levels.FIRST, verbose_name="Уровень"
    )
    banned = models.BooleanField(default=False, verbose_name="Бан")
    balance = models.BigIntegerField(default=0, verbose_name="Баланс")
    claimAt = models.DateTimeField(auto_now_add=True, verbose_name="Следующий Claim")
    code = models.CharField(verbose_name="Реф. код")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Referrals(TimeBasedModel):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    invited = models.ForeignKey(
        TgUser,
        on_delete=models.CASCADE,
        related_name="invited_referrals",
        verbose_name="Приглашенный",
    )
    inviter = models.ForeignKey(
        TgUser,
        on_delete=models.CASCADE,
        related_name="inviter_referrals",
        verbose_name="Пригласивший",
    )
    summary = models.IntegerField(default=0, verbose_name="Сумма")

    def __str__(self) -> str:
        return f"{self.inviter} -> {self.invited}"

    class Meta:
        verbose_name = "Реф"
        verbose_name_plural = "Рефы"


class DailyReward(TimeBasedModel):
    day = models.IntegerField(primary_key=True, unique=True, verbose_name="День")
    points = models.IntegerField(verbose_name="Кол-во поинтов")

    def __str__(self) -> str:
        return f"День {self.day}"


class UserDailyReward(TimeBasedModel):
    user = models.ForeignKey(TgUser, on_delete=models.CASCADE, verbose_name="Юзер")
    day = models.ForeignKey(DailyReward, on_delete=models.CASCADE, verbose_name="День")
    lastAt = models.DateTimeField(auto_now_add=True, verbose_name="Последняя получка")

    def __str__(self) -> str:
        return f"{self.user} + {self.day}"


class Game(TimeBasedModel):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    user = models.ForeignKey(TgUser, on_delete=models.CASCADE, verbose_name="Юзер")
    data = models.JSONField(verbose_name="Generted data")
    cheat = models.BooleanField(default=False)
    bad_gen = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.name}"

    class Meta:
        verbose_name = "Игра"
        verbose_name_plural = "Игры"


class Coin(TimeBasedModel):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    name = models.CharField(verbose_name="Название")
    image = models.ImageField(verbose_name="Картинка")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Монетка"
        verbose_name_plural = "Монетки"


@receiver(post_init, sender=TgUser)
async def setup_ref_code(sender: ModelBase, instance: TgUser, **kwargs):
    instance.code = (base64.encodebytes(f"{instance.id}".encode())).decode()


@receiver(signal=pre_save, sender=TgUser)
async def give_rewards(sender: ModelBase, instance: TgUser, **kwargs):
    try:
        _ = await TgUser.objects.aget(id=instance.id)
    except TgUser.DoesNotExist:
        return

    if instance.balance - _.balance > 0:
        async for i in Referrals.objects.filter(invited=instance).all():
            i.summary += (instance.balance - _.balance) // LEVELS_PERCENTAGES
            await i.asave()
