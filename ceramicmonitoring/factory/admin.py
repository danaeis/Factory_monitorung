from django.contrib import admin
from .models import Factory,ShopFloor, ProductLine, SensorType, Sensor

# Register your models here.
admin.site.register(Factory)
admin.site.register(ShopFloor)
admin.site.register(ProductLine)
admin.site.register(SensorType)
admin.site.register(Sensor)