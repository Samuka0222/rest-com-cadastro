const prisma = require("./prismaClient.js");

const registerRole = async (userId, roleId) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      Role: {
        connect: {
          id: roleId,
        },
      },
    },
  });
};

const registerPermissionOnUser = async (userId, permissionId) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      Permissions: {
        connect: {
          id: permissionId,
        },
      },
    },
  });
};

const registerPermissionOnRole = async (roleId, permissionId) => {
  await prisma.role.update({
    where: {
      id: roleId,
    },
    data: {
      Permissions: {
        connect: {
          id: permissionId,
        },
      },
    },
  });
};

module.exports = {
  registerRole,
  registerPermissionOnUser,
  registerPermissionOnRole,
};
