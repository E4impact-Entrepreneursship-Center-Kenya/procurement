from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, blank=False, null=False, on_delete=models.CASCADE)
    phone_no = models.CharField(blank=True, null=True, max_length=13)
    checker = models.BooleanField(default=False)
    approver = models.BooleanField(default=False)
    can_update_bank_batch = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
