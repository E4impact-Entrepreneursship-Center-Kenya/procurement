# Generated by Django 4.2.1 on 2023-10-26 21:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0027_localpurchaseorderform_level_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='localpurchaseorderform',
            name='budget_line',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounting.budgetline'),
        ),
    ]