const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const controller = new UserController();
router.post("/user", controller.post);
module.exports = router;
