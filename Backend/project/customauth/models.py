from django.conf import settings
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

from mailer.utils import send_custom_email


# Create your models here.
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    user = reset_password_token.user

    url = f"{settings.DOMAIN}/auth/password/confirm/{reset_password_token.key}"
    send_custom_email('reset_password', {'url': url, 'user': user}, [user.email])


