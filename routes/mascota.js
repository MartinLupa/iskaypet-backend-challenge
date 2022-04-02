const router = require("express").Router();
const Mascota = require("../models/Mascota");
const {
  especieMasNumerosa,
  edadPromedioPorEspecie,
  desviacionEstandarEdadesPorEspecie,
} = require("../helpers/KPImascotas");

//DOCUMENTACION ESQUEMA
/**
 * @swagger
 * components:
 *  schemas:
 *    Mascota:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *        especie:
 *          type: string
 *        genero:
 *          type: string
 *        edad:
 *          type: integer
 *        fecha_nacimiento:
 *          type: string
 *      required:
 *        - nombre
 *        - especie
 *        - genero
 *        - edad
 *        - fecha_nacimiento
 */

//CREAR MASCOTA
/**
 * @swagger
 * /api/mascotas:
 *  post:
 *    summary: Permite incorporar una nueva mascota a la base de datos.
 *    tags: [Mascota]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Mascota'
 *    responses:
 *      201:
 *        description: La mascota ha sido creada correctamente
 */
router.post("/", async (req, res) => {
  //Validar info recibida.
  const nuevaMascota = new Mascota({
    nombre: req.body.nombre,
    especie: req.body.especie,
    genero: req.body.genero,
    edad: req.body.edad,
    fecha_nacimiento: req.body.fecha_nacimiento,
  });

  //Ver blocking - non blocking
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
/**
 * @swagger
 * /api/mascotas:
 *  get:
 *    summary: Permite visualizar la lista de mascotas disponibles en la base de datos.
 *    tags: [Mascota]
 *    responses:
 *     200:
 *       description: Se envía el archivo JSON con la información solicitada.
 */
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find().limit(2);
    res.status(200).json(mascotas);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ESTADISTICAS - KPI
/**
 * @swagger
 * /api/mascotas/kpimascotas:
 *  get:
 *    summary: Permite visualizar la lista de KPIs calculados para los datos disponibles.
 *    tags: [Mascota]
 *    responses:
 *     200:
 *       description: Se envía el archivo JSON con la información solicitada.
 */
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
