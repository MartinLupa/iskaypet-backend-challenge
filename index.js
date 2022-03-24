const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const mascotaRoute = require("./routes/mascota");
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Base de datos conectada."))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/api/mascotas", mascotaRoute);

app.listen(port, () => {
  console.log("Servidor funcionando en puerto: ", port);
});
