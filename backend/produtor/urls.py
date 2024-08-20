from django.urls import path

from .views import produtor
from .views import dashboard

urlpatterns = [
    path('api/', produtor.ProdutorList.as_view()),
    path('api/<int:id_produtor>/', produtor.ProdutorDetail.as_view()),
    path('api/dashboard/', dashboard.DashboardList.as_view())
]
