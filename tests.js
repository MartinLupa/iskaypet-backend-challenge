const listaMascotas = [
  {
    _id: "623cbbf11ac998404462c0e9",
    nombre: "Micha",
    especie: "gato",
    genero: "hembra",
    edad: "2",
    fecha_nacimiento: "2010-09-30T22:00:00.000Z",
    createdAt: "2022-03-24T18:44:01.610Z",
    updatedAt: "2022-03-24T18:44:01.610Z",
    __v: 0,
  },
  {
    _id: "623cbc021ac998404462c0ec",
    nombre: "Floppy",
    especie: "gato",
    genero: "hembra",
    edad: "10",
    fecha_nacimiento: "2006-10-10T22:00:00.000Z",
    createdAt: "2022-03-24T18:44:18.901Z",
    updatedAt: "2022-03-24T18:44:18.901Z",
    __v: 0,
  },
  {
    _id: "623cbc171ac998404462c0f0",
    nombre: "Valky",
    especie: "perro",
    genero: "hembra",
    edad: "6",
    fecha_nacimiento: "2014-07-06T22:00:00.000Z",
    createdAt: "2022-03-24T18:44:39.977Z",
    updatedAt: "2022-03-24T18:44:39.977Z",
    __v: 0,
  },
  {
    _id: "623cbeacb527ed4990e8c8d8",
    nombre: "Pelusa",
    especie: "gato",
    genero: "hembra",
    edad: "14",
    fecha_nacimiento: "2001-03-22T23:00:00.000Z",
    createdAt: "2022-03-24T18:55:40.335Z",
    updatedAt: "2022-03-24T18:55:40.335Z",
    __v: 0,
  },
  {
    _id: "623cbecde08f5a6128ceb8e0",
    nombre: "Tommy",
    especie: "gato",
    genero: "macho",
    edad: "15",
    fecha_nacimiento: "2003-09-18T22:00:00.000Z",
    createdAt: "2022-03-24T18:56:13.849Z",
    updatedAt: "2022-03-24T18:56:13.849Z",
    __v: 0,
  },
  {
    _id: "623cbed3e08f5a6128ceb8e3",
    nombre: "Akira",
    especie: "perro",
    genero: "hembra",
    edad: "7",
    fecha_nacimiento: "2008-06-14T22:00:00.000Z",
    createdAt: "2022-03-24T18:56:19.714Z",
    updatedAt: "2022-03-24T18:56:19.714Z",
    __v: 0,
  },
];

/*
Recursos: 
https://stackoverflow.com/questions/60565526/count-duplicate-property-values-of-a-nested-javascript-object
https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
*/

const especieMasNumerosa = (array) => {
  const resultados = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    return acc;
  }, {});

  const max = Object.keys(resultados).reduce(function (a, b) {
    return resultados[a] > resultados[b] ? a : b;
  });

  return max;
};

console.log(especieMasNumerosa(listaMascotas));
