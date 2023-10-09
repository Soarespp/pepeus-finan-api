const { default: mongoose } = require("mongoose");

const Parcelados = mongoose.model("Parcelados", {
  user: String,
  descricao: String,
  valor: Number,
  cartao: String,
  vezes: Number,
  dtFim: Date,
  dtCompra: Date,
  observacao: String,
  vlParcela: Number,
  pessoas: [{ name: String }],
});

module.exports = Parcelados;
