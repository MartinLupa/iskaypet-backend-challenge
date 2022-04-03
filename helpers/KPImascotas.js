const math = require("mathjs");
/*
Recursos: 
https://stackoverflow.com/questions/60565526/count-duplicate-property-values-of-a-nested-javascript-object
https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
https://www.youtube.com/watch?v=s1XVfm5mIuU - Uso de .reduce()
*/

const especieMasNumerosa = (array) => {
  const conteoPorEspecie = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    //Retorna objeto con tantos key como especies distintas haya en el array de entrada.
    //El valor de cada clave representa el conteo de mascotas por especie.
    //Ejemplo: {perro: 4, gato: 2}
    return acc;
  }, {});

  const max = Object.keys(conteoPorEspecie).reduce(function (a, b) {
    return conteoPorEspecie[a] > conteoPorEspecie[b] ? a : b;
  });
  //Retorna la clave cuyo valor sea el más repetido.
  //Ejemplo: gato.
  return max;
};

const edadPromedioPorEspecie = (array) => {
  const conteoPorEspecie = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    //Retorna objeto con tantos key como especies distintas haya en el array de entrada.
    //El valor de cada clave representa el conteo de mascotas por especie.
    //Ejemplo: {perro: 4, gato: 2}
    return acc;
  }, {});

  const resultados = array.reduce((acc, { especie, edad }) => {
    acc[especie]
      ? (acc[especie] += parseInt(edad / conteoPorEspecie[especie]))
      : (acc[especie] = parseInt(edad));
    //Retorna objeto con tantos key como especies distintas haya en el array de entrada
    //El valor de cada clave representa el promedio de edad por especie.
    return acc;
  }, {});
  return resultados;
};

const desviacionEstandarEdadesPorEspecie = (array) => {
  const especies = [];
  const conteoPorEspecie = array.reduce((acc, { especie, edad }) => {
    acc[especie]
      ? acc[especie].push(edad)
      : (acc[especie] = [edad]) && especies.push(especie);

    //Retorna objeto con tantos key como especies distintas haya en el array de entrada.
    //El valor de cada clave es un array con las edades individuales de cada mascota.
    return acc;
  }, {});
  especies.forEach((especie) => {
    return (conteoPorEspecie[especie] = math.std(conteoPorEspecie[especie]));
  });

  return conteoPorEspecie;
};

module.exports = {
  especieMasNumerosa: especieMasNumerosa,
  edadPromedioPorEspecie: edadPromedioPorEspecie,
  desviacionEstandarEdadesPorEspecie: desviacionEstandarEdadesPorEspecie,
};
