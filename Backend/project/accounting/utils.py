from .models import CashAdvanceForm, ExpenseClaimForm, PurchaseRequisitionForm, \
    LocalPurchaseOrderForm, OverExpenditureForm, UnderExpenditureForm


def get_form(form_name, form_id):
    form = None
    if form_name == 'cash-advance':
        form = CashAdvanceForm.objects.filter(id=form_id).first()
    if form_name == 'expense-claim':
        form = ExpenseClaimForm.objects.filter(id=form_id).first()
    if form_name == 'purchase-requisition':
        form = PurchaseRequisitionForm.objects.filter(id=form_id).first()
    if form_name == 'local-purchase-order':
        form = LocalPurchaseOrderForm.objects.filter(id=form_id).first()
    if form_name == "over-expenditure":
        form = OverExpenditureForm.objects.filter(id=form_id).first()
    if form_name == "under-expenditure":
        form = UnderExpenditureForm.objects.filter(id=form_id).first()
    return form


def update_form(form, field_name, value):
    if form:
        setattr(form, field_name, value)
        form.save()
