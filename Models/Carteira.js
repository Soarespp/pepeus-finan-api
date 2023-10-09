const { default: mongoose } = require("mongoose");

const Carteira = mongoose.model("Carteira", {
  login: String,
  user: String,
  name: String,
  pass: String,
  salario: Number,
  cartoes: Array,
  variaveis: Array,
});

module.exports = Carteira;
