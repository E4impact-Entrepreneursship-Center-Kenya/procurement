# Generated by Django 4.2.1 on 2023-09-07 10:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0011_notification'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CashAdvanceFormReceiver',
        ),
    ]