# Curso de Segurança com autenticação de Usuário

Esse projeto foi criado com junto ao curso de "Node.js: criando API Rest com autenticação, perfis de usuários e permissões" da plataforma Alura e mestrada pelo professor: [Raphael Lucas](https://github.com/rlgirao), Porém durante as aulas resolvi me desafiar e não seguir o curso com Sequelize como o professor usou. Decidi que iria fazer minha primeira API usando Prisma ORM, que eu já venho usando nas minhas aplicações Next.js e gosto muito em como ele facilita a parte do Banco de Dados. Porém nem tudo são flores e tive bastante dificuldade em certas partes, principalmente no cadastro de ACLs, além do fato que não é possível fazer relações many-to-many com o Prisma, mas acho que dei um jeito 😅.

## Tecnologias

- Node.JS;
- Express;
- Javascript;
- Nodemon;
- Prisma
- PostgreSQL
- banco de dados online: [Neon](https://neon.tech)

## Funcionalidade e como testar

Para testar essa API, primeiro baixe os arquivos da API e rode o comando:

```javascript
npm install
```

Após isso, crie o arquivo ".env" e adicione as seguintes váriaveis de ambiente:

```javascript
DATABASE_URL =
  "[insira o link da database Postgree de alguma plataforma online, Ex: Supabase, Neon, etc.]";

JWT_SECRET = "[secret]";

PORT = "[qualquer porta, ex: 3000]";
```

Agora precisamos configurar nosso banco de dados, então vamos rodar o comando:

```javascript
npx prisma dev --name gerar_tabelas_inicias
```

Com isso já deve estar tudo certo para testarmos nosso projeto, só verifique se o "seed.js" rodou automaticamente ao fazer a migração do banco, nesse arquivo tem alguns usuários de teste para você utilizar e testar as rotas.
API em si é "simples", CRUD básico para criar usuários, produtos, roles, permissões, etc. Só testar usando o Postman ou Insomnia (qual você gostar mais)

### Sinta-se livre para deixar seu feedback, sugestões e reportar bugs!

---

# English version.

# User Authentication Security Course

This project was created in conjunction with the course "Node.js: Creating Rest API with authentication, user profiles and permissions" from the Alura platform and taught by the professor: [Raphael Lucas](https://github.com/rlgirao) However, during the classes I decided to challenge myself and not follow the course with Sequelize as the teacher used. I decided that I would make my first API using Prisma ORM, which I have been using in my Next.js applications and I really like how it makes the database part easier. However, it's not all roses and I had a lot of difficulties in certain parts, especially in registering ACLs, in addition to the fact that it is not possible to make many-to-many relationships with Prisma, but I think I managed to figure it out .

## Technologies

- Node.JS;
- Express;
- Javascript;
- Nodemon;
- Prisma
- PostgreSQL
- Online database: [Neon](https://neon.tech)

## Functionality and how to test

To test this API, first download the API files and run the command:

```terminal
npm install
```

After that, create the ".env" file and add the following environment variables:

```javascript
DATABASE_URL =
  "[insert the link of the Postgree database from some online platform, Ex: Supabase, Neon, etc.]";

JWT_SECRET = "[secret]";

PORT = "[any port, ex: 3000]";
```

Now we need to configure our database, so let's run the command:

```terminal
npx prisma dev --name gerar_tabelas_inicias
```

With that, everything should be ready to test our project, just check if the "seed.js" ran automatically when doing the database migration, this file has some test users for you to use and test the routes.
The API itself is "simple", basic CRUD for creating users, products, roles, permissions, etc. Just test using Postman or Insomnia (whichever you like more)

### Feel free to leave your feedback and suggestions!
