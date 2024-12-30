const User = require("../models/user");

class RepositoryUser {
  async post(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const userData = await User.findByPk(id, {
        attributes: ["id", "name", "email", "createdAt"], // Define os campos a serem retornados
      });
      if (!userData) {
        throw new Error("User not exists.");
      }
      return userData;
    } catch (error) {
      console.error("Error get user:", error);
      throw error;
    }
  }
  async put(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const userData = await User.findByPk(id, {
        attributes: ["id", "name", "email", "createdAt"], // Define os campos a serem retornados
      });
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
