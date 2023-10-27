from django.contrib.auth.hashers import make_password
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from rest_framework.authtoken.admin import User

from .models import Profile
from mainapp.utils import BaseSerializer


class ProfileSerializer(BaseSerializer, serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'user', 'phone_no', 'checker', 'approver', 'can_update_bank_batch', 'is_finance_officer',
                  'can_verify_purchases']
        extra_kwargs = {
            'user': {
                "required": False
            }
        }


class AccountSerializer(BaseSerializer, WritableNestedModelSerializer):
    profile = ProfileSerializer(required=False)
    full_name = serializers.SerializerMethodField()

    def validate_email(self, email):
        if self.instance is None and User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email already exists. You can reset your password",
                                              code='unique')
        return email

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'full_name', 'password', 'email', 'is_superuser', 'is_staff',
                  'is_active', 'date_joined', 'last_login', 'profile']
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": False
            },
            "is_superuser": {
                "read_only": True
            },
            "is_staff": {
                "read_only": True
            },
            "is_active": {
                "read_only": True
            },
            "date_joined": {
                "read_only": True
            },
            "full_name": {
                "read_only": True,
                "required": False
            }
        }

    def get_full_name(self, obj):
        return obj.get_full_name()

    def create(self, validated_data, *args, **kwargs):
        validated_data['password'] = make_password(validated_data.get('password', validated_data.get('username')))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for key in list(validated_data.keys()):
            if key not in self.initial_data:
                validated_data.pop(key)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'profile' in required_fields:
            self.fields['profile'] = ProfileSerializer(many=False)
        return super(AccountSerializer, self).to_representation(instance)

