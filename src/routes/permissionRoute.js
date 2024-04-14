const { Router } = require("express");
const router = Router();

const PermissionController = require("../controllers/permissionController.js");

router.post("/permission", PermissionController.createPermission);
router.get("/permission");
router.get("/permission/:id");
router.put("/permission/:id");
router.delete("/permission/:id");

module.exports = router;