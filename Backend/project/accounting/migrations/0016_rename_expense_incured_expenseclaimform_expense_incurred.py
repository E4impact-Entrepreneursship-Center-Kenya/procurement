# Generated by Django 4.2.1 on 2023-10-15 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0015_requestforquotationform_alter_notification_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expenseclaimform',
            old_name='expense_incured',
            new_name='expense_incurred',
        ),
    ]