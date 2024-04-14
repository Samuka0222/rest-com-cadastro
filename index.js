const app = require("./src/app.js");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi mom!");
});
