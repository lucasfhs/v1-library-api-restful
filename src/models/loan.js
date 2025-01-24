const client = require("../config/database");

class Loan {
  constructor(
    id,
    cpfUsuario,
    idLivro,
    idBiblioteca,
    dataEmprestimo,
    dataDevolucao
  ) {
    this.id = id;
    this.cpfUsuario = cpfUsuario;
    this.idLivro = idLivro;
    this.idBiblioteca = idBiblioteca;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }

  static async create(
    cpfUsuario,
    idLivro,
    idBiblioteca,
    dataEmprestimo,
    dataDevolucao = null
  ) {
    // Converter datas para o formato ISO 8601
    const dataEmprestimoISO = new Date(
      dataEmprestimo.split("/").reverse().join("-")
    )
      .toISOString()
      .split("T")[0];
    const dataDevolucaoISO = dataDevolucao
      ? new Date(dataDevolucao.split("/").reverse().join("-"))
          .toISOString()
          .split("T")[0]
      : null;

    const query = `
      INSERT INTO emprestimo (cpf_usuario, id_livro, id_biblioteca, data_emprestimo, data_devolucao)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      cpfUsuario,
      idLivro,
      idBiblioteca,
      dataEmprestimoISO, // Garantido no formato YYYY-MM-DD
      dataDevolucaoISO, // Garantido no formato YYYY-MM-DD ou null
    ];

    try {
      const result = await client.query(query, values);
      const row = result.rows[0];
      return new Loan(
        row.id,
        row.cpf_usuario,
        row.id_livro,
        row.id_biblioteca,
        row.data_emprestimo,
        row.data_devolucao
      );
    } catch (error) {
      console.error("Error creating loan:", error.message);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM emprestimo WHERE id = $1;`;
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Loan(
          row.id,
          row.cpf_usuario,
          row.id_livro,
          row.id_biblioteca,
          row.data_emprestimo,
          row.data_devolucao
        );
      }
      return null;
    } catch (error) {
      console.error("Error finding loan:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM emprestimo;`;
    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        return result.rows.map(
          (row) =>
            new Loan(
              row.id,
              row.cpf_usuario,
              row.id_livro,
              row.id_biblioteca,
              row.data_emprestimo,
              row.data_devolucao
            )
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching loans:", error);
      throw error;
    }
  }

  static async update(
    id,
    cpfUsuario,
    idLivro,
    idBiblioteca,
    dataEmprestimo,
    dataDevolucao = null
  ) {
    // Converter datas para o formato ISO 8601
    const dataEmprestimoISO = new Date(
      dataEmprestimo.split("/").reverse().join("-")
    )
      .toISOString()
      .split("T")[0];
    const dataDevolucaoISO = dataDevolucao
      ? new Date(dataDevolucao.split("/").reverse().join("-"))
          .toISOString()
          .split("T")[0]
      : null;

    const query = `
      UPDATE emprestimo
      SET cpf_usuario = $1, id_livro = $2, id_biblioteca = $3, data_emprestimo = $4, data_devolucao = $5
      WHERE id = $6
      RETURNING *;
    `;

    const values = [
      cpfUsuario,
      idLivro,
      idBiblioteca,
      dataEmprestimoISO, // Garantido no formato YYYY-MM-DD
      dataDevolucaoISO, // Garantido no formato YYYY-MM-DD ou null
      id,
    ];

    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return new Loan(
          row.id,
          row.cpf_usuario,
          row.id_livro,
          row.id_biblioteca,
          row.data_emprestimo,
          row.data_devolucao
        );
      }
      return null;
    } catch (error) {
      console.error("Error updating loan:", error.message);
      throw error;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM emprestimo WHERE id = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting loan:", error);
      throw error;
    }
  }
}

module.exports = Loan;
