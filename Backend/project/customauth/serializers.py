from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    # model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
