const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient;

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
}

module.exports = PermissionService;