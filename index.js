const express = require("express");
const userRouter = require("./src/routers/user");
const app = new express();
const PORT = 3000;
app.use(express.json());
app.use(userRouter);
app.listen(PORT, () => {
  console.log(`Server started : http://localhost:${PORT}`);
});
