# Labeimage - Backend

### Meu primeiro projeto Full Stack!! 

## Escopo do projeto 📌
O projeto consiste na construção do backend de uma rede social, na qual os usuários podem criar imagens de assuntos de seu interesse que serão compartilhadas com todos aqueles cadastrados na aplicação. 

## Funcionalidades:

- É possível criar um usuário, não permitindo deixar campos vazios; 

- Cada usuário ao ser criado tem sua senha criptografada, recebe automaticamente um ID e um token de acesso;

- É possivel fazer login informando um email e senha cadastrado no banco de dados, o login também gera um token de acesso; 

- Ao fazer o login o usuário pode:

- Criar uma imagem fornecendo um título, descrição, arquivo, tags e coleção (a imagem será registrada no banco de dados com a data de criação e id de seu criador);

- Pesquisar por dados de um outro usuário (basta informar o Id do usuário);

- Pesquisar por todas as imagens cadastradas;

- Pesquisar por uma imagem específica (basta informar o Id da mesma);

- Ao pesquisar pela imagem ela retorna id, título, arquivo, tags, coleção data de criação e id do usuário que a registrou. 

## Ferramentas 🔧

Node Js — Plataforma para construir aplicações web escaláveis;

Typescript - TypeScript é um superconjunto de JavaScript que adiciona linguagem a linguagem;

Express - Framework para Node.js que permite à aplicação lidar com multiplas e diferentes requisições http à uma URL específica;

Knex - Construtor de SQL querys para Node.js, que dentre outras funciolnalidades, propicia a criação de pool de conexao e propagação;

MySQL Workbench - Plataforma utilizada para mexer no banco de dados.

Thunder Client - Extensão do VS Code para trabalhar com as requisições. 

## API (base url)

https://labeimage-guilherme.herokuapp.com

## Frontend 

https://github.com/Guilhermehmota/frontend-primeiro-projeto-full-stack
