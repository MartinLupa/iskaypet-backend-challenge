const router = require("express").Router();
const Mascota = require("../models/Mascota");
const {
  especieMasNumerosa,
  edadPromedioPorEspecie,
  desviacionEstandarEdadesPorEspecie,
} = require("../helpers/KPImascotas");

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
    res.status(201).send({
      msg: "La mascota ha sido creada correctamente",
      mascotaIncorporada,
    });
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
  const listaMascotas = await Mascota.find();
  const especie = await especieMasNumerosa(listaMascotas, "especie");
  const promedio = await edadPromedioPorEspecie(listaMascotas);
  const desviacionEstandar = desviacionEstandarEdadesPorEspecie(listaMascotas);

  res.send({
    "Especie mas numerosa": especie,
    "Edad promedio por especie": promedio,
    "Desviación estandar edades por especie": desviacionEstandar,
  });
});

module.exports = router;
