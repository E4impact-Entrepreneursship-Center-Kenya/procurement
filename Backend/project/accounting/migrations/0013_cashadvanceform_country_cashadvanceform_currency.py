# Generated by Django 4.2.1 on 2023-09-07 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0012_delete_cashadvanceformreceiver'),
    ]

    operations = [
        migrations.AddField(
            model_name='cashadvanceform',
            name='country',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='cashadvanceform',
            name='currency',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
