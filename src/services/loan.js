const RepositoryLoan = require("../repositories/loan");
const repository = new RepositoryLoan();
class ServiceLoan {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, cpfUser, idBook, dateLoan, dateReturn, idLibrary) {
    return repository.put(id, cpfUser, idBook, dateLoan, dateReturn, idLibrary);
  }

  post(cpfUser, idBook, dateLoan, dateReturn, idLibrary) {
    return repository.post(cpfUser, idBook, dateLoan, dateReturn, idLibrary);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceLoan;
