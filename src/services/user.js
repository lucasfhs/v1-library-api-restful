const RepositoryUser = require("../repositories/user");
const repository = new RepositoryUser();
class ServiceUser {
  get(id) {
    return repository.get(id);
  }
  getAll() {
    return repository.getAll();
  }
  put(id, userName, cpf, email, phoneNumber, birthDate) {
    return repository.put(id, userName, cpf, email, phoneNumber, birthDate);
  }

  post(userName, cpf, email, phoneNumber, birthDate) {
    return repository.post(userName, cpf, email, phoneNumber, birthDate);
  }

  delete(id) {
    return repository.delete(id);
  }
}
module.exports = ServiceUser;
