const Extra = require("../Models/Extra");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const extras = await Extra.find();

    res.status(201).json({ extras });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const extras = await Extra.find({ user: req.params.user });

    res.status(201).json({ extras });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/", async (req, res) => {
  try {
    const { descricao, valor } = req.body;

    if (!descricao) {
      return res
        .status(422)
        .json({ error: "Descrição é obigatório", sucess: false });
    }

    if (!!req.body._id) {
      const extra = await Extra.findOneAndReplace(
        { _id: req.body._id },
        { ...req.body }
      );

      return res.status(201).json({ extra: req.body, sucess: true });
    }

    const extra = await Extra.create(req.body);
    return res.status(201).json({ extra, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const extras = await Extra.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(201).json({ extras, sucess: true });
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
    const extras = await Extra.deleteMany(req.query);

    res.status(201).json({ extras, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.post("/", async (req, res) => {
  const { descricao, valor, dtCompra } = req.body;

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

  try {
    await Extra.create(req.body);
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
