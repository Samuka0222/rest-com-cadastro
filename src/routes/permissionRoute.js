const { Router } = require("express");
const router = Router();

const PermissionController = require("../controllers/permissionController.js");

router.post("/permissions", PermissionController.createPermission);
router.get("/permissions", PermissionController.getAllPermissions);
router.get("/permissions/:id", PermissionController.getPermissionById);
router.put("/permissions/:id", PermissionController.updatePermission);
router.delete("/permissions/:id", PermissionController.deletePermission);

module.exports = router;
