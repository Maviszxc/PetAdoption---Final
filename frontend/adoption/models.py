# adoption/models.py
from django.db import models

class Booking(models.Model):
    fname = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateField()
    time = models.TimeField()
    message = models.TextField()

    def __str__(self):
        return f"{self.fname} - {self.email}"
