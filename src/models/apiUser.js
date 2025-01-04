const client = require("../config/database");

class ApiUser {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async create(email, password) {
    const query = `
      INSERT INTO api_user (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [email, password];
    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new ApiUser(row.email, row.password);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM api_user WHERE email = $1;`;
    try {
      const result = await client.query(query, [email]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new ApiUser(row.email, row.password);
      }
      return null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM api_user;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map((row) => new ApiUser(row.email, row.password));
      }
      return [];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async update(email, newPassword) {
    const query = `
      UPDATE api_user
      SET password = $1
      WHERE email = $2
      RETURNING *;
    `;
    const values = [newPassword, email];
    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new ApiUser(row.email, row.password);
      }
      return null;
    } catch (error) {
      console.error("Error updating user password:", error);
      throw error;
    }
  }

  static async delete(email) {
    const query = `DELETE FROM api_user WHERE email = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [email]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = ApiUser;
