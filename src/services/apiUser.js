const RepositoryApiUser = require("../repositories/ApiUser");
const jwt = require("jsonwebtoken");
const util = require("util");

const signAsync = util.promisify(jwt.sign);
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
  update(userLogin, password) {
    return repository.update(userLogin, password);
  }
  async login(userLogin, password) {
    try {
      const user = await this.get(userLogin, password);
      if (!user) {
        throw new Error("Usuario nao cadastrado");
      } else if (user.senha != password) {
        throw new Error("Senha incorreta");
      }
      const token = await signAsync(
        { userLogin: userLogin, password: password },
        process.env.SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24 * 7,
        }
      );
      return token;
    } catch (err) {
      throw new Error("Erro ao gerar o token JWT: " + err.message);
    }
  }
}
module.exports = ServiceApiUser;
