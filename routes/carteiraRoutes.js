const Carteira = require("../Models/Carteira");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const carteiras = await Carteira.find(req.query);

    res.status(201).json({ carteiras });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const carteira = await Carteira.findOne({ user: req.params.user });

    res.status(201).json({ carteira });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/", async (req, res) => {
  try {
    const carteira = await Carteira.findByIdAndUpdate(req.query._id, {
      ...req.body,
    });

    res.status(201).json({ carteira, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const carteiras = await Carteira.deleteOne({
      _id: req.params.id,
    });

    res.status(201).json({ carteiras, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/", async (req, res) => {
  if (!req.query?.user || req.query.length === 0) {
    res
      .status(500)
      .json({ error: "obrigatorio passar os dados do usuário", sucess: false });
    return;
  }

  try {
    const carteiras = await Carteira.deleteMany(req.query);

    res.status(201).json({ carteiras, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.post("/", async (req, res) => {
  const { salario, user } = req.body;

  if (!user) {
    return res
      .status(422)
      .json({ error: "Usuário é obigatório", sucess: false });
  }

  if (salario < 0) {
    return res
      .status(422)
      .json({ error: "Salario é obigatório", sucess: false });
  }

  try {
    await Carteira.create(req.body);
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
