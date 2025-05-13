const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const mensagem = "teste123";

const escreveLog = (mensagem) => {
  return `\n<${uuidv4()}> <${new Date().toLocaleString()}> <Nome aluno>`;
  //A ser implementado variavel para receber o nome do aluno
};

fs.appendFile("logs.txt", escreveLog(mensagem), (err) => {
  if (err) throw err;
  console.log("Senha salva!");
});
