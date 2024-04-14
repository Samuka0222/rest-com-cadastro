const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  } catch (error) {
    console.error("Error during seed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();