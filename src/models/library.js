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
      VALUES ($1, ROW($2, $3, $4, $5, $6, $7), $8)
      RETURNING *;
    `;
    const values = [
      nome,
      endereco.street,
      endereco.neighborhood,
      endereco.city,
      endereco.state,
      endereco.country,
      endereco.postal_code,
      telefone,
    ];

    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return this._mapRowToLibrary(row);
    } catch (error) {
      console.error("Error creating biblioteca:", error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT id, nome, telefone, endereco::TEXT AS endereco
      FROM biblioteca
      WHERE id = $1;
    `;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        return this._mapRowToLibrary(result.rows[0]);
      }
      return null;
    } catch (error) {
      console.error("Error finding biblioteca:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `
      SELECT id, nome, telefone, endereco::TEXT AS endereco
      FROM biblioteca;
    `;
    try {
      const result = await client.query(query);
      return result.rows.map(this._mapRowToLibrary);
    } catch (error) {
      console.error("Error fetching bibliotecas:", error);
      throw error;
    }
  }

  static async update(id, nome, endereco, telefone) {
    const query = `
      UPDATE biblioteca
      SET nome = $1, endereco = ROW($2, $3, $4, $5, $6, $7), telefone = $8
      WHERE id = $9
      RETURNING *;
    `;
    const values = [
      nome,
      endereco.street,
      endereco.neighborhood,
      endereco.city,
      endereco.state,
      endereco.country,
      endereco.postal_code,
      telefone,
      id,
    ];

    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        return this._mapRowToLibrary(result.rows[0]);
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

  static _mapRowToLibrary(row) {
    let endereco = {};
    if (row.endereco) {
      const [rua, bairro, cidade, estado, pais, cep] = row.endereco
        .replace(/["\\()]/g, "")
        .split(",")
        .map((item) => item.trim());
      endereco = { rua, bairro, cidade, estado, pais, cep };
    }
    return new Library(row.id, row.nome, endereco, row.telefone);
  }
}

module.exports = Library;
