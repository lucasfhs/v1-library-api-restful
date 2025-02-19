const Report = require("../models/report");
class RepositoryReport {
  async getBookCatalog() {
    try {
      const ReportData = await Report.getBookCatalog();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getAvailableBooks() {
    try {
      const ReportData = await Report.getAvailableBooks();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getBookAvailability(idLibrary) {
    try {
      const ReportData = await Report.getBookAvailability(idLibrary);
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getUserLoans(cpfUser) {
    try {
      const ReportData = await Report.getUserLoans(cpfUser);
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getLibrariesAndBooks() {
    try {
      const ReportData = await Report.getLibrariesAndBooks();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getBooksByCategory() {
    try {
      const ReportData = await Report.getBooksByCategory();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getLibrariesWithMoreThanFiveBooks() {
    try {
      const ReportData = await Report.getLibrariesWithMoreThanFiveBooks();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getHighAvailabilityCatalog() {
    try {
      const ReportData = await Report.getHighAvailabilityCatalog();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
  async getMatureCustomers() {
    try {
      const ReportData = await Report.getMatureCustomers();
      return ReportData;
    } catch (error) {
      console.error("Error get Report:", error);
      throw error;
    }
  }
}

module.exports = RepositoryReport;
