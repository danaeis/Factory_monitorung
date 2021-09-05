from django.db.models import query
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated , IsAdminUser , AllowAny , BasePermission
from rest_framework.views import APIView
from .serializers import FactorySerializer, ShopfloorSerializer, ProductLineSerializer, SensorTypeSerializer, SensorSerializer
from .models import Factory, ProductLine, Sensor, SensorType, ShopFloor
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.http import HttpResponse
from rest_framework import status, generics
from rest_framework.response import Response

class LineSensorsApiView (generics.ListAPIView):
    serializer_class = SensorSerializer

    def get_queryset(self):
        owner = self.kwargs['owner_id']
        return Sensor.objects.filter(owner = owner)




class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user==obj.owners or request.user.is_superuser
        


class FactoryViewSet (viewsets.ModelViewSet, IsOwnerOrAdmin):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = FactorySerializer
    queryset = Factory.objects.all()


class ShopfloorViewSet (viewsets.ModelViewSet):
    serializer_class = ShopfloorSerializer
    queryset = ShopFloor.objects.all()


class ProductlineViewSet (viewsets.ModelViewSet):
    serializer_class = ProductLineSerializer
    queryset = ProductLine.objects.all()


class SensorTypeViewSet (viewsets.ModelViewSet):
    serializer_class = SensorTypeSerializer
    queryset = SensorType.objects.all()


class SensorViewSet (viewsets.ModelViewSet):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()



    # def get_permissions(self):
        # if self.action == 'GET':
            # return IsAuthenticated()
        # elif self.action == 'POST':
            # return IsAdminUser()
        # elif self.action == 'PUT':
            # return IsAdminUser()
        # elif self.action == 'DELETE':
            # return IsAdminUser()