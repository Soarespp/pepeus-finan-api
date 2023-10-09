const Carteira = require("../Models/Carteira");
const Categoria = require("../Models/Categoria");
const Extra = require("../Models/Extra");
const Lancamentos = require("../Models/Lancamentos");
const Parcelados = require("../Models/Parcelados");
const User = require("../Models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find(req.query);

    res.status(201).json({ user, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/login", async (req, res) => {
  console.log("login", { ...req.query });
  try {
    const usuarioFind = await User.findOne({
      ...req.query,
    });

    const carteira = await Carteira.findOne({ user: usuarioFind._id });
    res.status(201).json({
      usuario: usuarioFind,
      carteira,
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({ user, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/", async (req, res) => {
  try {
    const dataUpdate = { ...req.body, pass: req.body.pass };
    const users = await User.findOneAndReplace(
      { _id: req.body._id },
      { ...dataUpdate }
    );

    res.status(201).json({ users, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findOneAndDelete({ _id: req.params.id });

//     res.status(201).json({ user, sucess: true });
//   } catch (error) {
//     res.status(500).json({ error: error, sucess: false });
//   }
// });

router.post("/", async (req, res) => {
  const { name, pass, email, user } = req.body;

  if (!name) {
    res.status(422).json({ error: "Nome obigatório", sucess: false });
  }

  if (!pass) {
    res.status(422).json({ error: "Senha obigatória", sucess: false });
  }

  const UserExists = await User.findOne({
    user: user,
  });

  if (UserExists) {
    res.status(222).json({ error: "Usário ja cadastrado", sucess: false });
    return;
  }

  const userData = { name, pass: pass, email, user };

  try {
    const user = await User.create(userData).then((response) => {
      return response;
    });

    const carteira = await Carteira.create({
      user: user._id,
      salario: 0,
    });

    res.status(201).json({ user, carteira, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.query?.user) {
      res.status(500).json({ error: "Usuário é obrigatório.", sucess: false });
    }
    const { user: idExc } = req.query;
    if (!!req.query?.all) {
      await Carteira.deleteMany({ user: idExc });
      await Parcelados.deleteMany({ user: idExc });
      await Lancamentos.deleteMany({ user: idExc });
      await Categoria.deleteMany({ user: idExc });
      await Extra.deleteMany({ user: idExc });
    }

    const user = await User.deleteOne({ _id: idExc });

    res
      .status(201)
      .json({ message: "user excluido com sucesso", sucess: true, user });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
