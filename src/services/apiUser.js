const RepositoryApiUser = require("../repositories/ApiUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const repository = new RepositoryApiUser();
class ServiceApiUser {
  get(userLogin) {
    return repository.get(userLogin);
  }

  post(userLogin, password) {
    return repository.post(userLogin, password);
  }

  delete(userLogin) {
    return repository.delete(userLogin);
  }

  login(userLogin, password) {
    return jwt.sign(
      { userLogin: userLogin, password: password },
      process.env.SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
  }
}
module.exports = ServiceApiUser;
