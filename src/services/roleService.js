// TODO: Refator a importação do PrismaClient, criar um variavel em Utils
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RoleService {
  static async createRole(data) {
    const isRoleCreated = await prisma.role.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isRoleCreated) {
      throw new Error("Role já existe.");
    }

    try {
      const newRole = await prisma.role.create({
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

module.exports = RoleService;
