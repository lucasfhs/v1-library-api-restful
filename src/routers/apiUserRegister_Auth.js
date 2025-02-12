const express = require("express");
const router = express.Router();
const ApiUserController = require("../controllers/apiUser");
const controller = new ApiUserController();
router.post("/auth", controller.post);
router.post("/auth/loginUser", controller.loginUser);
router.post("/auth/loginAdmin", controller.loginAdmin);

module.exports = router;
