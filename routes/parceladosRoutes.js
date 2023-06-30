const Parcelados = require("../Models/Parcelados");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const parcelados = await Parcelados.find(req.query);

    res.status(201).json({ parcelados });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const parcelado = await Parcelados.findById(req.body._id);
    // const parcelados = await Parcelados.findOneAndReplace(
    //   { _id: req.body._id },
    //   {
    //     ...req.body,
    //   }
    // );
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const parcelados = await Parcelados.findOneAndDelete(req.query);

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
  const { descricao, valor, dtCompra, dtFim } = req.body;

  if (!descricao) {
    return res
      .status(422)
      .json({ error: "Descrição é obigatório", sucess: false });
  }

  if (valor <= 0) {
    return res.status(422).json({ error: "Valor é obigatório", sucess: false });
  }

  if (!dtCompra) {
    return res
      .status(422)
      .json({ error: "Dt. Compra é obigatória", sucess: false });
  }

  if (!dtFim) {
    return res
      .status(422)
      .json({ error: "Dt. Compra é obigatória", sucess: false });
  }

  try {
    await Parcelados.create(req.body);
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
