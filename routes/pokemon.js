const express = require('express');
const pokemon = express.Router(); //importamos express y una herramienta del mismo que nos permite segmentar nuestro código de mejor manera.

const db = require('../config/database'); //importamos el archivo donde hacemos la conexión a la base de datos de pokemon.sql

pokemon.post('/', (req,res,next) =>{ //declaramos la misma ruta de abajo pero con la diferencia que ek verbo HTTP ahora es con POST así que no choca.
    return res.status(200).send(req.body);
}); //En un navegador convencional esta ruta no funciona ya que el buscador solo usa metodos GET, para ver esta ruta utilizamos el software POSTMAN.

pokemon.get('/', async (req,res,next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
}); //mandamos llamar a el arreglo completo de los pokemones usando la url de /pokemon para mostrar a todos los pokemones o elementos del arreglo.

pokemon.get('/:id([1-9]{1,3})',async(req,res,next) =>{  // :id([1-9],{1,3}) (esto es una expresión regular de RegEx, que en este caso es una variable y se llama un tipo de función con 2 parámetros, 1. se utilizan corchetes para establecer un rango, en este caso se establece que solo puede haber números de 1 al 9, 2. se utilizan llavez para establecer un conjunto de valores que en este caso que establecen un rango de dígitos que puede tener la variable, en este caso inicia en 1 y máximo puede tener 3 dígitos). RegEx que es una serie de patrones de caracteres con las cuales podamos definir reglas en específico para algún texto o cadena que querramos evaluar.
    const id = req.params.id; //mandamos llamar el id dado por el usuario en la url y se almacena en una variable
    if (id >= 1 && id <= 722){ 
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"}); 
}); //en esta ruta mandamos llamar a un pokemón en específico usando la variable id como parámetro
pokemon.get('/:name([A-Za-z]+)',async(req,res,next) =>{ //:name([A-Za-z]+) - Expresión regular de RegEx para que name acepte puro texto
    const name = req.params.name; //creamos una variable que almacene el dato dado por el usuario
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");

    if(pkmn.length > 0){
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"}); 

});//En esta ruta mandamos llamar a un pokemon en específico usando su nombre como parámetro en vez de su id como la ruta anterior.

module.exports = pokemon;