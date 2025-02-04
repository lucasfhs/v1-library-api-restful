const ServiceBook = require("../services/book");
const service = new ServiceBook();
class ControllerBook {
  async get(req, res) {
    try {
      const id = req.params.id;
      const book = await service.get(id);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: "Book not exists." });
    }
  }
  async getAll(req, res) {
    try {
      const book = await service.getAll();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: "Book not exists." });
    }
  }
  async put(req, res) {
    try {
      const id = req.params.id;
      const { title, author, category, pages, price, language } = req.body;
      const result = await service.put(
        id,
        title,
        author,
        category,
        pages,
        price,
        language
      );
      res.status(200).json({ message: "Book updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { title, author, category, pages, price, language } = req.body;
      const result = await service.post(
        title,
        author,
        category,
        pages,
        price,
        language
      );
      res
        .status(201)
        .json({ message: "The book has been created successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.delete(id);
      res.status(200).json({ message: "Book deleted successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerBook;
