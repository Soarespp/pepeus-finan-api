const Parcelados = require("../Models/Parcelados");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const parcelados = await Parcelados.find(req.query);

    console.log("teste");

    res.status(201).json({ parcelados });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/", async (req, res) => {
  try {
    const { valor, vezes, pessoas } = req.body;

    let vlParcela = valor / (vezes || 1) / (pessoas.length + 1);

    const parcelado = await Parcelados.findByIdAndUpdate(req.query._id, {
      ...req.body,
      vlParcela,
    });

    res.status(200).json({ sucess: true, parcelado });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const parcelados = await Parcelados.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(201).json({ parcelados, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/", async (req, res) => {
  if (!req.query?.user) {
    res
      .status(500)
      .json({ error: "obrigatorio passar os dados do usuário", sucess: false });
    return;
  }

  try {
    const parcelados = await Parcelados.deleteMany(req.query);

    res.status(201).json({ parcelados, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.post("/", async (req, res) => {
  const { descricao, valor, vezes, pessoas } = req.body;

  if (!descricao) {
    return res
      .status(422)
      .json({ error: "Descrição é obigatório", sucess: false });
  }

  if (valor <= 0) {
    return res.status(422).json({ error: "Valor é obigatório", sucess: false });
  }

  let vlParcela = valor / (vezes || 1) / (pessoas.length + 1);

  try {
    await Parcelados.create({ ...req.body, vlParcela });
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
