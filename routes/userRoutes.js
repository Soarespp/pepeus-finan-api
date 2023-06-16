const User = require("../Models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({ users });
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
  const { name, pass, login } = req.body;

  if (!name) {
    res.status(422).json({ error: "Nome obigatório", sucess: false });
  }

  if (!pass) {
    res.status(422).json({ error: "Senha obigatória", sucess: false });
  }

  const user = { name, pass, login };

  try {
    await User.create(user);
    res.status(201).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ error: error, sucess: false });
  }
});

module.exports = router;
