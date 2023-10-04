from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions


from mainapp.utils import StandardResultsSetPagination
from rest_framework.filters import SearchFilter
from rest_framework_bulk import BulkModelViewSet


from .models import Project, BudgetLine, FormUser, AmountReceived, UnderExpendintureForm, CashAdvanceForm, OverExpendintureForm, LocalPurchaseOrderForm, Notification, ExpenseClaimForm, PurchaseRequisitionForm, RequestForQuatationForm

from .serializers import ProjectSerializer, BudgetLineSerializer, FormUserSerializer, \
    AmountReceivedSerializer, CashAdvanceFormSerializer, NotificationSerializer, OverExpendintureFormSerializer, UnderExpendintureFormSerializer, ExpenseClaimFormSerializer, LocalPurchaseOrderFormSerializer, PurchaseRequisitionFormSerializer, RequestForQuatationFormSerializer

from mainapp.authentication import AUTH_CLASS


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    basename = 'project'

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticated]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = []
    search_fields = ['name', 'code']


class BudgetLineViewSet(BulkModelViewSet):
    queryset = BudgetLine.objects.prefetch_related("project").all()
    serializer_class = BudgetLineSerializer


    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['project']
    search_fields = ['code']


class FormUserViewSet(BulkModelViewSet):
    queryset = FormUser.objects.all()
    serializer_class = FormUserSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    # filter_backends = [DjangoFilterBackend, SearchFilter]
    # filterset_fields = []
    # search_fields = []


class AmountReceivedViewSet(BulkModelViewSet):
    queryset = AmountReceived.objects.all()
    serializer_class = AmountReceivedSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = []
    search_fields = []


class CashAdvanceFormViewSet(BulkModelViewSet):
    queryset = CashAdvanceForm.objects.all()
    serializer_class = CashAdvanceFormSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []

class OverExpendintureFormViewSet(BulkModelViewSet):
    queryset = OverExpendintureForm.objects.all()
    serializer_class = OverExpendintureFormSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []

class UnderExpendintureFormViewSet(BulkModelViewSet):
    queryset = UnderExpendintureForm.objects.all()
    serializer_class = UnderExpendintureFormSerializer
   

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []

class LocalPurchaseOrderFormViewSet(BulkModelViewSet):
    queryset = LocalPurchaseOrderForm.objects.all()
    serializer_class = LocalPurchaseOrderFormSerializer
   

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['requested_by__user__id']
    search_fields = []

class NotificationViewSet(BulkModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['read', 'receiver__id', 'sender__id']
    search_fields = []


class ExpenseClaimFormViewSet(BulkModelViewSet):
    queryset = ExpenseClaimForm.objects.all()
    serializer_class = ExpenseClaimFormSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []

class RequestForQuatationFormViewSet(BulkModelViewSet):
    queryset = RequestForQuatationForm.objects.all()
    serializer_class = RequestForQuatationFormSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []


class PurchaseRequisitionFormViewSet(BulkModelViewSet):
    queryset = PurchaseRequisitionForm.objects.all()
    serializer_class = PurchaseRequisitionFormSerializer
    

    authentication_classes = [AUTH_CLASS]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['checker__id', 'approver__id', 'requested_by__user__id']
    search_fields = []


