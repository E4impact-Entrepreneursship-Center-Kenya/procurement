# Generated by Django 4.2.1 on 2023-07-25 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='approver',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='checker',
            field=models.BooleanField(default=False),
        ),
    ]