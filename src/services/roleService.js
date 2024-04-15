// TODO: Refator a importação do PrismaClient, criar um variavel em Utils
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RoleService {
  static async getAllRoles() {
    return await prisma.role.findMany({
      include: {
        Permissions: true,
      }
    });
  }

  static async getRoleById(id) {
    return await prisma.role.findFirst({
      where: {
        id: id,
      },
    });
  }

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

  static async updateRole(id, data) {
    return await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  static async deleteRole(id) {
    return await prisma.role.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = RoleService;
