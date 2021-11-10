
// Capturar parametros a la consola con NODE ,tipo slice (opcion 1,2,3)
var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla = `
la suma es:${numero1 + numero2}
la resta es:${numero1 - numero2}
la multiplicación es:${numero1 * numero2}
la división es:${numero1 / numero2}
`;

// se pasan por consola los parametros
/* 
1 cd
2. ls se ingresa al fichero js
3. se pasan los parametros
ej node calculadora.js 1 2  */

console.log(plantilla);
console.log(params);