(Brazilian Portuguese)

# Documentação da API

## Introdução

![Capa da API](./preview/domestic-life-illustrated.jpg)

Esta é a documentação da API REST desenvolvida com Node.js e Express para o projeto acadêmico da disciplina de Banco de Dados I em (19/02/2025). O projeto tem como objetivo gerenciar um sistema de bibliotecas, permitindo o cadastro e manipulação de usuários, livros, bibliotecas, empréstimos e relatórios.

## Funcionalidades

A API é composta por diversos módulos que desempenham funções específicas dentro do sistema:

### 1. Gerenciamento de Usuários

- Permite cadastrar, atualizar, remover e autenticar usuários no sistema.
- Autenticação baseada em login para acesso seguro.

### 2. Controle de Livros

- Registra novos livros com informações como título, autor e ISBN.
- Permite buscar, listar e remover livros.

### 3. Administração de Bibliotecas

- Permite cadastrar bibliotecas e associá-las a livros.
- Gerencia localizações e nomes das bibliotecas.

### 4. Sistema de Empréstimos

- Gerencia o registro de empréstimos de livros por usuários.
- Define prazos e controla devoluções.

### 5. Geração de Relatórios

- Permite gerar relatórios sobre usuários, livros e empréstimos.
- Fornece informações analíticas para administração da biblioteca.

## Estrutura do Projeto

O código é organizado em diferentes camadas:

- **Controllers**: Contém a lógica de negócio dos recursos da API.
- **Models**: Representa a estrutura dos dados e a interação com o banco.
- **Repositories**: Responsável pelo acesso aos dados.
- **Services**: Implementa a lógica de aplicação e intermedia entre controllers e repositories.
- **Routers**: Define as rotas da API e vincula os controllers correspondentes.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Banco de Dados (PostgreSQL)
- JWT para autenticação

## Como Executar

1. Clone o repositório:

```sh
git clone <url-do-repositorio>
```

2. Instale as dependências:

```sh
npm install
```

3. Crie um servidor postgresql e utilize o arquivo "postgre-database-dump.sql" para reconstruir
   o banco de dados necessário para a aplicacão.

4. Configure as variáveis de ambiente.

5. Execute a aplicação:

```sh
npm run dev
```

## Considerações Finais

Este projeto foi desenvolvido para gerenciar bibliotecas e seus componentes de forma simples e com uma linguagem acessível (português) no ambiente acadêmico em questão.

# Referências

Imagem Capa -> https://www.freepik.com/free-ai-image/domestic-life-illustrated_381099438.htm
