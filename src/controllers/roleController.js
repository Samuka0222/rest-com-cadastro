const RoleService = require("../services/roleService.js");

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const roles = await RoleService.getRoleById(id);
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async createRole(req, res) {
    try {
      const { name, description } = req.body;
      const newRole = await RoleService.createRole({
        name,
        description,
      });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      await RoleService.updateRole(id, data);
      res.status(200).send("Role atualizada com sucesso!");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      await RoleService.deleteRole(id);
      res.status(200).send("Role deletada com sucesso!");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
