from django.db import models
# Import user model to reference
from django.contrib.auth.models import User


# Create your models here.

class Token(models.Model):
    """
    Accounts are linked to Users and store the key
    """

    account = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    key = models.BinaryField(max_length=128)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.name
