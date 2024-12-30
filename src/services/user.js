const RepositoryUser = require("../repositories/user");
const repository = new RepositoryUser();
class ServiceUser {
  get(id) {
    return repository.get(id);
  }
  put(id) {
    return repository.put(id);
  }

  post(id) {
    return repository.post(id);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceUser;
