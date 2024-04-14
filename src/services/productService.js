const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

class ProductService {
  static async getAllProducts() {
    return await prisma.product.findMany();
  }

  static async getProductById(id) {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Decimal(data.price),
      },
    });
  }

  static async updateProduct(id, data) {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  static async deleteProduct(id) {
    return await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = ProductService;
