const Loan = require("../models/loan");
class RepositoryLoan {
  async post(cpfUser, idBook, dateLoan, dateReturn, idLibrary) {
    try {
      if (!cpfUser) {
        throw new Error("cpfUser cannot be null.");
      } else if (!idBook) {
        throw new Error("idBook cannot be null.");
      } else if (!dateLoan) {
        throw new Error("dateLoan cannot be null.");
      } else if (!dateReturn) {
        throw new Error("dateReturn cannot be null.");
      } else if (!idLibrary) {
        throw new Error("idLibrary number cannot be null.");
      }
      const newLoan = await Loan.create(name, address, phoneNumber);
      if (!newLoan) {
        throw new Error("Loan could not be created.");
      }
      return newLoan;
    } catch (error) {
      console.error("Error creating Loan:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const LoanData = await Loan.findById(id);
      if (!LoanData) {
        throw new Error("Loan not exists.");
      }
      return LoanData;
    } catch (error) {
      console.error("Error get Loan:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const LoanData = await Loan.getAll();
      return LoanData;
    } catch (error) {
      console.error("Error get Loan:", error);
      throw error;
    }
  }
  async put(id, cpfUser, idBook, dateLoan, dateReturn, idLibrary) {
    try {
      if (!cpfUser) {
        throw new Error("cpfUser cannot be null.");
      } else if (!idBook) {
        throw new Error("idBook cannot be null.");
      } else if (!dateLoan) {
        throw new Error("dateLoan cannot be null.");
      } else if (!dateReturn) {
        throw new Error("dateReturn cannot be null.");
      } else if (!idLibrary) {
        throw new Error("idLibrary number cannot be null.");
      }
      const newLoan = await Loan.update(
        id,
        cpfUser,
        idBook,
        dateLoan,
        dateReturn,
        idLibrary
      );
      return newLoan;
    } catch (error) {
      console.error("Error creating Loan:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const LoanData = await Loan.delete(id);
      if (!LoanData) {
        throw new Error("Loan not exists.");
      }
      return LoanData;
    } catch (error) {
      console.error("Error get Loan:", error);
      throw error;
    }
  }
}

module.exports = RepositoryLoan;
