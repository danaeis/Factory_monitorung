from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User
from PIL import Image
from django.db.models.deletion import CASCADE, SET_NULL
from django.db.models.query_utils import select_related_descend

# Create your models here.
class Factory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class ShopFloor(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(Factory, on_delete= models.CASCADE)

    def __str__(self):
        return f'{self.name}, {self.owner}'



class ProductLine(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(ShopFloor, on_delete= models.CASCADE)

    def __str__(self):
        return f'{self.name}, {self.owner}'


class SensorType(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(default='default.jpg',  upload_to='profile_pics')

    def __str__(self):
        return self.name

    def save(self):
        super().save()
        img = Image.open(self.image.path)
        if img.height > 300 or img.width>300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)

# class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete= models.CASCADE)
    # image = models.ImageField(default='default.jpg', upload_to='profile_pics')
# 
    # def __str__(self):
        # return f'{self.user.username} Profile'
# 
    # def save(self):
        # super().save()
# 
        # img = Image.open(self.image.path)
# 
        # if img.height > 300 or img.width>300:
            # output_size = (300, 300)
            # img.thumbnail(output_size)
            # img.save(self.image.path)
# 

class Sensor(models.Model):
    name = models.CharField(max_length=100)
    # type = models.CharField(max_length=100)
    mac_addr = models.CharField(max_length=100)
    pin_addr = models.CharField(max_length=100)
    place_inline = models.IntegerField()
    type = models.ForeignKey(SensorType, null=True, on_delete=SET_NULL)
    owner = models.ForeignKey(ProductLine, on_delete=CASCADE)

    def __str__(self) :
        return f'{self.name}'

    