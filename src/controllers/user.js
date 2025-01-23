const ServiceUser = require("../services/user");
const service = new ServiceUser();
class ControllerUser {
  async get(req, res) {
    try {
      const cpf = req.params.cpf;
      const user = await service.get(cpf);
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
      const cpf = req.params.cpf;
      const { name, email, phoneNumber, birthDate, password, address } =
        req.body;

      const result = await service.put(
        cpf,
        name,
        email,
        phoneNumber,
        birthDate,
        password,
        address
      );
      res.status(200).json({ message: "User updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { cpf, name, email, phoneNumber, birthDate, password, address } =
        req.body;
      console.log(address);

      const result = await service.post(
        cpf,
        name,
        email,
        phoneNumber,
        birthDate,
        password,
        address
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
      const cpf = req.params.cpf;
      const result = await service.delete(cpf);
      res.status(200).json({ message: "User deleted successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerUser;
