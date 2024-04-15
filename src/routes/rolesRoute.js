const { Router } = require("express");
const RoleController = require("../controllers/roleController.js");

const router = Router();

router.post("/roles", RoleController.createRole);
router.get("/roles", RoleController.getAllRoles);
router.get("/roles/:id", RoleController.getRoleById);
router.put("/roles/:id", RoleController.updateRole);
router.delete("/roles/:id", RoleController.deleteRole);

module.exports = router;
