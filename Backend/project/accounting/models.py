from django.contrib.auth.models import User
from django.db import models

from django.db.models import UniqueConstraint
from django.conf import settings


# Create your models here.
class Project(models.Model):
    created_by = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    manager = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL, related_name='manager')
    name = models.CharField(blank=False, null=True, max_length=100)
    code = models.CharField(blank=False, null=True, max_length=255)
    short_name = models.CharField(blank=True, null=True, max_length=255)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class BudgetLine(models.Model):
    created_by = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL, related_name='budget_lines')
    code = models.CharField(blank=False, null=True, max_length=10)
    text = models.CharField(blank=False, null=True, max_length=255)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']
        constraints = [
            UniqueConstraint(fields=['project', 'code'], name='unique_project_budget_line')
        ]

    def __str__(self):
        return self.code


class FormUser(models.Model):
    user = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    signature = models.ImageField(blank=False, null=True)
    date = models.DateField()

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']


class AmountReceived(models.Model):
    amount = models.FloatField()
    receipt = models.FileField(blank=False, null=True)
    date = models.DateField()

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']


class CashAdvanceForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='cash_advance_requested_by')

    checker = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                related_name='cash_advance_checker')
    checked_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                   related_name='cash_advance_checked_by')

    approver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                 related_name='cash_advance_approver')
    approved_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                    related_name='cash_advance_approved_by')

    amount_received = models.ForeignKey(AmountReceived, blank=False, null=True, on_delete=models.SET_NULL)

    name = models.CharField(max_length=70, blank=False, null=True)
    level = models.IntegerField(blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)
    date = models.DateField(blank=False, null=True)

    purpose = models.TextField(null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    activity_end_date = models.DateField(blank=False, null=True)
    expected_liquidation_date = models.DateField(blank=False, null=True)
    items = models.JSONField(blank=False, null=True)
    total = models.FloatField(blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']


class Notification(models.Model):
    sender = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL, related_name='sender')
    receiver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL, related_name='receiver')
    form = models.CharField(max_length=100, blank=False, null=True)
    message = models.CharField(max_length=100, blank=False, null=True)
    url = models.URLField(blank=True, null=True)
    read = models.BooleanField(default=False)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']


class ExpenseClaimForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='expense_requested_by')

    checker = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                related_name='expense_checker')
    checked_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                   related_name='expense_checked_by')

    approver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                 related_name='expense_approver')
    approved_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                    related_name='expense_approved_by')

    amount_received = models.ForeignKey(AmountReceived, blank=False, null=True, on_delete=models.SET_NULL)

    name = models.CharField(max_length=70, blank=False, null=True)
    level = models.IntegerField(blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)

    cash_advance_received = models.FloatField(blank=False, null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    budget_line = models.ForeignKey(BudgetLine, blank=False, null=True, on_delete=models.SET_NULL)
    purpose = models.TextField(null=True)
    reason = models.TextField(blank=True, null=True)
    expense_incured = models.TextField(blank=True, null=True)

    items = models.JSONField(blank=False, null=True)
    total = models.FloatField(blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']


class PurchaseRequisitionForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='purchase_requested_by')
    delivered_to = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name=' purchase_delivered_to')
    checker = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                related_name='purchase_checker')
    checked_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                   related_name='purchase_checked_by')

    approver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                 related_name='purchase_approver')
    approved_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                    related_name='purchase_approved_by')
    items_required_by = models.DateField(blank=False, null=True)

    amount_received = models.ForeignKey(AmountReceived, blank=False, null=True, on_delete=models.SET_NULL)

    name = models.CharField(max_length=70, blank=False, null=True)
    level = models.IntegerField(blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)

    # cash_advance_received = models.FloatField(blank=False, null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    budget_line = models.ForeignKey(BudgetLine, blank=False, null=True, on_delete=models.SET_NULL)
    purpose = models.TextField(null=True)
    reason = models.TextField(blank=True, null=True)

    items = models.JSONField(blank=False, null=True)
    total = models.FloatField(blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']


class LocalPurchaseOrderForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    budget_line = models.ForeignKey(BudgetLine, blank=False, null=True, on_delete=models.SET_NULL)
    date = models.DateField(blank=False, null=True)
    payment_terms = models.CharField(max_length=70, blank=False, null=True)
    delivery_date = models.DateField(blank=False, null=True)
    supplier = models.CharField(max_length=70, blank=False, null=True)
    address = models.CharField(max_length=70, blank=False, null=True)
    mobile = models.CharField(max_length=70, blank=False, null=True)
    items = models.JSONField(blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='local_purchase_requested_by')
    delivery_costs = models.FloatField(blank=False, null=True)
    return_to_name = models.CharField(max_length=70, blank=False, null=True)
    return_to_email = models.CharField(max_length=70, blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class RequestForQuatationForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    vendor_name = models.CharField(max_length=70, blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    address = models.CharField(max_length=70, blank=False, null=True)
    phone_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)

    delivery_period = models.CharField(max_length=70, blank=False, null=True)
    price_validity_period = models.CharField(max_length=70, blank=False, null=True)
    payment_terms = models.CharField(max_length=70, blank=False, null=True)
    warranty_period = models.CharField(max_length=70, blank=False, null=True)

class UnderExpendintureForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)
    date_of_receipt = models.DateField(blank=False, null=True)
    amt_received_description = models.CharField(max_length=70, blank=False, null=True)
    amt_received = models.FloatField(blank=False, null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    project_code = models.CharField(max_length=70, blank=False, null=True)
    items = models.JSONField(blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='under_expenditure_requested_by')
    checker = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                related_name='under_expenditure_checker')
    checked_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                      related_name='under_expenditure_checked_by')
    approved_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                        related_name='under_expenditure_approved_by')
    approver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                    related_name='under_expenditure_approver')

    # items = models.JSONField(blank=False, null=True)
    # total = models.FloatField(blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

class OverExpendintureForm(models.Model):
    country = models.CharField(max_length=30, blank=False, null=True)
    currency = models.CharField(max_length=30, blank=False, null=True)
    invoice_number = models.CharField(max_length=30, blank=False, null=True)
    bank_batch_no = models.CharField(max_length=20, blank=False, null=True)
    date_of_receipt = models.DateField(blank=False, null=True)
    amt_received_description = models.CharField(max_length=70, blank=False, null=True)
    amt_received = models.FloatField(blank=False, null=True)
    project = models.ForeignKey(Project, blank=False, null=True, on_delete=models.SET_NULL)
    project_code = models.CharField(max_length=70, blank=False, null=True)
    items = models.JSONField(blank=False, null=True)
    requested_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                     related_name='over_expenditure_requested_by')
    checker = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                related_name='over_expenditure_checker')
    checked_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                      related_name='over_expenditure_checked_by')
    approved_by = models.ForeignKey(FormUser, blank=False, null=True, on_delete=models.SET_NULL,
                                        related_name='over_expenditure_approved_by')
    approver = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL,
                                    related_name='under_expenditure_approver')

    # items = models.JSONField(blank=False, null=True)
    # total = models.FloatField(blank=False, null=True)

    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


    