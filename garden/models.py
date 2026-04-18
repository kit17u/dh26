from django.db import models
from django.contrib.auth.models import User

class Data(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    value = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) 

class Plant(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    scale = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    plant_model = models.IntegerField()