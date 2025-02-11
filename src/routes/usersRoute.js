const { Router } = require("express");
const UserController = require("../controllers/UserController.js");
const authenticate = require("../middleware/authenticate.js");

const router = Router();
router.use(authenticate);

router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
