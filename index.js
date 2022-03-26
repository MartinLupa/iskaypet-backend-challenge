const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mascotaRoute = require("./routes/mascota");
const mongoose = require("mongoose");
const path = require("path");

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Iskaypet-backend-challenge API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//Settings
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

//Base de datos
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Base de datos conectada."))
  .catch((err) => console.log(err));

//Middlewares
app.use(bodyParser.json());
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//Servir contenido estático
app.use(express.static("public"));

app.use("/api/mascotas", mascotaRoute);

app.listen(port, () => {
  console.log("Servidor funcionando en puerto: ", port);
});
