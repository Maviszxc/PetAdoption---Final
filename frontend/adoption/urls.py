from django.urls import path, include
from . import views

urlpatterns = [

    path('', views.home, name='home'),
    path('shop', views.shop, name='shop'),
    path('pet', views.pet, name='pet'),
    path('login', views.login, name='login'),
    path('hint', views.hint, name='hint'),
    path('adminDashboard', views.adminDashboard, name='adminDashboard'),
    path('edit', views.edit, name='edit'),
]