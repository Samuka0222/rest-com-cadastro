const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const roles = (rolesList) => {
  return async (req, res, next) => {
    const { userId } = req;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        Role: {
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

    const registeredRoles = user.Role.map((role) => role.name);
    const authorizedRoles = registeredRoles.some((registeredRole) => {
      return rolesList.some((role) => role === registeredRole);
    });

    if (!authorizedRoles) {
      return res.status(401).send("Usuário não possui acesso a essa rota.");
    }
    return next();
  };
};

module.exports = roles;
