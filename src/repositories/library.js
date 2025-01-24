const Library = require("../models/library");
class RepositoryLibrary {
  async post(name, address, phoneNumber) {
    console.log(name, address, phoneNumber);
    try {
      if (!name) {
        throw new Error("Name cannot be null.");
      } else if (
        !address.street ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.country ||
        !address.postal_code
      ) {
        throw new Error("Address cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone number cannot be null.");
      }
      const newLibrary = await Library.create(name, address, phoneNumber);
      if (!newLibrary) {
        throw new Error("Library could not be created.");
      }
      return newLibrary;
    } catch (error) {
      console.error("Error creating library:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const LibraryData = await Library.findById(id);
      if (!LibraryData) {
        throw new Error("Library not exists.");
      }
      return LibraryData;
    } catch (error) {
      console.error("Error get library:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const LibraryData = await Library.getAll();
      return LibraryData;
    } catch (error) {
      console.error("Error get library:", error);
      throw error;
    }
  }
  async put(id, name, address, phoneNumber) {
    try {
      if (!name) {
        throw new Error("Name cannot be null.");
      } else if (
        !address.street ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.country ||
        !address.postal_code
      ) {
        throw new Error("Address cannot be null.");
      } else if (!phoneNumber) {
        throw new Error("Phone number cannot be null.");
      }
      const newLibrary = await Library.update(id, name, address, phoneNumber);
      return newLibrary;
    } catch (error) {
      console.error("Error creating Library:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const libraryData = await Library.delete(id);
      if (!libraryData) {
        throw new Error("Library not exists.");
      }
      return libraryData;
    } catch (error) {
      console.error("Error get Library:", error);
      throw error;
    }
  }
}

module.exports = RepositoryLibrary;
