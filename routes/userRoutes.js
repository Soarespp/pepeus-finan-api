const Carteira = require("../Models/Carteira");
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

router.get("/login/:user/:pass", async (req, res) => {
  try {
    const usuarioFind = await User.findOne({
      user: req.params.user,
      pass: req.params.pass,
    });

    if (!usuarioFind) {
      res.status(222).json({ error: "Usuário não encontrado", sucess: false });
      return;
    }

    const usuario = {
      _id: usuarioFind._id,
      name: usuarioFind.name,
      pass: usuarioFind.pass,
      user: usuarioFind.user,
    };
    res.status(201).json({
      usuario,
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

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

    res.status(201).json({ user, sucess: true });
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
