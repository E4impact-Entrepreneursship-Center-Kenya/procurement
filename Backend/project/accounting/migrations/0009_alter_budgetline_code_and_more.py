# Generated by Django 4.2.1 on 2023-07-26 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0008_alter_budgetline_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budgetline',
            name='code',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddConstraint(
            model_name='budgetline',
            constraint=models.UniqueConstraint(fields=('project', 'code'), name='unique_project_budget_line'),
        ),
    ]