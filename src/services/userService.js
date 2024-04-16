const prisma = require("../utils/prismaClient.js");

class UserService {
  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        Permissions: true,
        Role: true,
      }
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
