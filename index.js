require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Finan
app.get("/", (req, res) => {
  res.json({ message: "sucesso" });
});

//User
app.use("/user", userRoutes);

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
