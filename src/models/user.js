const client = require("../config/database");

class User {
  constructor(id, nome, cpf, email, telefone, dataNascimento) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
  }

  static async create({ nome, cpf, email, telefone, dataNascimento }) {
    const query = `
      INSERT INTO usuario (Nome, CPF, Email, Telefone, Data_Nascimento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [nome, cpf, email, telefone, dataNascimento];
    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new User(
        row.id,
        row.nome,
        row.cpf,
        row.email,
        row.telefone,
        row.data_nascimento
      );
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM usuario WHERE ID = $1;`;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new User(
          row.id,
          row.nome,
          row.cpf,
          row.email,
          row.telefone,
          row.data_nascimento
        );
      }
      return null;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }
  static async getAll() {
    const query = `SELECT * FROM usuario;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) =>
            new User(
              row.id,
              row.nome,
              row.cpf,
              row.email,
              row.telefone,
              row.data_nascimento
            )
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async update(id, nome, cpf, email, telefone, dataNascimento) {
    const query = `
      UPDATE usuario
      SET Nome = $1, CPF = $2, Email = $3, Telefone = $4, Data_Nascimento = $5
      WHERE ID = $6
      RETURNING *;
    `;
    const values = [nome, cpf, email, telefone, dataNascimento, id];
    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new User(
          row.id,
          row.nome,
          row.cpf,
          row.email,
          row.telefone,
          row.data_nascimento
        );
      }
      return null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM usuario WHERE ID = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = User;
