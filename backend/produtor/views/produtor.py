from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from ..services.produtor import ProdutorService


class ProdutorList(APIView):
    def get(self, request):
        service = ProdutorService()
        return Response(service.list(), status=status.HTTP_200_OK)

    def post(self, request):
        service = ProdutorService()
        try:
            return Response(service.create(request.data), status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


class ProdutorDetail(APIView):
    def get(self, request, id_produtor):
        service = ProdutorService()
        try:
            return Response(service.get(id_produtor), status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, id_produtor):
        service = ProdutorService()
        try:
            return Response(service.update(id_produtor, request.data), status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id_produtor):
        service = ProdutorService()
        try:
            return Response(service.delete(id_produtor), status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)