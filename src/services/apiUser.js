const RepositoryApiUser = require("../repositories/ApiUser");
const repository = new RepositoryApiUser();
class ServiceApiUser {
  get(email) {
    return repository.get(email);
  }

  post(email, password) {
    return repository.post(email, password);
  }

  delete(email) {
    return repository.delete(email);
  }
}
module.exports = ServiceApiUser;
