const UserService = require("../services/userService.js");
const { hashPassword } = require("../utils/hashPassword.js");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(400).send({ mesage: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ mesage: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = hashPassword(password);
      await UserService.createUser({
        name,
        email,
        password: hashedPassword.hashPassword,
      });
      res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      await UserService.updateUser(id, data);
      res.status(200).send({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(200).send({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserController;
