const ServiceLibrary = require("../services/library");
const service = new ServiceLibrary();
class ControllerLibrary {
  async get(req, res) {
    try {
      const id = req.params.id;
      const library = await service.get(id);
      res.status(200).json(library);
    } catch (error) {
      res.status(500).json({ message: "Library not exists." });
    }
  }
  async getAll(req, res) {
    try {
      const library = await service.getAll();
      res.status(200).json(library);
    } catch (error) {
      res.status(500).json({ message: "Library not exists." });
    }
  }
  async put(req, res) {
    try {
      const id = req.params.id;
      const { name, address, phoneNumber } = req.body;
      const result = await service.put(id, name, address, phoneNumber);
      res
        .status(200)
        .json({ message: "Library updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { name, address, phoneNumber } = req.body;
      const result = await service.post(name, address, phoneNumber);
      res.status(201).json({
        message: "The Library has been created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.delete(id);
      res
        .status(200)
        .json({ message: "Library deleted successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerLibrary;
