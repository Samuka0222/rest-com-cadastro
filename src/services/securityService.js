const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = require("../utils/registerRoleAndPermission.js");

class SecurityService {
  async registerAcl(userId, roles = [], permissions = []) {
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

    const [registeredRoles, registeredPermissions] = await Promise.all([
      prisma.role.findMany({
        where: {
          id: {
            in: user.Role.map((role) => role.id),
          },
        },
      }),
      prisma.permissions.findMany({
        where: {
          id: {
            in: user.Permissions.map((permission) => permission.id),
          },
        },
      }),
    ]);
    const registeredRolesId = registeredRoles.map((role) => role.id);
    const registeredPermissionsId = registeredPermissions.map(
      (permission) => permission.id
    );

    if (registeredRoles.length > 0) {
      try {
        const missingRoles = roles.filter(
          (missingRole) => !registeredRolesId.includes(missingRole)
        );
        missingRoles.forEach(
          async (role) => await register.registerRole(userId, role)
        );
      } catch (error) {
        throw new Error("Não foi possível excluir role(s) já registrada");
      }
    } else {
      roles.forEach(async (role) => await register.registerRole(userId, role));
    }

    if (registeredPermissions.length > 0) {
      try {
        const missingPermissions = permissions.filter(
          (missingPermission) =>
            !registeredPermissionsId.includes(missingPermission)
        );
        missingPermissions.forEach(
          async (permission) =>
            await register.registerPermissionOnUser(userId, permission)
        );
      } catch (error) {
        throw new Error("Não foi possível excluir permissões já registradas");
      }
    } else {
      permissions.forEach(
        async (permission) =>
          await register.registerPermissionOnUser(userId, permission)
      );
    }

    const updatedUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        Role: true,
        Permissions: true,
        password: false,
      },
    });
    return updatedUser;
  }

  async registerPermissionsRoles(roleId, permissions) {
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
      },
      include: {
        Permissions: true,
      },
    });

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
    const registeredPermissionsId = registeredPermissions.map(
      (permission) => permission.id
    );

    if (registeredPermissions.length > 0) {
      try {
        const missingPermissions = permissions.filter(
          (missingPermission) =>
            !registeredPermissionsId.includes(missingPermission)
        );
        missingPermissions.forEach(
          async (permission) =>
            await register.registerPermissionOnRole(userId, permission)
        );
      } catch (error) {
        throw new Error("Não foi possível excluir permissões já registradas");
      }
    } else {
      permissions.forEach(
        async (permission) =>
          await register.registerPermissionOnRole(userId, permission)
      );
    }

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
