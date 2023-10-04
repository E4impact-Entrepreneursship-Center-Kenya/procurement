from django.db import models

# Create your models here.
from mailer.models import EmailConfiguration, Email


class AppConfig(models.Model):
    app = models.CharField(max_length=30, blank=True, null=True, default="main", unique=True)

    account_creation_email = models.ForeignKey(Email, blank=True, null=True, on_delete=models.SET_NULL,
                                               related_name="account_creation_Email")

    account_creation_emailconfig = models.ForeignKey(EmailConfiguration, blank=True, null=True,
                                                     on_delete=models.SET_NULL,
                                                     related_name="account_creation_email_config")

    reset_password_email = models.ForeignKey(Email, blank=True, null=True, on_delete=models.SET_NULL,
                                             related_name="password_reset_Email")
    reset_password_emailconfig = models.ForeignKey(EmailConfiguration, blank=True, null=True, on_delete=models.SET_NULL,
                                                   related_name="password_reset_email_config")

    activate_account_email = models.ForeignKey(Email, blank=True, null=True, on_delete=models.SET_NULL,
                                               related_name="account_activation_email")
    activate_account_emailconfig = models.ForeignKey(EmailConfiguration, blank=True, null=True,
                                                     on_delete=models.SET_NULL,
                                                     related_name="account_activation_email_config")

    def __str__(self):
        return f"{self.app}"
