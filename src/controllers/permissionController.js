const PermissionService = require("../services/permissionService.js");

class PermissionController {
  static async createPermission(req, res) {
    try {
      const { name, description } = req.body;
      const newPermission = await PermissionService.createPermission({
        name,
        description,
      });
      res.status(200).json(newPermission);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissionController;
