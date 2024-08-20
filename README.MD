# Instruções para inicialização do projeto

Fazendo build do docker:

    docker-compose build

Executando config Docker:

    docker-compose up

Execute as migrações do django:

    docker-compose run backend python manage.py migrate

Adicione dados para teste (Por padrão é criado 200 produtores): 

    docker-compose run backend python manage.py runscript add_fake_data

Para adicionar uma quantidade especifica de Produtores:

    docker-compose run backend python manage.py runscript add_fake_data --script-args {{ quantidade }}

Acesse o app de teste:

    http://localhost:3000

Execute testes unitário da api:

    docker-compose run backend pytest