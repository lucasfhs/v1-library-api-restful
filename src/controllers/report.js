const ServiceReport = require("../services/report");
const service = new ServiceReport();

class ControllerReport {
  async getBookCatalog(req, res) {
    const URL_Images = [
      { id: 1, url: "https://i.postimg.cc/YCqTgHNL/1.webp" },
      { id: 2, url: "https://i.postimg.cc/VkGpWV4G/2.webp" },
      { id: 3, url: "https://i.postimg.cc/fbVF2frw/3.webp" },
      { id: 4, url: "https://i.postimg.cc/xdBZWNwL/4.webp" },
      { id: 5, url: "https://i.postimg.cc/G2YfrhRV/5.webp" },
      { id: 6, url: "https://i.postimg.cc/j24kwgLh/6.webp" },
      { id: 7, url: "https://i.postimg.cc/YCqTgHNL/1.webp" },
      { id: 8, url: "https://i.postimg.cc/h4LY5jp7/8.webp" },
      { id: 9, url: "https://i.postimg.cc/Dy7NkTMp/9.webp" },
      { id: 10, url: "https://i.postimg.cc/zXpcqQmz/10.webp" },
    ];
    try {
      const books = await service.getBookCatalog();

      const imageMap = Object.fromEntries(
        URL_Images.map((img) => [img.id, img.url])
      );

      // Adiciona a chave img_url nos livros correspondentes
      const booksWithImages = books.map((book) => ({
        ...book,
        img_url:
          imageMap[book.id] || "https://i.postimg.cc/9M3xx59p/nocapa.jpg",
      }));
      res.status(200).json(booksWithImages);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching available books.",
        error: error.message,
      });
    }
  }
  async getAvailableBooks(req, res) {
    try {
      const books = await service.getAvailableBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching available books.",
        error: error.message,
      });
    }
  }

  async getBookAvailability(req, res) {
    try {
      const { idBook } = req.params;
      const books = await service.getBookAvailability(idBook);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching book availability.",
        error: error.message,
      });
    }
  }

  async getUserLoans(req, res) {
    try {
      const { cpfUser } = req.params;
      const loans = await service.getUserLoans(cpfUser);
      res.status(200).json(loans);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user loans.", error: error.message });
    }
  }

  async getLibrariesAndBooks(req, res) {
    try {
      const libraries = await service.getLibrariesAndBooks();
      res.status(200).json(libraries);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching libraries and books.",
        error: error.message,
      });
    }
  }

  async getBooksByCategory(req, res) {
    try {
      const books = await service.getBooksByCategory();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching books by category.",
        error: error.message,
      });
    }
  }

  async getLibrariesWithMoreThanFiveBooks(req, res) {
    try {
      const libraries = await service.getLibrariesWithMoreThanFiveBooks();
      res.status(200).json(libraries);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching libraries with more than five books.",
        error: error.message,
      });
    }
  }
}

module.exports = ControllerReport;
