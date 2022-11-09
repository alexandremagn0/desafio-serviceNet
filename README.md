# desafio-serviceNet

# Tecnologias Utilizadas

- Php
- Laravel
- Docker
- Mysql
- React
- Next
- Git

# Requisitos

- Php 8
- Composer
- Docker
- Node v16

# Instalação back-end

- Acessar a pasta do back-end

```sh
cd desafio-backend-serviceNet
```

- No Terminal, execute o comando:

```sh
composer install --ignore-platform-reqs
```

- Apos instalar as dependencias, utilizaremos o Laravel Sail (uma interface de linha de comando para o Docker)
- Verifique se a env esta configurada pois o Sail builda o container utilizando as variaveis da env 
- No Terminal, execute o comando:

```sh
./vendor/bin/sail up -d
```

- Apos finalizar a instalação e rodar o projeto, execute o comando de criação das tabelas do banco junto com as seeds

```sh
./vendor/bin/sail artisan migrate --seed
```

- Pronto, seu back-end esta configurado e rodando.

# Instalação front-end

- Acessar a pasta do front-end

```sh
cd desafio-frontend-serviceNet
```

- Instalar os pacotes do node

```sh
npm install
```

- Inicializar o servidor

```sh
npm run dev
```