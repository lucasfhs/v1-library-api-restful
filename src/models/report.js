const client = require("../config/database");

class Report {
  static async getBookCatalog() {
    const query = `
SELECT 
    L.id, 
    titulo, 
    autor, 
    categoria, 
    paginas, 
    preco, 
    idioma, 
    COALESCE(SUM(quantidade_disponivel), 0) AS Quantidade_disponivel
FROM LIVRO L
LEFT JOIN livro_biblioteca R ON R.id_livro = L.id
LEFT JOIN biblioteca B ON R.id_biblioteca = B.id
GROUP BY L.id, titulo, autor, categoria, paginas, preco, idioma;

    `;
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching available books:", error);
      throw error;
    }
  }
  static async getAvailableBooks() {
    const query = `
      SELECT
        l.Titulo AS Livro,
        b.Nome AS Biblioteca,
        lb.Quantidade_Disponivel AS Quantidade
      FROM Livro_Biblioteca lb
      INNER JOIN Livro l ON lb.ID_Livro = l.ID
      INNER JOIN Biblioteca b ON lb.ID_Biblioteca = b.ID
      WHERE lb.Quantidade_Disponivel > 0;
    `;

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching available books:", error);
      throw error;
    }
  }

  static async getBookAvailability(idLivro) {
    const query = `
      SELECT
        l.Titulo AS Livro,
        b.Nome AS Biblioteca,
        lb.Quantidade_Disponivel AS Quantidade
      FROM Livro_Biblioteca lb
      INNER JOIN Livro l ON lb.ID_Livro = l.ID
      INNER JOIN Biblioteca b ON lb.ID_Biblioteca = b.ID
      WHERE lb.ID_Livro = $1;
    `;

    try {
      const result = await client.query(query, [idLivro]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching book availability:", error);
      throw error;
    }
  }

  static async getUserLoans(cpfUsuario) {
    const query = `
      SELECT
        e.ID AS Emprestimo_ID,
        l.Titulo AS Livro,
        b.Nome AS Biblioteca,
        TO_CHAR(e.Data_Emprestimo, 'DD/MM/YYYY') AS Emprestimo,
        TO_CHAR(e.Data_Devolucao, 'DD/MM/YYYY') AS Devolucao
      FROM Emprestimo e
      JOIN Livro l ON e.ID_Livro = l.ID
      JOIN Biblioteca b ON e.ID_Biblioteca = b.ID
      WHERE e.cpf_usuario = $1
      ORDER BY e.Data_Devolucao;
    `;

    try {
      const result = await client.query(query, [cpfUsuario]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user loans:", error);
      throw error;
    }
  }

  static async getLibrariesAndBooks() {
    const query = `
      SELECT
        b.Nome AS Biblioteca,
        l.Titulo AS Livro,
        COALESCE(lb.Quantidade_Disponivel, 0) AS Quantidade
      FROM Biblioteca b
      LEFT JOIN Livro_Biblioteca lb ON b.ID = lb.ID_Biblioteca
      LEFT JOIN Livro l ON lb.ID_Livro = l.ID;
    `;

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching libraries and books:", error);
      throw error;
    }
  }

  static async getBooksByCategory() {
    const query = `
      SELECT
        unnest(Categoria) AS Categoria,
        COUNT(*) AS Quantidade_Livros
      FROM Livro
      GROUP BY Categoria
      ORDER BY Quantidade_Livros DESC;
    `;

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching books by category:", error);
      throw error;
    }
  }

  static async getLibrariesWithMoreThanFiveBooks() {
    const query = `
      SELECT
        b.Nome AS Biblioteca,
        SUM(lb.Quantidade_Disponivel) AS Total_Livros_Disponiveis
      FROM Biblioteca b
      JOIN Livro_Biblioteca lb ON b.ID = lb.ID_Biblioteca
      GROUP BY b.Nome
      HAVING SUM(lb.Quantidade_Disponivel) > 5
      ORDER BY Total_Livros_Disponiveis DESC;
    `;

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error(
        "Error fetching libraries with more than five books:",
        error
      );
      throw error;
    }
  }
}

module.exports = Report;
