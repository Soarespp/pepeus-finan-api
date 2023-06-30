require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const parceladosRoutes = require("./routes/parceladosRoutes");
const carteiraRoutes = require("./routes/carteiraRoutes");
const lancamentosRoutes = require("./routes/lancamentosRoutes");
const extasRoutes = require("./routes/extrasRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Finan
app.get("/", (req, res) => {
  res.json({ message: "sucesso" });
});

//Routes
app.use("/user", userRoutes);
app.use("/parcelados", parceladosRoutes);
app.use("/carteira", carteiraRoutes);
app.use("/lancamentos", lancamentosRoutes);
app.use("/extras", extasRoutes);
app.use("/categoria", categoriaRoutes);

const user = process.env.DB_USER;
const senha = encodeURIComponent(process.env.DB_PASSWORD);
const urlAtlas = `mongodb+srv://${user}:${senha}@principal.1jm8om7.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(urlAtlas)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Banco conectado");
  })
  .catch((error) => console.log(error));
