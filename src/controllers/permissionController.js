const PermissionService = require("../services/permissionService.js");

class PermissionController {
  static async createPermission(req, res) {
    try {
      const { name, description } = req.body;
      const newPermission = await PermissionService.createPermission({
        name,
        description,
      });
      res.status(201).json(newPermission);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const permission = await PermissionService.getAllPermissions();
      res.status(200).json(permission);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async getPermissionById(req, res) {
    try {
      const { id } = req.params;
      const permission = await PermissionService.getPermissionById(id);
      res.status(200).json(permission);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async updatePermission(req, res) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      await PermissionService.updatePermission(id, data);
      res.status(200).send("Permissão atualizada com sucesso!");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletePermission(req, res) {
    try {
      const { id } = req.params;
      await PermissionService.deletePermission(id);
      res.status(200).send("Role deletada com sucesso!");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissionController;
