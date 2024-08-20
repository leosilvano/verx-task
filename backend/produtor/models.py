from django.core.validators import MinValueValidator
from django.db import models
from rest_framework.exceptions import ValidationError
from pycpfcnpj import cpfcnpj


class Cultura(models.Model):
    nome = models.CharField(max_length=50, unique=True, verbose_name='Nome da Cultura')

    def __str__(self):
        return self.nome


class Produtor(models.Model):
    CPF_CNPJ_CHOICES = [
        ('CPF', 'CPF'),
        ('CNPJ', 'CNPJ'),
    ]

    cpf_cnpj = models.CharField(max_length=14, unique=True, verbose_name='CPF ou CNPJ')
    tipo_documento = models.CharField(max_length=4, choices=CPF_CNPJ_CHOICES, verbose_name='Tipo de Documento')
    nome_produtor = models.CharField(max_length=255, verbose_name='Nome do Produtor')
    nome_fazenda = models.CharField(max_length=255, verbose_name='Nome da Fazenda')
    cidade = models.CharField(max_length=255, verbose_name='Cidade')
    estado = models.CharField(max_length=20, verbose_name='Estado')
    area_total = models.FloatField(validators=[MinValueValidator(0)], verbose_name='Área Total (ha)')
    area_agricultavel = models.FloatField(validators=[MinValueValidator(0)], verbose_name='Área Agricultável (ha)')
    area_vegetacao = models.FloatField(validators=[MinValueValidator(0)], verbose_name='Área de Vegetação (ha)')
    culturas = models.ManyToManyField(Cultura, verbose_name='Culturas')

    def __str__(self):
        return f"{self.nome_produtor} - {self.nome_fazenda}"

    def clean(self):
        if self.tipo_documento == 'CNPJ':
            if not cpfcnpj.validate(self.cpf_cnpj):
                raise ValidationError({"cpf_cnpj": ["CNPJ Inválido"]})

        if self.tipo_documento == 'CPF':
            if not cpfcnpj.validate(self.cpf_cnpj):
                raise ValidationError({"cpf_cnpj": ["CPF Inválido"]})

        if self.area_agricultavel + self.area_vegetacao > self.area_total:
            raise ValidationError(
                "A soma da área agricultável e vegetação não pode ser maior que a área total da fazenda")

    def save(self, *args, **kwargs):
        # Fix CPF/CNPJ
        self.cpf_cnpj = cpfcnpj.clear_punctuation(self.cpf_cnpj)

        super(Produtor, self).save(*args, **kwargs)
