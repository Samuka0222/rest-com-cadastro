const AuthService = require("../services/authService.js");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const login = await AuthService.authenticate(email, password);
      res.status(200).json(login);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = AuthController;