# Generated by Django 4.2.1 on 2023-09-07 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_profile_approver_profile_checker'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='can_update_bank_batch',
            field=models.BooleanField(default=False),
        ),
    ]