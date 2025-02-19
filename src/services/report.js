const RepositoryReport = require("../repositories/report");
const repository = new RepositoryReport();
class ServiceReport {
  getHighAvailabilityCatalog() {
    return repository.getHighAvailabilityCatalog();
  }
  getMatureCustomers() {
    return repository.getMatureCustomers();
  }
  getBookCatalog() {
    return repository.getBookCatalog();
  }
  getAvailableBooks() {
    return repository.getAvailableBooks();
  }
  getBookAvailability(idBook) {
    return repository.getBookAvailability(idBook);
  }
  getUserLoans(cpfUser) {
    return repository.getUserLoans(cpfUser);
  }
  getLibrariesAndBooks() {
    return repository.getLibrariesAndBooks();
  }
  getBooksByCategory() {
    return repository.getBooksByCategory();
  }
  getLibrariesWithMoreThanFiveBooks() {
    return repository.getLibrariesWithMoreThanFiveBooks();
  }
}
module.exports = ServiceReport;
