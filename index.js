const express = require("express");
const userRouter = require("./src/routers/user");
const bookRouter = require("./src/routers/book");
const libraryRouter = require("./src/routers/library");
const bookLibraryRouter = require("./src/routers/bookLibrary");
const loanRouter = require("./src/routers/loan");
const apiUserRouter = require("./src/routers/ApiUser");
const authMiddleware = require("./src/middleware/auth");
const cors = require("cors"); // Importa corretamente o cors

const app = new express();
const PORT = 3000;

// Configuração básica do CORS
app.use(cors()); // **Chame o cors como uma função**

app.use(express.json());
app.use(apiUserRouter);

// Antes do middleware de autenticação
app.use(authMiddleware);

// Rotas
app.use(userRouter);
app.use(bookRouter);
app.use(libraryRouter);
app.use(bookLibraryRouter);
app.use(loanRouter);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server started : http://localhost:${PORT}`);
});
