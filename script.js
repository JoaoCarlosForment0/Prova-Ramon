const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const express = require("express");
const app = express();
app.use(express.json());

const escreveLog = (id, date, user) => {
  fs.appendFile("logs.txt", `\n${id} - ${date} - ${user}`, (err) => {
    if (err) throw err;
    console.log("Senha salva!");
  });
};

app.post("/logs", (req, res) => {
  const { nome } = req.body;
  let id = uuidv4();
  let date = new Date().toLocaleString();

  if (!nome)
    return res.status(400).json({ erro: "Nome é um dado obrigatório." });

  escreveLog(id, date, nome);
  return res.status(201).json({
    mensagem: "Log registrado",
    id: id,
  });
});

app.get("/logs/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) return res.status(400).json({ erro: err });
    const linhas = data.split("\n");
    const linhaId = linhas.find(linha => linha.startsWith(id))
    if(linhaId) return res.status(200).json({log: linhaId})
        else return res.status(400).json({erro: "Id não encontrado"})
  });
});

app.listen(3000, () => {
  console.log("Aberto em http://localhost:3000");
});
