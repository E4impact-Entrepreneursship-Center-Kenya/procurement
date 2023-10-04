from accounting.models import Notification, CashAdvanceForm
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
from django.conf import settings


def create_url(url):
    return f"{settings.DOMAIN}/{url}"


def create_notification(sender, receiver_, form, message, url):
    Notification.objects.create(
        sender=sender,
        receiver=receiver_,
        form=form,
        message=message,
        url=url
    )


@receiver(post_save, sender=CashAdvanceForm)
def update_cash_advance_form(sender, instance, created, **kwargs):
    url = create_url(f"account/forms/cash-advance-forms/view/{instance.id}")
    if created:
        year = datetime.datetime.today().strftime("%y")
        no = f"{instance.project.short_name} {instance.id if instance.id > 9 else f'0{instance.id}'}/{year}"
        instance.invoice_number = no
        instance.code = instance.project.code
        instance.approver = instance.project.manager
        instance.save()
        create_notification(instance.requested_by.user, instance.checker, 'Cash Advance Form',
                            f'You have a new form, <a href="{url}">{instance.invoice_number}</a>, to check from'
                            f' {instance.requested_by.user.get_full_name()}',
                            None)
        return
    else:
        if instance.level == 2:
            create_notification(instance.checker, instance.approver, 'Cash Advance Form',
                                f'You have a new form, <a href="{url}">{instance.invoice_number}</a>, to approve from '
                                f'{instance.checker.get_full_name()}',
                                None)
            create_notification(instance.checker, instance.requested_by.user, 'Cash Advance Form',
                                f'{instance.checker.get_full_name()} has checked your form, '
                                f'<a href="{url}">{instance.invoice_number}</a>.',
                                None)

        if instance.level == 3:
            create_notification(instance.approver, instance.checker, 'Cash Advance Form',
                                f'{instance.approver.get_full_name()} has approved a form, '
                                f'<a href="{url}">{instance.invoice_number}</a>.',
                                None)
            create_notification(instance.approver, instance.requested_by.user, 'Cash Advance Form',
                                f'{instance.approver.get_full_name()} has approved your form, '
                                f'<a href="{url}">{instance.invoice_number}</a>.',
                                None)

        if instance.level == 4:
            create_notification(instance.requested_by.user, instance.approver, 'Cash Advance Form',
                                f'{instance.requested_by.user.get_full_name()} has uploaded a receipt to form '
                                f'<a href="{url}">{instance.invoice_number}</a> .',
                                None)
            create_notification(instance.requested_by.user, instance.checker, 'Cash Advance Form',
                                f'{instance.requested_by.user.get_full_name()} has uploaded a receipt to form '
                                f'<a href="{url}">{instance.invoice_number}</a>.',
                                None)