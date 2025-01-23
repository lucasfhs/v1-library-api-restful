const client = require("../config/database");

class User {
  constructor(cpf, nome, email, telefone, dataNascimento, endereco, senha) {
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.senha = senha;
  }

  static async create(
    cpf,
    name,
    email,
    phoneNumber,
    birthDate,
    address,
    password
  ) {
    const query = `
      INSERT INTO usuario (CPF, Nome, Email, Telefone, Data_Nascimento, Endereco, Senha)
      VALUES ($1, $2, $3, $4, $5, ROW($6, $7, $8, $9, $10, $11), $12)
      RETURNING *;
    `;
    const values = [
      cpf,
      name,
      email,
      phoneNumber,
      birthDate,
      address.street,
      address.neighborhood,
      address.city,
      address.state,
      address.country,
      address.postal_code,
      password,
    ];
    console.log(values);
    try {
      const result = await client.query(query, values);
      return this._mapRowToUser(result.rows[0]);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async findByCPF(cpf) {
    const query = `
      SELECT CPF, Nome, Email, Telefone, Data_Nascimento, 
             Endereco::TEXT AS endereco, Senha
      FROM usuario
      WHERE CPF = $1;
    `;
    try {
      const result = await client.query(query, [cpf]);
      if (result.rows.length > 0) {
        return this._mapRowToUser(result.rows[0]);
      }
      return null;
    } catch (error) {
      console.error("Error finding user by CPF:", error);
      throw error;
    }
  }

  static async getAll() {
    const query = `
      SELECT CPF, Nome, Email, Telefone, Data_Nascimento, 
             Endereco::TEXT AS endereco, Senha
      FROM usuario;
    `;
    try {
      const result = await client.query(query);
      return result.rows.map(this._mapRowToUser);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async update(
    cpf,
    name,
    email,
    phoneNumber,
    birthDate,
    address,
    password
  ) {
    const query = `
      UPDATE usuario
      SET Nome = $1, Email = $2, Telefone = $3, Data_Nascimento = $4, 
          Endereco = ROW($5, $6, $7, $8, $9, $10), Senha = $11
      WHERE CPF = $12
      RETURNING *;
    `;
    const values = [
      name, // $1
      email, // $2
      phoneNumber, // $3
      birthDate, // $4
      address.street, // $5
      address.neighborhood, // $6
      address.city, // $7
      address.state, // $8
      address.country, // $9
      address.postal_code, // $10
      password, // $11
      cpf, // $12
    ];

    try {
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        return this._mapRowToUser(result.rows[0]);
      }
      return null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async delete(cpf) {
    const query = `DELETE FROM usuario WHERE CPF = $1 RETURNING *;`;
    try {
      const result = await client.query(query, [cpf]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  static _mapRowToUser(row) {
    let endereco = {};
    if (row.endereco) {
      const [rua, bairro, cidade, estado, pais, cep] = row.endereco
        .replace(/["\\()]/g, "") // Remove as barras invertidas e aspas
        .split(",")
        .map((item) => item.trim()); // Remove espaços extras
      endereco = { rua, bairro, cidade, estado, pais, cep };
    }
    return new User(
      row.cpf,
      row.nome,
      row.email,
      row.telefone,
      row.data_nascimento,
      endereco,
      row.senha
    );
  }
}

module.exports = User;
