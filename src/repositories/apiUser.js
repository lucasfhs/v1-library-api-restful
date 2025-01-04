const User = require("../models/apiUser");

class RepositoryApiUser {
  async post(email, password) {
    try {
      if (!email) {
        throw new Error("Email cannot be null.");
      } else if (!password) {
        throw new Error("Password cannot be null.");
      }
      const newUser = await User.create(email, password);
      if (!newUser) {
        throw new Error("User could not be created.");
      }
      return newUser;
    } catch (error) {
      console.error("Error creating User:", error);
      throw error;
    }
  }

  async get(email) {
    try {
      const userData = await User.findByEmail(email);
      if (!userData) {
        throw new Error("User does not exist.");
      }
      return userData;
    } catch (error) {
      console.error("Error retrieving User:", error);
      throw error;
    }
  }

  async delete(email) {
    try {
      const deletedUser = await User.delete(email);
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
