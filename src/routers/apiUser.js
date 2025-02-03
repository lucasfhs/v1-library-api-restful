const express = require("express");
const router = express.Router();
const ApiUserController = require("../controllers/apiUser");
const controller = new ApiUserController();
router.post("/auth", controller.post);
router.get("/auth/:userLogin", controller.get);
router.delete("/auth/:userLogin", controller.delete);
router.post("/auth/loginUser", controller.loginUser);
router.post("/auth/loginAdmin", controller.loginAdmin);
router.put("/auth/:userLogin", controller.update);

module.exports = router;
