const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SecurityService {
  async registerAcl(userId, roles, permissions) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        Role: true,
        Permissions: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const registeredRoles = await prisma.role.findMany({
      where: {
        id: {
          in: user.Role.map((role) => role.id),
        },
      },
    });

    const registeredPermissions = await prisma.permissions.findMany({
      where: {
        id: {
          in: user.Permissions.map((permission) => permission.id),
        },
      },
    });

    if (registeredRoles.length > 0) {
      try {
        registeredRoles.forEach(async (role) => {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              Role: {
                disconnect: {
                  id: role.id,
                },
              },
            },
          });
        });
      } catch (error) {
        throw new Error("Não foi possível excluir role(s) já registrada");
      }
    }

    if (registeredPermissions.length > 0) {
      try {
        registeredPermissions.forEach(async (permission) => {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              Permissions: {
                disconnect: {
                  id: permission.id,
                },
              },
            },
          });
        });
      } catch (error) {
        throw new Error("Não foi possível excluir permissões já registradas");
      }
    }

    roles.forEach(async (role) => {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          Role: {
            connect: {
              id: role,
            },
          },
        },
      });
    });

    permissions.forEach(async (permission) => {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          Permissions: {
            connect: {
              id: permission,
            },
          },
        },
      });
    });

    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        Role: true,
        Permissions: true,
      },
    });
  }

  async registerPermissionsRoles(roleId, permissions) {
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
      },
      include: {
        Permissions: true,
      },
    })

    if (!role) {
      throw new Error("Role não encontrada.");
    }

    const registeredPermissions = await prisma.permissions.findMany({
      where: {
        id: {
          in: role.Permissions.map((permission) => permission.id),
        },
      },
    });

    if (registeredPermissions.length > 0) {
      try {
        registeredPermissions.forEach(async (permission) => {
          await prisma.role.update({
            where: {
              id: roleId,
            },
            data: {
              Permissions: {
                disconnect: {
                  id: permission.id,
                },
              },
            },
          });
        });
      } catch (error) {
        throw new Error("Não foi possível excluir permissões já registradas");
      }
    }

    permissions.forEach(async (permission) => {
      await prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          Permissions: {
            connect: {
              id: permission,
            },
          },
        },
      });
    });

    return await prisma.role.findFirst({
      where: {
        id: roleId,
      },
      include: {
        Permissions: true,
      },
    });
  }
}

module.exports = SecurityService;
