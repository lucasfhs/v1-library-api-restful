const BookLibrary = require("../models/bookLibrary");
class RepositoryBookLibrary {
  async post(idBook, idLibrary, amount) {
    try {
      if (!idBook) {
        throw new Error("IdBook cannot be null.");
      } else if (!idLibrary) {
        throw new Error("IdLibrary cannot be null.");
      } else if (!amount) {
        throw new Error("Amount cannot be null.");
      }
      const newBookLibrary = await BookLibrary.create(
        idBook,
        idLibrary,
        amount
      );
      if (!newBookLibrary) {
        throw new Error("Book library relationship could not be created.");
      }
      return newBookLibrary;
    } catch (error) {
      console.error("Error creating book library relationship:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const BookLibraryData = await BookLibrary.findById(id);
      if (!BookLibraryData) {
        throw new Error("Book library relationship not exists.");
      }
      return BookLibraryData;
    } catch (error) {
      console.error("Error get book library relationship:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const BookLibraryData = await BookLibrary.getAll();
      return BookLibraryData;
    } catch (error) {
      console.error("Error get book library relationship:", error);
      throw error;
    }
  }
  async put(id, idBook, idLibrary, amount) {
    try {
      if (!idBook) {
        throw new Error("IdBook cannot be null.");
      } else if (!idLibrary) {
        throw new Error("IdLibrary cannot be null.");
      } else if (!amount) {
        throw new Error("Amount cannot be null.");
      }
      const newBookLibrary = await BookLibrary.update(
        id,
        idBook,
        idLibrary,
        amount
      );
      return newBookLibrary;
    } catch (error) {
      console.error("Error creating book library relationship:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const BookLibraryData = await BookLibrary.delete(id);
      if (!BookLibraryData) {
        throw new Error("Book library relationship not exists.");
      }
      return BookLibraryData;
    } catch (error) {
      console.error("Error get book library relationship:", error);
      throw error;
    }
  }
}

module.exports = RepositoryBookLibrary;
