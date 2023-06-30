const { default: mongoose } = require("mongoose");

const Lancamentos = mongoose.model("Lancamentos", {
  user: String,
  descricao: String,
  type: String,
  valor: Number,
  dtCompra: Date,
  vezes: Number,
  dtFim: Date,
  default: Boolean,
  lancamentoCard: Boolean,
  resumo: Boolean,
});

module.exports = Lancamentos;
