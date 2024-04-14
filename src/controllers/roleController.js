const RoleService = require("../services/roleService.js");

class RoleController {
  static async createRole(req, res) {
    try {
      const { name, description } = req.body;
      const newRole = await RoleService.createRole({
        name,
        description,
      });
      res.status(200).json(newRole);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
