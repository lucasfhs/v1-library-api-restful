const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/report");
const controller = new ReportController();
router.get("/report/getAvailableBooks", controller.getAvailableBooks);
router.get(
  "/report/getBookAvailability/:idBook",
  controller.getBookAvailability
);
router.get("/report/getUserLoans/:cpfUser", controller.getUserLoans);
router.get("/report/getLibrariesAndBooks", controller.getLibrariesAndBooks);
router.get("/report/getBooksByCategory", controller.getBooksByCategory);
router.get(
  "/report/getLibrariesWithMoreThanFiveBooks",
  controller.getLibrariesWithMoreThanFiveBooks
);

module.exports = router;
