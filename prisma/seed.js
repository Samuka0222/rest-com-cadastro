const prisma = require("../src/utils/prismaClient.js");

const { hashPassword } = require("../src/utils/hashPassword.js")

const seed = async () => {
  try {
    const products = [
      {
        name: "Notebook",
        price: 1000,
        description: "Notebook de 1000",
      },
      {
        name: "Tablet",
        price: 500,
        description: "Tablet de 500",
      },
      {
        name: "Mouse",
        price: 200,
        description: "Mouse de 200",
      },
      {
        name: "Teclado",
        price: 100,
        description: "Teclado de 100",
      },
    ];

    for (const product of products) {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          description: product.description,
        },
      });
    }

    const roles = [
      {
        name: "Gerente",
        description: "Usuário com cargo de Gerente",
      },
      {
        name: "Estoquista",
        description: "Usuário responsável por controlar o estoque",
      },
      {
        name: "Vendedor",
        description: "Usuário com cargo de Vendedor",
      },
    ];

    for (const role of roles) {
      await prisma.role.create({
        data: {
          name: role.name,
          description: role.description,
        },
      });
    }

    const permissions = [
      {
        name: "Editar",
        description: "Usuário pode editar os  produtos",
      },
      {
        name: "Deletar",
        description: "Usuário pode deletar os produtos",
      },
      {
        name: "Adicionar",
        description: "Usuário pode adicionar novos produtos",
      },
    ];

    for (const permission of permissions) {
      await prisma.permissions.create({
        data: {
          name: permission.name,
          description: permission.description,
        },
      });
    }

    const users = [
      {
        name: "Carlinhos",
        email: "carlinhos@gmail.com",
        password: "123",
      },
      {
        name: "Teste",
        email: "teste@gmail.com",
        password: "123",
      }
    ];

    for (const user of users) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashPassword(user.password)
        },
      });
    }
  } catch (error) {
    console.error("Error during seed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
