# Generated by Django 4.2.1 on 2023-10-26 22:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounting', '0030_localpurchaseorderform_delivery_period_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localpurchaseorderform',
            name='approver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='local_purchase_order_approver', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='localpurchaseorderform',
            name='bank_batch_no',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='localpurchaseorderform',
            name='invoice_number',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='localpurchaseorderform',
            name='level',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
