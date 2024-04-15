const { Router } = require("express");
const router = Router();

const SecurityController = require("../controllers/securityController.js");

router.post("/security/acl", SecurityController.registerAcl);
router.post("/security/permissions-roles", SecurityController.registerPermissionsRoles);

module.exports = router;
