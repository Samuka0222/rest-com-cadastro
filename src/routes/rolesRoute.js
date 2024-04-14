const { Router } = require("express");
const RoleController = require("../controllers/roleController.js");

const router = Router();

router.post("/roles", RoleController.createRole);
router.get("/role");
router.get("/role/:id");
router.put("/role/:id");
router.delete("/role/:id");

module.exports = router;
