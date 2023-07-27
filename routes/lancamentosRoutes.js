const { default: mongoose } = require("mongoose");
const Categoria = require("../Models/Categoria");
const Lancamentos = require("../Models/Lancamentos");

const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log("teste de merge");
  console.log("teste 2");
  try {
    const categorias = await Categoria.find({ user: req.query.user });
    const lancamentos = await Lancamentos.find(req.query);

    const dataReturn = lancamentos.map((data) => {
      return {
        ...data._doc,
        categoria: categorias.find(
          (cat) => String(cat._id) === data._doc.categoria._id
        ),
      };
    });

    res.status(201).json({ lancamentos: dataReturn });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const lancamento = await Lancamentos.find({ ...req.params });

    res.status(201).json({ lancamento });
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
    const lancamento = await Lancamentos.create(req.body);
    res.status(201).json({ lancamento, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
