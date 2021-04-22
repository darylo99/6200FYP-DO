from django.db import models
# Import user model to reference
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse


# Create your models here.
"""
probably not needed, dont need to add to Users

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


    @receiver(post_save, sender=User)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
        return self.user.name
"""

class Token(models.Model):
    """
    Tokens are linked to user "Profile"'s and store the key

    """
    #account = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    accounts = models.ManyToManyField(User)
    key = models.BinaryField(max_length=128)

    class Meta:
        ordering = ['title']

    def get_absolute_url(self):
        """Returns url for accessing an instance """
        return reverse('show_token', args=[self.id])

    def __str__(self):
        return self.title
