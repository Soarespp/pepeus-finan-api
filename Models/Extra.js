const { default: mongoose } = require("mongoose");

const Extra = mongoose.model("Extra", {
  user: String,
  descricao: String,
  type: String,
  valor: Number,
  dtCompra: Date,
  vezes: Number,
  dtFim: Date,
  default: Boolean,
});

module.exports = Extra;
