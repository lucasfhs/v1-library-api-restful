const client = require("../config/database");

class Library {
  constructor(id, nome, endereco, telefone) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
  }

  static async create(nome, endereco, telefone) {
    const query = `
      INSERT INTO biblioteca (nome, endereco, telefone)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [nome, endereco, telefone];
    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new Library(row.id, row.nome, row.endereco, row.telefone);
    } catch (error) {
      console.error("Error creating biblioteca:", error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM biblioteca WHERE id = $1;`;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Library(row.id, row.nome, row.endereco, row.telefone);
      }
      return null;
    } catch (error) {
      console.error("Error finding biblioteca:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM biblioteca;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) => new Library(row.id, row.nome, row.endereco, row.telefone)
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching bibliotecas:", error);
      throw error;
    }
  }

  static async update(id, nome, endereco, telefone) {
    const query = `
      UPDATE biblioteca
      SET nome = $1, endereco = $2, telefone = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [nome, endereco, telefone, id];
    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Library(row.id, row.nome, row.endereco, row.telefone);
      }
      return null;
    } catch (error) {
      console.error("Error updating biblioteca:", error);
      throw error;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM biblioteca WHERE id = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting biblioteca:", error);
      throw error;
    }
  }
}

module.exports = Library;
