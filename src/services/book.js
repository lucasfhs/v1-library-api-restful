const RepositoryBook = require("../repositories/book");
const repository = new RepositoryBook();
class ServiceBook {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, title, author, category, pages, language) {
    return repository.put(id, title, author, category, pages, language);
  }

  post(title, author, category, pages, language) {
    return repository.post(title, author, category, pages, language);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceBook;
