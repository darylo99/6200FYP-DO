"""
URLs file for words app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # words/ points to index view with name to link to mapping from template
    path('<int:pk>', views.show_token, name='show_token'),
]
