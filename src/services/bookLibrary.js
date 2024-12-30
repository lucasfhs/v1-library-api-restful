const RepositoryBookLibrary = require("../repositories/bookLibrary");
const repository = new RepositoryBookLibrary();
class ServiceBookLibrary {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, idBook, idLibrary, amount) {
    return repository.put(id, idBook, idLibrary, amount);
  }

  post(idBook, idLibrary, amount) {
    return repository.post(idBook, idLibrary, amount);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceBookLibrary;
