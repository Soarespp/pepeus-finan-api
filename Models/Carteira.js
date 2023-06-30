const { default: mongoose } = require("mongoose");

const Carteira = mongoose.model("Carteira", {
  user: String,
  salario: Number,
  cartoes: Array,
  variaveis: Array,
});

module.exports = Carteira;
