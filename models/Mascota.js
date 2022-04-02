const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    genero: { type: String, required: true },
    edad: { type: Number, required: true },
    fecha_nacimiento: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mascota", mascotaSchema);
