from django.contrib import admin
from . import models


admin.site.register([models.Project, models.BudgetLine])
admin.site.register([models.FormUser, models.AmountReceived, models.CashAdvanceForm])
admin.site.register(models.Notification)
