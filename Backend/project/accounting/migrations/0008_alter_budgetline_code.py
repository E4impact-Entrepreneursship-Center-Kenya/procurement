# Generated by Django 4.2.1 on 2023-07-26 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0007_remove_budgetline_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budgetline',
            name='code',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
    ]