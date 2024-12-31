const ServiceLoan = require("../services/loan");
const service = new ServiceLoan();
class ControllerLoan {
  async get(req, res) {
    try {
      const id = req.params.id;
      const loan = await service.get(id);
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Loan not exists." });
    }
  }
  async getAll(req, res) {
    try {
      const loan = await service.getAll();
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Loan not exists." });
    }
  }
  async put(req, res) {
    try {
      const id = req.params.id;
      const { idUser, idBook, dateLoan, dateReturn, idLibrary } = req.body;
      const result = await service.put(
        id,
        idUser,
        idBook,
        dateLoan,
        dateReturn,
        idLibrary
      );
      res.status(200).json({ message: "Loan updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { idUser, idBook, dateLoan, dateReturn, idLibrary } = req.body;
      const result = await service.post(
        idUser,
        idBook,
        dateLoan,
        dateReturn,
        idLibrary
      );
      res.status(201).json({
        message: "The Loan has been created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.delete(id);
      res.status(200).json({ message: "Loan deleted successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerLoan;
