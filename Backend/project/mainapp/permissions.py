from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthenticatedOrPostOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.method == 'PUT' or request.method == 'PATCH':
            return request.user and request.user.is_authenticated
        return True
