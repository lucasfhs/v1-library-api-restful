const ServiceReport = require("../services/report");
const service = new ServiceReport();

class ControllerReport {
  async getAvailableBooks(req, res) {
    try {
      const books = await service.getAvailableBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching available books.",
        error: error.message,
      });
    }
  }

  async getBookAvailability(req, res) {
    try {
      const { idBook } = req.params;
      const books = await service.getBookAvailability(idBook);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching book availability.",
        error: error.message,
      });
    }
  }

  async getUserLoans(req, res) {
    try {
      const { cpfUser } = req.params;
      const loans = await service.getUserLoans(cpfUser);
      res.status(200).json(loans);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user loans.", error: error.message });
    }
  }

  async getLibrariesAndBooks(req, res) {
    try {
      const libraries = await service.getLibrariesAndBooks();
      res.status(200).json(libraries);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching libraries and books.",
        error: error.message,
      });
    }
  }

  async getBooksByCategory(req, res) {
    try {
      const books = await service.getBooksByCategory();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching books by category.",
        error: error.message,
      });
    }
  }

  async getLibrariesWithMoreThanFiveBooks(req, res) {
    try {
      const libraries = await service.getLibrariesWithMoreThanFiveBooks();
      res.status(200).json(libraries);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching libraries with more than five books.",
        error: error.message,
      });
    }
  }
}

module.exports = ControllerReport;
