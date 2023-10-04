# Generated by Django 4.2.1 on 2023-07-16 10:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mailer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(blank=True, default='main', max_length=30, null=True, unique=True)),
                ('account_creation_email', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='account_creation_Email', to='mailer.email')),
                ('account_creation_emailconfig', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='account_creation_email_config', to='mailer.emailconfiguration')),
                ('activate_account_email', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='account_activation_email', to='mailer.email')),
                ('activate_account_emailconfig', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='account_activation_email_config', to='mailer.emailconfiguration')),
                ('reset_password_email', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='password_reset_Email', to='mailer.email')),
                ('reset_password_emailconfig', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='password_reset_email_config', to='mailer.emailconfiguration')),
            ],
        ),
    ]
