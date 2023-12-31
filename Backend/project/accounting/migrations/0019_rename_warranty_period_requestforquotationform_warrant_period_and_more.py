# Generated by Django 4.2.1 on 2023-10-17 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0018_rename_items_required_by_purchaserequisitionform_date_required_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestforquotationform',
            old_name='warranty_period',
            new_name='warrant_period',
        ),
        migrations.RemoveField(
            model_name='localpurchaseorderform',
            name='budget_line',
        ),
        migrations.RemoveField(
            model_name='localpurchaseorderform',
            name='date',
        ),
        migrations.RemoveField(
            model_name='localpurchaseorderform',
            name='project',
        ),
        migrations.RemoveField(
            model_name='purchaserequisitionform',
            name='amount_received',
        ),
        migrations.AddField(
            model_name='requestforquotationform',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='requestforquotationform',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='requestforquotationform',
            name='items',
            field=models.JSONField(null=True),
        ),
        migrations.AddField(
            model_name='requestforquotationform',
            name='requested_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='request_for_quotation_requested_by', to='accounting.formuser'),
        ),
        migrations.AddField(
            model_name='requestforquotationform',
            name='updated_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
