const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      minlength: [3, "El nombre debe tener un mínimo de 3 carácteres."],
      maxlength: [16, "El nombre debe tener un máximo de 16 carácteres."],
      required: true,
    },
    especie: {
      type: String,
      enum: {
        values: ["perro", "gato", "ave", "reptil", "anfibio", "pez"],
        message: `{VALUE} no es una especie válida.`,
      },
      required: true,
    },
    genero: {
      type: String,
      enum: {
        values: ["macho", "hembra"],
        message: "El género debe ser macho o hembra.",
      },
      required: true,
    },
    edad: {
      type: Number,
      min: [1, "La edad debe ser superior a 1."],
      max: [99, "La edad debe ser inferior a 99."],
      required: true,
    },
    fecha_nacimiento: {
      type: Date,
      max: [Date(), "La fecha de nacimiento debe ser menor a la fecha actual."],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mascota", mascotaSchema);
