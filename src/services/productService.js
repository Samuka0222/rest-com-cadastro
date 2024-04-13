const { PrismaClient} = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

class ProdutoService {
  static async getAllProducts () {
    return await prisma.products.findMany();
  }

  static async getProductById(id) {
    return await prisma.products.findUnique({
      where: {
        id: id
      }
    });
  }

  static async createProduct(data) {
    return await prisma.products.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Decimal(data.price),
      }
    });
  }

  static async updateProduct(id, data) {
    return await prisma.products.update({
      where: {
        id: id
      },
      data: {
        name: data.name,
        description: data.description,
        price: new Decimal(data.price),
      }
    });
  }

  static async deleteProduct(id) {
    return await prisma.products.delete({
      where: {
        id: id
      }
    });
  }
}

module.exports = ProdutoService;