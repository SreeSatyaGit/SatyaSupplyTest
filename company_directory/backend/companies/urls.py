# In companies/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('contacts/', views.contact_list, name='contact_list'),
    path('contacts/<int:contact_id>/', views.contact_details, name='contact_details'),
]
