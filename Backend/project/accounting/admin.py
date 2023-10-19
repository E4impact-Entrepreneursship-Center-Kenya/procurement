from django.contrib import admin
from . import models


admin.site.register([models.Project, models.BudgetLine])
admin.site.register([models.FormUser, models.AmountReceived, models.CashAdvanceForm])
admin.site.register(models.Notification)
admin.site.register([models.ExpenseClaimForm, models.PurchaseRequisitionForm, models.LocalPurchaseOrderForm,
                     models.RequestForQuotationForm, models.UnderExpenditureForm, models.OverExpenditureForm])
