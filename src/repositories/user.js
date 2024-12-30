const User = require("../models/user");
class RepositoryUser {
  async post(userName, cpf, email, phoneNumber, birthDate) {
    try {
      if (!userName) {
        throw new Error("User name cannot be null.");
      } else if (!cpf) {
        throw new Error("Cpf cannot be null.");
      } else if (!email) {
        throw new Error("Email cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone Number cannot be null.");
      } else if (!birthDate) {
        throw new Error("Birth date cannot be null.");
      }
      const newUser = await User.create({
        nome: userName,
        cpf,
        email,
        telefone: phoneNumber,
        dataNascimento: birthDate,
      });
      if (!newUser) {
        throw new Error("User could not be created.");
      }
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const userData = await User.findById(id);
      if (!userData) {
        throw new Error("User not exists.");
      }
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
  async getAll(id) {
    try {
      const userData = await User.getAll();
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
  async put(id, userName, cpf, email, phoneNumber, birthDate) {
    try {
      if (!userName) {
        throw new Error("User name cannot be null.");
      } else if (!cpf) {
        throw new Error("Cpf cannot be null.");
      } else if (!email) {
        throw new Error("Email cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone Number cannot be null.");
      } else if (!birthDate) {
        throw new Error("Birth date cannot be null.");
      }
      const newUser = await User.update(
        id,
        userName,
        cpf,
        email,
        phoneNumber,
        birthDate
      );
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const userData = await User.delete(id);
      if (!userData) {
        throw new Error("User not exists.");
      }
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
}

module.exports = RepositoryUser;
