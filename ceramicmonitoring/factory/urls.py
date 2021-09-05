from django.urls import path, include
from .views import FactoryViewSet, LineSensorsApiView, ShopfloorViewSet, ProductlineViewSet, SensorTypeViewSet, SensorViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('factory', FactoryViewSet, basename='factory')
router.register('shopfloor', ShopfloorViewSet, basename='shopfloor')
router.register('productline', ProductlineViewSet, basename='productline')
router.register('sensortype', SensorTypeViewSet, basename='sensortype')
router.register('sensor', SensorViewSet, basename='sensor')
# 

urlpatterns =[
    path('', include(router.urls)),
    path('sensor/factoryline/<int:owner_id>/', LineSensorsApiView.as_view())

]


