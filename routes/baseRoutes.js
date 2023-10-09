const Carteira = require("../Models/Carteira");
const Categoria = require("../Models/Categoria");
const Extra = require("../Models/Extra");
const Lancamentos = require("../Models/Lancamentos");
const Parcelados = require("../Models/Parcelados");
const User = require("../Models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne(req.query);
    const carteira = await Carteira.find({ user: user._id });
    const lancamentos = await Lancamentos.find({ user: user._id });
    const parcelados = await Parcelados.find({ user: user._id });

    res.status(201).json({
      data: { user, carteira, lancamentos, parcelados },
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id: idExc } = await User.findOne(req.query);

    await Carteira.deleteMany({ user: idExc });
    await Parcelados.deleteMany({ user: idExc });
    await Lancamentos.deleteMany({ user: idExc });
    await Categoria.deleteMany({ user: idExc });
    await Extra.deleteMany({ user: idExc });

    const user = await User.deleteOne({ _id: idExc });

    res
      .status(201)
      .json({ message: "user excluido com sucesso", sucess: true, user });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
