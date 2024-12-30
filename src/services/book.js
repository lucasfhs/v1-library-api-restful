const RepositoryBook = require("../repositories/book");
const repository = new RepositoryBook();
class ServiceBook {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, title, author, category, pages) {
    return repository.put(id, title, author, category, pages);
  }

  post(title, author, category, pages) {
    return repository.post(title, author, category, pages);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceBook;
