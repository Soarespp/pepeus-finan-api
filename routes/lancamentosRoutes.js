const Lancamentos = require("../Models/Lancamentos");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const lancamentos = await Lancamentos.find(req.query);

    res.status(201).json({ lancamentos });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const lancamentos = await Lancamentos.find({ user: req.params.user });

    res.status(201).json({ lancamentos });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const lancamentos = await Lancamentos.findOneAndReplace(
      { _id: req.params.id },
      { ...req.body }
    );

    res.status(201).json({ lancamentos, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const lancamentos = await Lancamentos.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(201).json({ lancamentos, sucess: true });
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
    const lancamentos = await Lancamentos.deleteMany(req.query);

    res.status(201).json({ lancamentos, sucess: true });
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

  try {
    const lancamento = await Lancamentos.create(req.body);
    res.status(201).json({ lancamento, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
