const User = require("../models/user");
class RepositoryUser {
  async post(cpf, name, email, phoneNumber, birthDate, password, address) {
    try {
      if (!name) {
        throw new Error("User name cannot be null.");
      } else if (!cpf) {
        throw new Error("Cpf cannot be null.");
      } else if (!email) {
        throw new Error("Email cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone Number cannot be null.");
      } else if (!birthDate) {
        throw new Error("Birth date cannot be null.");
      } else if (!password) {
        throw new Error("Password cannot be null.");
      } else if (
        !address.street ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.country ||
        !address.postal_code
      ) {
        throw new Error("Address cannot be null.");
      }

      const newUser = await User.create(
        cpf,
        name,
        email,
        phoneNumber,
        birthDate,
        address,
        password
      );
      if (!newUser) {
        throw new Error("User could not be created.");
      }
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async get(cpf) {
    try {
      const userData = await User.findByCPF(cpf);
      if (!userData) {
        throw new Error("User not exists.");
      }
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const userData = await User.getAll();
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
  async put(cpf, name, email, phoneNumber, birthDate, password, address) {
    try {
      console.log(cpf, name, email, phoneNumber, birthDate, address, password);
      if (!name) {
        throw new Error("User name cannot be null.");
      } else if (!cpf) {
        throw new Error("Cpf cannot be null.");
      } else if (!email) {
        throw new Error("Email cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone Number cannot be null.");
      } else if (!birthDate) {
        throw new Error("Birth date cannot be null.");
      } else if (!password) {
        throw new Error("Password cannot be null.");
      } else if (
        !address.street ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.country ||
        !address.postal_code
      ) {
        throw new Error("Address cannot be null.");
      }

      const newUser = await User.update(
        cpf,
        name,
        email,
        phoneNumber,
        birthDate,
        address,
        password
      );
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async delete(cpf) {
    try {
      const userData = await User.delete(cpf);
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
