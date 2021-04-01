"""SpeakableAuth URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# words
from django.urls import include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
]


# Add words app urls and redirect '/' to '/words/'
urlpatterns += [
    path('words/', include('words.urls')),
    path('', RedirectView.as_view(url='words/', permanent=True)),
]
