const User = require("../Models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log("user get");
  try {
    const users = await User.find();

    res.status(201).json({ users });
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
    const users = await User.findOne({ _id: req.params.id });

    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const users = await User.findOneAndReplace(
      { _id: req.params.id },
      { ...req.body }
    );

    console.log({ users });
    res.status(201).json({ users, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const users = await User.findOneAndDelete({ _id: req.params.id });

    res.status(201).json({ users, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
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

  const userData = { name, pass, email, user };

  try {
    await User.create(userData);
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
