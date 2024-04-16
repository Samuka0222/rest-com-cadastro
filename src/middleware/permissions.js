const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissions = (permissionList) => {
  return async (req, res, next) => {
    const { userId } = req;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        Permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).send("Usuário não cadastrado");
    }

    const registeredPermissions = user.Permissions.map(
      (permission) => permission.name
    );
    const authorizedPermissions = registeredPermissions.some(
      (registeredPermission) => {
        return permissionList.some(
          (permission) => permission === registeredPermission
        );
      }
    );

    if (!authorizedPermissions) {
      return res
        .status(401)
        .send("Usuário não possui permissão para essa rota.");
    }
    return next();
  };
};

module.exports = permissions;
