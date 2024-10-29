# Generated by Django 5.1.1 on 2024-10-17 23:58

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_alter_referrals_options_remove_tguser_lastclaim_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "createdAt",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата добавления в базу"
                    ),
                ),
                (
                    "updatedAt",
                    models.DateTimeField(
                        auto_now=True, verbose_name="Дата изменения в базе"
                    ),
                ),
                (
                    "uuid",
                    models.UUIDField(
                        default=uuid.uuid4,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("data", models.JSONField(verbose_name="Generted data")),
                ("cheat", models.BooleanField(default=False)),
                ("bad_gen", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="users.tguser",
                        verbose_name="Юзер",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
