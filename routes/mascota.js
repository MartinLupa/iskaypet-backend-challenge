const router = require("express").Router();
const Mascota = require("../models/Mascota");

//CREAR MASCOTA
router.post("/", async (req, res) => {
  const nuevaMascota = new Mascota({
    nombre: req.body.nombre,
    especie: req.body.especie,
    genero: req.body.genero,
    edad: req.body.edad,
    fecha_nacimiento: req.body.fecha_nacimiento,
  });

  try {
    const mascotaIncorporada = await nuevaMascota.save();
    res.status(201).send(mascotaIncorporada);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CONSULTAR TODAS LAS MASCOTAS
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.status(200).json(mascotas);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ESTADISTICAS - KPI
router.get("/kpimascotas/", async (req, res) => {
  const especieMasNumerosa = await Mascota.find({ especie: "perro" });
  res.send({
    "Especie mas numerosa": especieMasNumerosa,
    "Edad promedio de perros": "A calcular",
    "Edad promedio de gatos": "A calcular",
    "Desviación estandar entre edades": "A calcular",
  });
});

module.exports = router;
