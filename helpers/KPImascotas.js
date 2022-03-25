/*
Recursos: 
https://stackoverflow.com/questions/60565526/count-duplicate-property-values-of-a-nested-javascript-object
https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
*/

const calculaEspecieMasNumerosa = (array) => {
  const resultados = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    return acc;
  }, {});

  const max = Object.keys(resultados).reduce(function (a, b) {
    return resultados[a] > resultados[b] ? a : b;
  });

  return max;
};

const edadPromedioPorEspecie = (array) => {
  const conteoPorEspecie = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    return acc;
  }, {});

  const resultados = array.reduce((acc, { especie, edad, length }) => {
    acc[especie]
      ? (acc[especie] += edad / conteoPorEspecie[especie])
      : (acc[especie] = edad);
    return acc;
  }, {});
  return resultados;
};

module.exports = {
  calculaEspecieMasNumerosa: calculaEspecieMasNumerosa,
  edadPromedioPorEspecie: edadPromedioPorEspecie,
};
