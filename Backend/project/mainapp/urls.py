from django.urls import path, include
from rest_framework import routers
from .views import main

# router = routers.DefaultRouter()
# router.register(r'', AccountViewSet)


urlpatterns = [
    path('', main),
]
