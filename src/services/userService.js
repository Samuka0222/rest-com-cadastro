const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
  static async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        Role: {
          select: {
            id: true,
            name: true,
          },
        },
        Permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   password: false,
      // },
    });
  }

  static async getUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  static async createUser(data) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  static async updateUser(id, data) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  static async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = UserService;
