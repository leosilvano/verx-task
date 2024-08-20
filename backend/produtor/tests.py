import pytest
import json


@pytest.mark.django_db
def test_create_produtor(client):
    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    response = client.post("/produtor/api/", data=json.dumps(data), content_type="application/json")

    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }


@pytest.mark.django_db
def test_fail_create_produtor(client):
    data = {
        "nome_produtor": "Srta. Maya Nunes",
    }

    response = client.post("/produtor/api/", data=json.dumps(data), content_type="application/json")

    assert response.status_code == 400
    assert response.json() == {
        'area_agricultavel': [
            'This field is required.',
        ],
        'area_total': [
            'This field is required.',
        ],
        'area_vegetacao': [
            'This field is required.',
        ],
        'cidade': [
            'This field is required.',
        ],
        'cpf_cnpj': [
            'This field is required.',
        ],
        'estado': [
            'This field is required.',
        ],
        'nome_fazenda': [
            'This field is required.',
        ],
        'tipo_documento': [
            'This field is required.',
        ]
    }


@pytest.mark.django_db
def test_update_produtor(client):
    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    response = client.post("/produtor/api/", data=json.dumps(data), content_type="application/json")

    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    produtor_id = response.json()['id']
    response = client.patch(f"/produtor/api/{produtor_id}/", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 200


@pytest.mark.django_db
def test_fail_update_produtor(client):
    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    response = client.post("/produtor/api/", data=json.dumps(data), content_type="application/json")

    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    produtor_id = response.json()['id']
    response = client.patch(f"/produtor/api/{produtor_id}/", data=json.dumps(data), content_type="application/json")

    assert response.status_code == 400
    assert response.json() == {
        'cidade': [
            'This field is required.',
        ]
    }


@pytest.mark.django_db
def test_delete_produtor(client):
    data = {
        "cpf_cnpj": "97163405839",
        "tipo_documento": "CPF",
        "nome_produtor": "Srta. Maya Nunes",
        "nome_fazenda": "Pires",
        "cidade": "Ribeiro",
        "estado": "Mato Grosso",
        "area_total": 2213.02,
        "area_agricultavel": 927.66,
        "area_vegetacao": 1285.36,
        "culturas": [
            {
                "nome": "Café"
            },
            {
                "nome": "Algodão"
            }
        ]
    }

    response = client.post("/produtor/api/", data=json.dumps(data), content_type="application/json")

    produtor_id = response.json()['id']
    response = client.delete(f"/produtor/api/{produtor_id}/", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 200
