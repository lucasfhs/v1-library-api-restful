const UserRepository = require("../repositories/user");
const repository = new UserRepository();
class ControllerUser {
  async get(req, res) {
    try {
      const id = req.params.id;
      const user = await repository.get(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User not exists." });
    }
  }
  async put(req, res) {
    try {
      const id = req.params.id;
      const result = await repository.put(
        id,
        userName,
        cpf,
        email,
        phoneNumber,
        birthDate
      );
      res.status(200).json({ message: "User updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { userName, cpf, email, phoneNumber, birthDate } = req.body;
      const result = await repository.post(
        userName,
        cpf,
        email,
        phoneNumber,
        birthDate
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
      const result = await repository.delete(id);
      res.status(200).json({ message: "User updated successfully.", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerUser;
