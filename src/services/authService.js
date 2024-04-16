const prisma = require("../utils/prismaClient.js");

const { sign } = require("jsonwebtoken");
const { comparePasswords } = require("../utils/hashPassword");

class AuthService {
  static async authenticate(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Usuário ou Senha inválida");
    }

    const acessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    return { acessToken };
  }
}

module.exports = AuthService;
