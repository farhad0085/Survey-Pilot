from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    
    def has_permission(self, request, view):
        user = request.user

        if user.is_staff or user.is_superuser:
            return True
        return False


class IsSuperAdmin(BasePermission):
    
    def has_permission(self, request, view):
        user = request.user

        if user.is_superuser:
            return True
        return False

