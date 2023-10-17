from django.contrib.auth.models import User
from datetime import timedelta
from django.utils import timezone
from django.utils.http import urlsafe_base64_decode
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import ChangePasswordSerializer

from django.utils.encoding import force_str
from .tokens import account_activation_token
from account.serializers import AccountSerializer

from mainapp.authentication import AUTH_CLASS


class CustomLogin(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        # token.expires = timezone.now() + timedelta(minutes=1)
        token.save()
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'user': AccountSerializer(user, context={'request': request}).data
        })


class ActivateAccount(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):

        token = request.data['token']
        uidb64 = request.data['uidb64']

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({
                "message": "Account confirmation successful",
                "success": True
            })
        else:
            return Response({
                "message": "The confirmation details are invalid. Either they have been used or they are wrong",
                "success": False
            })


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': serializer.data
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@authentication_classes([AUTH_CLASS])
def check_user_logged_in(request):
    """
    Check if the user is logged in.
    """
    if request.user.is_authenticated:
        return Response({'logged_in': True})
    return Response({'logged_in': False})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def logout_user(request):
    """
    Log out a user by invalidating their token.
    """
    # Check if the user is authenticated with a valid token
    if request.user.is_authenticated:
        # Get the user's token
        try:
            token = Token.objects.get(user=request.user)
        except Token.DoesNotExist:
            return Response({'detail': 'User token not found.'}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the user's token to invalidate it
        token.delete()

        return Response({'detail': 'User logged out successfully.'})
    else:
        return Response({'detail': 'User is not logged in.'}, status=status.HTTP_401_UNAUTHORIZED)
