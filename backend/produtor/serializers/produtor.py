from drf_writable_nested.serializers import WritableNestedModelSerializer

from .cultura import CulturaSerializer
from ..models import Produtor, Cultura


class ProdutorSerializer(WritableNestedModelSerializer):
    culturas = CulturaSerializer(many=True, required=False)

    class Meta:
        model = Produtor
        fields = (
            "id",
            "cpf_cnpj",
            "tipo_documento",
            "nome_produtor",
            "nome_fazenda",
            "cidade",
            "estado",
            "area_total",
            "area_total",
            "area_agricultavel",
            "area_vegetacao",
            "culturas",
        )

    def create(self, validated_data):
        culturas = validated_data.pop('culturas')

        produtor_rural = Produtor(**validated_data)
        produtor_rural.clean()
        produtor_rural.save()

        for cultura in culturas:
            cultura_obj, created = Cultura.objects.get_or_create(nome=cultura.get("nome"))
            produtor_rural.culturas.add(cultura_obj)

        produtor_rural.refresh_from_db()

        return produtor_rural

    def update(self, instance, validated_data):
        culturas = validated_data.pop('culturas')

        instance.cpf_cnpj = validated_data.get("cpf_cnpj", instance.cpf_cnpj)
        instance.tipo_documento = validated_data.get("tipo_documento", instance.tipo_documento)
        instance.nome_produtor = validated_data.get("nome_produtor", instance.nome_produtor)
        instance.nome_fazenda = validated_data.get("nome_fazenda", instance.nome_fazenda)
        instance.cidade = validated_data.get("cidade", instance.cidade)
        instance.estado = validated_data.get("estado", instance.estado)
        instance.area_total = validated_data.get("area_total", instance.area_total)
        instance.area_agricultavel = validated_data.get("area_agricultavel", instance.area_agricultavel)
        instance.area_vegetacao = validated_data.get("area_vegetacao", instance.area_vegetacao)
        instance.save()

        instance.culturas.clear()
        for cultura in culturas:
            cultura_obj, created = Cultura.objects.get_or_create(nome=cultura.get("nome"))
            instance.culturas.add(cultura_obj)

        instance.refresh_from_db()

        return instance
