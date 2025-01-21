const User = require("../models/apiUser");

class RepositoryApiUser {
  async post(userLogin, password) {
    try {
      if (!userLogin) {
        throw new Error("UserLogin cannot be null.");
      } else if (!password) {
        throw new Error("Password cannot be null.");
      }
      const newUser = await User.create(userLogin, password);
      if (!newUser) {
        throw new Error("User could not be created.");
      }
      return newUser;
    } catch (error) {
      console.error("Error creating User:", error);
      throw error;
    }
  }
  async get(userLogin) {
    try {
      const userData = await User.findByUserLogin(userLogin);
      if (!userData) {
        throw new Error("User does not exist.");
      }
      return userData;
    } catch (error) {
      console.error("Error retrieving User:", error);
      throw error;
    }
  }

  async delete(userLogin) {
    try {
      const deletedUser = await User.delete(userLogin);
      if (!deletedUser) {
        throw new Error("User does not exist.");
      }
      return deletedUser;
    } catch (error) {
      console.error("Error deleting User:", error);
      throw error;
    }
  }
}

module.exports = RepositoryApiUser;
