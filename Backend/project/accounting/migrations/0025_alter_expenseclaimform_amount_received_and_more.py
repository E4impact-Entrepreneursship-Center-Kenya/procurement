# Generated by Django 4.2.1 on 2023-10-25 11:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounting', '0024_cashadvanceform_max_level_expenseclaimform_max_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenseclaimform',
            name='amount_received',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounting.amountreceived'),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expense_approved_by', to='accounting.formuser'),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='approver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expense_approver', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='bank_batch_no',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='checked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expense_checked_by', to='accounting.formuser'),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='checker',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expense_checker', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='expenseclaimform',
            name='invoice_number',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
