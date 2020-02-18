const express = require("express");
const router = express.Router();
const middleware = require('../middlewares/authenticate'); 
const userController = require("../Controllers/userController");

router.post("/signup", userController.signupController);
router.post("/login", userController.LoginController);
router.get("/:id", middleware ,userController.getUserById);
router.patch("/edit/:id", middleware ,userController.editUserById);
router.delete("/delete/:id", middleware ,userController.deleteUserById);
router.get("/" , middleware ,userController.getAllUsersController);

module.exports = router;
