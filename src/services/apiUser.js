const RepositoryApiUser = require("../repositories/ApiUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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

  login(email, password) {
    return jwt.sign(
      { email: email, password: password },
      process.env.SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
  }
}
module.exports = ServiceApiUser;
