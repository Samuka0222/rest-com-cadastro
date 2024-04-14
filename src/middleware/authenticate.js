const { verify, decode } = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Acess Token não informado.");
  }

  const [, acessToken] = token.split(" ");

  try {
    verify(acessToken, process.env.JWT_SECRET);
    const { id, email } = await decode(acessToken);
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    res.status(401).send("Usuário não autorizado.");
  }
};
