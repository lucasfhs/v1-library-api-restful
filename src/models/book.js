const client = require("../config/database");

class Book {
  constructor(id, titulo, autor, categoria, paginas, preco, idioma) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria; // Já será um array do banco
    this.paginas = paginas;
    this.preco = preco;
    this.idioma = idioma;
  }

  static async create(titulo, autor, categoria, paginas, preco, idioma) {
    const query = `
      INSERT INTO Livro (Titulo, Autor, Categoria, Paginas, Preco, Idioma)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      titulo,
      autor,
      `{${categoria.join(",")}}`,
      paginas,
      preco,
      idioma,
    ];

    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new Book(
        row.id,
        row.titulo,
        row.autor,
        row.categoria, // PostgreSQL já retorna como array
        row.paginas,
        row.preco,
        row.idioma
      );
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM Livro WHERE ID = $1;`;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Book(
          row.id,
          row.titulo,
          row.autor,
          row.categoria, // PostgreSQL já retorna array
          row.paginas,
          row.preco,
          row.idioma
        );
      }
      return null;
    } catch (error) {
      console.error("Error finding book:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM Livro;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) =>
            new Book(
              row.id,
              row.titulo,
              row.autor,
              row.categoria, // Já é um array
              row.paginas,
              row.preco,
              row.idioma
            )
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  static async update(id, titulo, autor, categoria, paginas, preco, idioma) {
    const query = `
      UPDATE Livro
      SET Titulo = $1, Autor = $2, Categoria = $3, Paginas = $4, Preco = $5, Idioma = $6
      WHERE ID = $7
      RETURNING *;
    `;
    const values = [
      titulo,
      autor,
      `{${categoria.join(",")}}`,
      paginas,
      preco,
      idioma,
      id,
    ];

    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Book(
          row.id,
          row.titulo,
          row.autor,
          row.categoria,
          row.paginas,
          row.preco,
          row.idioma
        );
      }
      return null;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM Livro WHERE ID = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  }
}

module.exports = Book;
