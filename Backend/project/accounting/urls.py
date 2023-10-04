from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'budget-lines', views.BudgetLineViewSet)

router.register(r'form-users', views.FormUserViewSet)
router.register(r'amount-received', views.AmountReceivedViewSet)
router.register(r'cash-advance-forms', views.CashAdvanceFormViewSet)
router.register(r'expense-claim-forms', views.ExpenseClaimFormViewSet)
router.register(r'purchase-requisition-forms', views.PurchaseRequisitionForm)
router.register(r'request-for-quatation-forms', views.RequestForQuatationForm)
router.register(r'over-expenditure-forms', views.OverExpendintureForm)
router.register(r'under-expenditure-forms', views.UnderExpendintureForm)


router.register(r'notifications', views.NotificationViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
