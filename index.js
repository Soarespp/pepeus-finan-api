const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Finan
app.get("/", (req, res) => {
  res.json({ message: "sucesso" });
});

//User
app.use("/user", userRoutes);

const user = "admin";
const senha = encodeURIComponent("UFQOKwcjyXElndVc");
const urlAtlas = `mongodb+srv://${user}:${senha}@principal.1jm8om7.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(urlAtlas)
  .then(() => {
    app.listen(3000);
    console.log("Banco conectado");
  })
  .catch((error) => console.log(error));
