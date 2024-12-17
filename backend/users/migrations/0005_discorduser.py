# Generated by Django 5.1.1 on 2024-12-11 14:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_coin_alter_game_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscordUser',
            fields=[
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления в базу')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='Дата изменения в базе')),
                ('id', models.BigIntegerField(primary_key=True, serialize=False, unique=True, verbose_name='DS ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.tguser')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
