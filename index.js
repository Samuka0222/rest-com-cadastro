const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi mom!");
});
