const client = require("../config/database");

class BookLibrary {
  constructor(id, idLivro, idBiblioteca, quantidadeDisponivel) {
    this.id = id;
    this.idLivro = idLivro;
    this.idBiblioteca = idBiblioteca;
    this.quantidadeDisponivel = quantidadeDisponivel;
  }

  static async create(idLivro, idBiblioteca, quantidadeDisponivel) {
    const query = `
      INSERT INTO Livro_Biblioteca (ID_Livro, ID_Biblioteca, Quantidade_Disponivel)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [idLivro, idBiblioteca, quantidadeDisponivel];
    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new BookLibrary(
        row.id,
        row.id_livro,
        row.id_biblioteca,
        row.quantidade_disponivel
      );
    } catch (error) {
      console.error(
        "Error while creating the book_library relationship:",
        error
      );
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM Livro_Biblioteca WHERE ID = $1;`;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new BookLibrary(
          row.id,
          row.id_livro,
          row.id_biblioteca,
          row.quantidade_disponivel
        );
      }
      return null;
    } catch (error) {
      console.error(
        "Error while finding the book_library relationship:",
        error
      );
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM Livro_Biblioteca;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) =>
            new BookLibrary(
              row.id,
              row.id_livro,
              row.id_biblioteca,
              row.quantidade_disponivel
            )
        );
      }
      return [];
    } catch (error) {
      console.error(
        "Error while fetching the book_library relationship:",
        error
      );
      throw error;
    }
  }

  static async update(id, idLivro, idBiblioteca, quantidadeDisponivel) {
    const query = `
      UPDATE Livro_Biblioteca
      SET ID_Livro = $1, ID_Biblioteca = $2, Quantidade_Disponivel = $3
      WHERE ID = $4
      RETURNING *;
    `;
    const values = [idLivro, idBiblioteca, quantidadeDisponivel, id];
    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new BookLibrary(
          row.id,
          row.id_livro,
          row.id_biblioteca,
          row.quantidade_disponivel
        );
      }
      return null;
    } catch (error) {
      console.error("Error updating book_library relationship:", error);
      throw error;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM Livro_Biblioteca WHERE ID = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting book_library relationship:", error);
      throw error;
    }
  }
}

module.exports = BookLibrary;
