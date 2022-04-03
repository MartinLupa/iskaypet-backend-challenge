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
 *      500:
 *        description: Error del servidor.
 */
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
      error: false,
      message: "La mascota ha sido creada correctamente",
      data: mascotaIncorporada,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: "Algo no funcionó.", data: err });
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
 *     500:
 *       description: Error del servidor.
 */
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.status(200).json({
      error: false,
      message: "Lista completa de mascotas.",
      data: mascotas,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: "Algo no funcionó.", data: err });
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
 *     500:
 *       description: Error del servidor.
 */
router.get("/kpimascotas/", async (req, res) => {
  const listaMascotas = await Mascota.find();
  const especie = especieMasNumerosa(listaMascotas, "especie");
  const promedio = edadPromedioPorEspecie(listaMascotas);
  const desviacionEstandar = desviacionEstandarEdadesPorEspecie(listaMascotas);

  try {
    res.send({
      error: false,
      message: "KPIs",
      data: {
        especie_mas_numerosa: especie,
        edad_promedio_por_especie: promedio,
        desviacion_estandar_edad_por_especie: desviacionEstandar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Algo no funcionó." });
  }
});

module.exports = router;
