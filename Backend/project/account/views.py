from django.conf import settings
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions

from mainapp.utils import StandardResultsSetPagination
from mainapp.permissions import IsAuthenticatedOrPostOnly
from mainapp.authentication import AUTH_CLASS
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import SearchFilter

from .serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = AccountSerializer
    # authentication_classes = [TokenAuthentication]
    authentication_classes = [AUTH_CLASS]
    permission_classes = [IsAuthenticatedOrPostOnly]
    # permission_classes = [permissions.AllowAny]

    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['is_superuser', 'is_staff', 'profile__checker', 'profile__approver']
    search_fields = ['email', 'first_name', 'last_name', 'username', 'profile__phone_no']
