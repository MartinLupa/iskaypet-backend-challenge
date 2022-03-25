/*
Recursos: 
https://stackoverflow.com/questions/60565526/count-duplicate-property-values-of-a-nested-javascript-object
https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
https://www.youtube.com/watch?v=s1XVfm5mIuU - Uso de .reduce()
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

const edadPromedioPorEspecie = (array) => {
  const conteoPorEspecie = array.reduce((acc, { especie }) => {
    acc[especie] ? acc[especie]++ : (acc[especie] = 1);
    return acc;
  }, {});

  const resultados = array.reduce((acc, { especie, edad }) => {
    acc[especie]
      ? (acc[especie] += parseInt(edad / conteoPorEspecie[especie]))
      : (acc[especie] = parseInt(edad));
    return acc;
  }, {});
  return resultados;
};

module.exports = {
  especieMasNumerosa: especieMasNumerosa,
  edadPromedioPorEspecie: edadPromedioPorEspecie,
};
