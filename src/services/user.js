const RepositoryUser = require("../repositories/user");
const repository = new RepositoryUser();
class ServiceUser {
  get(cpf) {
    return repository.get(cpf);
  }
  getAll() {
    return repository.getAll();
  }

  put(cpf, name, email, phoneNumber, birthDate, password, address) {
    return repository.put(
      cpf,
      name,
      email,
      phoneNumber,
      birthDate,
      password,
      address
    );
  }

  post(cpf, name, email, phoneNumber, birthDate, password, address) {
    return repository.post(
      cpf,
      name,
      email,
      phoneNumber,
      birthDate,
      password,
      address
    );
  }

  delete(cpf) {
    return repository.delete(cpf);
  }
}
module.exports = ServiceUser;
