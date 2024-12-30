const RepositoryLibrary = require("../repositories/library");
const repository = new RepositoryLibrary();
class ServiceLibrary {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, name, address, phoneNumber) {
    return repository.put(id, name, address, phoneNumber);
  }

  post(name, address, phoneNumber) {
    return repository.post(name, address, phoneNumber);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceLibrary;
