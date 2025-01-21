const ServiceUser = require("../services/user");
const service = new ServiceUser();
class ControllerUser {
  async get(req, res) {
    try {
      const id = req.params.id;
      const user = await service.get(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User not exists." });
    }
  }
  async getAll(req, res) {
    try {
      const user = await service.getAll();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User not exists." });
    }
  }
  async put(req, res) {
    try {
      const id = req.params.id;
      const { userName, cpf, email, phoneNumber, birthDate, password } =
        req.body;
      const result = await service.put(
        id,
        userName,
        cpf,
        email,
        phoneNumber,
        birthDate,
        password
      );
      res.status(200).json({ message: "User updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { userName, cpf, email, phoneNumber, birthDate, password } =
        req.body;
      const result = await service.post(
        userName,
        cpf,
        email,
        phoneNumber,
        birthDate,
        password
      );
      res
        .status(201)
        .json({ message: "The user has been created successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.delete(id);
      res.status(200).json({ message: "User updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerUser;
