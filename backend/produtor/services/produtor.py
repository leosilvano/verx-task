from ..models import Produtor
from ..serializers.produtor import ProdutorSerializer


class ProdutorService:

    def list(self):
        produtor_rural = Produtor.objects.all()
        serializer = ProdutorSerializer(produtor_rural, many=True)
        return serializer.data

    def get(self, produtor_id):
        produtor_rural = Produtor.objects.get(pk=produtor_id)
        serializer = ProdutorSerializer(produtor_rural)
        return serializer.data

    def create(self, data):
        serializer = ProdutorSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            produtor_rural = serializer.create(serializer.validated_data)
            return ProdutorSerializer(produtor_rural).data

    def update(self, id_produtor, data):
        produtor_rural = Produtor.objects.get(pk=id_produtor)
        serializer = ProdutorSerializer(produtor_rural, data=data)
        if serializer.is_valid(raise_exception=True):
            produtor_rural = serializer.update(produtor_rural, serializer.validated_data)
            return ProdutorSerializer(produtor_rural).data

    def delete(self, id_produtor):
        produtor_rural = Produtor.objects.get(id=id_produtor)
        produtor_rural.delete()
        return {}
