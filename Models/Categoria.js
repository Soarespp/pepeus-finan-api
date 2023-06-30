const { default: mongoose } = require("mongoose");

const Categoria = mongoose.model("Categoria", {
  user: String,
  descricao: String,
  color: String,
});

module.exports = Categoria;
