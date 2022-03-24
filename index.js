const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Servidor funcionando en puerto: ", port);
});
