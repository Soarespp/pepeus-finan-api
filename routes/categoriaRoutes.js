const Categoria = require("../Models/Categoria");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find(req.query);

    res.status(201).json({ categorias });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.get("/:user/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ user: req.params.user });

    res.status(201).json({ categoria });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.put("/", async (req, res) => {
  try {
    await Categoria.findOneAndReplace(
      { user: req.query.user },
      { ...req.body }
    );

    res.status(201).json({ categoria: req.query, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.delete("/", async (req, res) => {
  try {
    const categoria = await Categoria.deleteMany(req.query);

    res.status(201).json({ categoria, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, dados: req.query, sucess: false });
  }
});

router.post("/", async (req, res) => {
  const { descricao, user, color } = req.body;

  if (!user) {
    return res
      .status(422)
      .json({ error: "Usuário é obigatório", sucess: false });
  }

  if (descricao < 0) {
    return res.status(422).json({ error: "Cor é obigatório", sucess: false });
  }

  if (color < 0) {
    return res.status(422).json({ error: "Cor é obigatório", sucess: false });
  }

  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json({ categoria, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

router.post("/aplicar_categorias", async (req, res) => {
  try {
    await req.body.categorias
      ?.filter((item) => (item?.type || "READ_ONLY") === "DELETE")
      ?.map(async (categoria) => {
        return await Categoria.deleteMany({
          _id: categoria._id,
          user: categoria.user,
        });
      });

    await req.body.categorias
      ?.filter((item) => (item?.type || "READ_ONLY") === "UPDATE")
      ?.map(async (categoria) => {
        await Categoria.findOneAndReplace(
          { user: categoria.user, _id: categoria._id },
          { ...categoria }
        );
      });

    await req.body.categorias
      ?.filter((item) => (item?.type || "READ_ONLY") === "NEW")
      ?.map(async (categoria) => {
        return inserirCategoria(categoria);
      });

    res.status(201).json({
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

const inserirCategoria = async (categoria) => {
  const { user, descricao, color } = categoria;
  if (!user) {
    return res
      .status(422)
      .json({ error: "Usuário é obigatório", sucess: false });
  }

  if (descricao === "") {
    return res.status(422).json({ error: "Cor é obigatório", sucess: false });
  }

  if (color === "") {
    return res.status(422).json({ error: "Cor é obigatório", sucess: false });
  }

  const datareturn = await Categoria.create(categoria);
  return datareturn;
};

module.exports = router;
