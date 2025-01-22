const client = require("../config/database");

class ApiUser {
  constructor(usuarioLogin, senha) {
    this.usuarioLogin = usuarioLogin;
    this.senha = senha;
  }

  static async create(usuarioLogin, senha) {
    const query = `
      INSERT INTO Operador (Usuario_Login, Senha)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [usuarioLogin, senha];
    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new ApiUser(row.usuario_login, row.senha);
    } catch (error) {
      console.error("Error creating operator:", error);
      throw error;
    }
  }

  static async findByUserLogin(usuarioLogin) {
    const query = `SELECT * FROM Operador WHERE Usuario_Login = $1;`;
    try {
      const result = await client.query(query, [usuarioLogin]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new ApiUser(row.usuario_login, row.senha);
      }
      return null;
    } catch (error) {
      console.error("Error finding operator by login:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM Operador;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) => new ApiUser(row.usuario_login, row.senha)
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching operators:", error);
      throw error;
    }
  }

  static async update(usuarioLogin, newSenha) {
    const query = `
      UPDATE Operador
      SET Senha = $1
      WHERE Usuario_Login = $2
      RETURNING *;
    `;
    const values = [newSenha, usuarioLogin];
    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new ApiUser(row.usuario_login, row.senha);
      }
      return null;
    } catch (error) {
      console.error("Error updating operator password:", error);
      throw error;
    }
  }

  static async delete(usuarioLogin) {
    const query = `DELETE FROM Operador WHERE Usuario_Login = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [usuarioLogin]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting operator:", error);
      throw error;
    }
  }
}

module.exports = ApiUser;
