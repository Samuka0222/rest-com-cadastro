const SecurityService = require("../services/securityService.js");
const securityService = new SecurityService();

class SecurityController {
  static async registerAcl(req, res) {
    const { userId } = req;
    const { roles, permissions } = req.body;
    try {
      const acl = await securityService.registerAcl(userId, roles, permissions);
      res.status(201).send(acl);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async registerPermissionsRoles(req, res) {
    const { roleId, permissions } = req.body;
    try {
      const permissionsRoles = await securityService.registerPermissionsRoles(roleId, permissions);
      res.status(201).send(permissionsRoles)
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = SecurityController;
