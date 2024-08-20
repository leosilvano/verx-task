from rest_framework import serializers

from ..models import Cultura


class CulturaSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(required=True, validators=[])

    class Meta:
        model = Cultura
        fields = ("nome",)
