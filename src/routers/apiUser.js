const express = require("express");
const router = express.Router();
const ApiUserController = require("../controllers/apiUser");
const controller = new ApiUserController();
router.post("/auth", controller.post);
router.get("/auth/:email", controller.get);
router.delete("/auth/:email", controller.delete);
module.exports = router;
