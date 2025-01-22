const ServiceApiUser = require("../services/ApiUser");
const service = new ServiceApiUser();

class ControllerApiUser {
  async get(req, res) {
    try {
      const userLogin = req.params.userLogin;
      const user = await service.get(userLogin);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user.", error: error.message });
    }
  }
  async login(req, res) {
    try {
      const { userLogin, password } = req.body;
      const result = await service.login(userLogin, password);
      res.status(200).json({
        message: "User auth created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { userLogin, password } = req.body;
      const result = await service.post(userLogin, password);
      res.status(201).json({
        message: "User created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { password } = req.body;
      const userLogin = req.params.userLogin;
      const result = await service.update(userLogin, password);
      res.status(200).json({
        message: "User updated successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const userLogin = req.params.userLogin;
      const result = await service.delete(userLogin);
      if (result) {
        res.status(200).json({
          message: "User deleted successfully.",
          result,
        });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ControllerApiUser;
