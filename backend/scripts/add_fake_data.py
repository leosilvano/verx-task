import random
import faker

from produtor.models import Produtor, Cultura


def run(*args):
    try:
        total = int(args[0])
    except Exception:
        total = 200

    fake = faker.Faker('pt_BR')
    for i in range(total):
        if i % 2 == 0:
            tipo_documento = "CPF"
            cpf_cnpj = fake.cpf().replace('.', '').replace('-', '')
        else:
            tipo_documento = "CNPJ"
            cpf_cnpj = fake.cnpj().replace('.', '').replace('-', '').replace('/', '')

        area_agricultavel = fake.pyfloat(right_digits=2, min_value=100, max_value=3000)
        area_vegetacao = fake.pyfloat(right_digits=2, min_value=100, max_value=3000)

        produtor = Produtor.objects.create(
            nome_produtor=fake.name(),
            nome_fazenda=fake.company(),
            tipo_documento=tipo_documento,
            cpf_cnpj=cpf_cnpj,
            cidade=fake.city(),
            estado=fake.state(),
            area_total=round(area_agricultavel + area_vegetacao, 2),
            area_agricultavel=area_agricultavel,
            area_vegetacao=area_vegetacao
        )

        random_culturas = ["Café", "Milho", "Algodão", "Cana de Açucar", "Feijão", "Arroz"]

        for y in range(1, fake.pyint(min_value=2, max_value=4)):
            nome_cultura = random_culturas.pop(random.randint(0, len(random_culturas) - 1))

            cultura_obj, created = Cultura.objects.get_or_create(nome=nome_cultura)
            produtor.culturas.add(cultura_obj)
