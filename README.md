
# Laravel

[![Build Status](https://github.com/laravel/framework/workflows/tests/badge.svg)](https://github.com/laravel/framework/actions)
[![Total Downloads](https://img.shields.io/packagist/dt/laravel/framework)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://img.shields.io/packagist/v/laravel/framework)](https://packagist.org/packages/laravel/framework)
[![License](https://img.shields.io/packagist/l/laravel/framework)](https://packagist.org/packages/laravel/framework)

## Sobre o Laravel

O Laravel é um framework de aplicação web com uma sintaxe expressiva e elegante. Ele visa facilitar o desenvolvimento, fornecendo tarefas comuns usadas na maioria dos projetos web, como:

- Roteamento simples e rápido.
- Container de injeção de dependência poderoso.
- Múltiplos back-ends para armazenamento de sessão e cache.
- ORM de banco de dados expressivo e intuitivo.
- Migrações de esquema agnósticas de banco de dados.
- Processamento robusto de trabalhos em segundo plano.
- Transmissão de eventos em tempo real.

O Laravel é acessível, poderoso e fornece as ferramentas necessárias para aplicativos grandes e robustos.

## Instalação

Siga estes passos para instalar o Laravel:

1. Clone o repositório:
git clone https://github.com/armandosoaress/Supliu
2. Instale as dependências:
 composer install
3. Crie o arquivo .env:
cp .env.example .env
4. Gere a chave da aplicação:
php artisan key:generate
5. Crie o banco de dados e configure o arquivo .env:
DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
6. Execute as migrations:
php artisan migrate
7. Execute o servidor:
php artisan serve
