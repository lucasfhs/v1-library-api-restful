const ServiceApiUser = require("../services/ApiUser");
const service = new ServiceApiUser();

class ControllerApiUser {
  async get(req, res) {
    try {
      const email = req.params.email;
      const user = await service.get(email);
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
      const { email, password } = req.body;
      const currentUser = await service.get(email);
      if (!currentUser) {
        throw new Error("User or password invalid.");
      } else if (password !== currentUser.password) {
        return new Error("User or password invalid.");
      }
      const result = await service.login(email, password);
      res.status(201).json({
        message: "User auth created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async post(req, res) {
    try {
      const { email, password } = req.body;
      const result = await service.post(email, password);
      res.status(201).json({
        message: "User created successfully.",
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const email = req.params.email;
      const result = await service.delete(email);
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
