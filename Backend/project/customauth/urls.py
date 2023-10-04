from django.urls import path, include
from django_rest_passwordreset.views import ResetPasswordRequestTokenViewSet, ResetPasswordConfirmViewSet, \
    ResetPasswordValidateTokenViewSet
from rest_framework import routers
from .views import CustomLogin, ChangePasswordView, ActivateAccount, check_user_logged_in, logout_user

router = routers.DefaultRouter()
router.register(
    r'password-reset/validate-token',
    ResetPasswordValidateTokenViewSet,
    basename='reset-password-validate'
)
router.register(
    r'password-reset/confirm',
    ResetPasswordConfirmViewSet,
    basename='reset-password-confirm'
)
router.register(
    r'password-reset',
    ResetPasswordRequestTokenViewSet,
    basename='reset-password-request'
)


urlpatterns = [
    path('account/activate/', ActivateAccount.as_view()),
    path('login/', CustomLogin.as_view()),
    path('logout/', logout_user),
    path('change-password/', ChangePasswordView.as_view()),
    path('check-login-status/', check_user_logged_in),
    path('', include(router.urls)),
]
