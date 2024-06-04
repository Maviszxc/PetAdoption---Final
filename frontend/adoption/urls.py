from django.urls import path, include
from . import views

urlpatterns = [

    path('', views.home, name='home'),
    path('shop', views.shop, name='shop'),
    path('pet', views.pet, name='pet'),
    path('login', views.login, name='login'),
    path('hint', views.hint, name='hint'),
    path('adminDashboard', views.adminDashboard, name='adminDashboard'),
    path('adminShop', views.adminShop, name='adminShop'),
    path('adminPet', views.adminPet, name='adminPet'),
    path('edit', views.edit, name='edit'),
    path('addCart', views.addCart, name='addCart'),
    path('book', views.book, name='book'),
    path('create-booking', views.create_booking, name='create_booking'),
    path('adminBook', views.adminBook, name='adminBook'), 
]