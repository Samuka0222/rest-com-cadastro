const prisma = require("../utils/prismaClient.js");

class PermissionService {
  static async createPermission(data) {
    const isPermissionCreated = await prisma.permissions.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isPermissionCreated) {
      throw new Error("Permissão já existe.");
    }

    try {
      const newRole = await prisma.permissions.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar a Role.");
    }
  }

  static async getAllPermissions() {
    return await prisma.permissions.findMany();
  }

  static async getPermissionById(id) {
    return await prisma.permissions.findFirst({
      where: {
        id: id,
      },
    });
  }

  static async updatePermission(id, data) {
    return await prisma.permissions.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  static async deletePermission(id) {
    return await prisma.permissions.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = PermissionService;