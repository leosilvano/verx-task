from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from ..services.produtor import ProdutorService
from ..services.dashboard import DashboardService


class DashboardList(APIView):
    def get(self, request):
        service = DashboardService()
        return Response(service.get(), status=status.HTTP_200_OK)
