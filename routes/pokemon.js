const express = require('express');
const pokemon = express.Router(); //importamos express y una herramienta del mismo que nos permite segmentar nuestro código de mejor manera.

const db = require('../config/database'); //importamos el archivo donde hacemos la conexión a la base de datos de pokemon.sql

pokemon.post('/', async(req,res,next) =>{ //declaramos la misma ruta de abajo pero con la diferencia que ek verbo HTTP ahora es con POST así que no choca.
    const {pok_name, pok_height,pok_weight, pok_base_experience} = req.body; //Declaramos que el cuerpo del formulario de la petición POST sea igual a todos los campos "pok_name, pok_height,pok_weight, pok_base_experience"
    if(pok_name && pok_height && pok_weight && pok_base_experience){//validamos que los campos existan y estén completos
        let query = "INSERT INTO pokemon(pok_name, pok_height,pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`; //Almacenamos en una variable la consulta para insertar un registro en la base de datos. Utilizamos los acentos al revés para poder llamar directamente cada campo del cuerpo del formulario (req.body) usando ${nombre_campo}, en caso de q sea texto se usan comillas.
        
        const rows = await db.query(query); //Almacenamos en una variable donde ya se aplica la consulta mandando a llamar a la otra variable donde se encuentra la consulta, esto se hace como una buena práctica en lugar de hacer todo junto
    
        if (rows.affectedRows == 1){ //validamos si en la consulta hecha se modificó alguna fila, en caso de que sí se da un mensaje de confirmación, en caso de que no se notificará un error.
            return res.status(201).json({code: 201, message: "Pokemon insertado correctamente."});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error."}); 
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
}); //En un navegador convencional esta ruta no funciona ya que el buscador solo usa metodos GET, para ver esta ruta utilizamos el software POSTMAN.

pokemon.delete('/:id([1-9]{1,3})', async (req,res,next) =>{
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Pokemon borrado corrrectamente."});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado."});
});//Borrar un pokemon de la base de datos.

pokemon.put('/:id([1-9]{1,3})', async (req,res,next) =>{
    const {pok_name, pok_height,pok_weight, pok_base_experience} = req.body; //Declaramos que el cuerpo del formulario de la petición POST sea igual a todos los campos "pok_name, pok_height,pok_weight, pok_base_experience", en este caso los vamos a utilizar para actualizar todos los campos de un registro.
    if(pok_name && pok_height && pok_weight && pok_base_experience){//validamos que los campos existan y estén completos
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`; //Almacenamos en la variable query la consulta necesaria para actualizar un registro de la tabla pokemon en la base de datos.
        
        const rows = await db.query(query); //Almacenamos en una variable donde ya se aplica la consulta mandando a llamar a la otra variable donde se encuentra la consulta, esto se hace como una buena práctica en lugar de hacer todo junto
    
        if (rows.affectedRows == 1){ //validamos si en la consulta hecha se modificó alguna fila, en caso de que sí se da un mensaje de confirmación, en caso de que no se notificará un error.
            return res.status(201).json({code: 201, message: "Pokemon Actualizado correctamente."});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error."}); 
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});//Actualizar todos los datos en un registro en la tabla de pokemon de la base de datos.

pokemon.patch('/:id([1-9]{1,3})', async (req,res,next) =>{
    if(req.body.pok_name){
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}'WHERE pok_id=${req.params.id}`;
        //Almacenamos en la variable query la consulta necesaria para actualizar uno o más datos pero no todos de un registro de la tabla pokemon en la base de datos, en este caso será para el nombre.
        
        const rows = await db.query(query); //Almacenamos en una variable donde ya se aplica la consulta mandando a llamar a la otra variable donde se encuentra la consulta, esto se hace como una buena práctica en lugar de hacer todo junto
    
        if (rows.affectedRows == 1){ //validamos si en la consulta hecha se modificó alguna fila, en caso de que sí se da un mensaje de confirmación, en caso de que no se notificará un error.
            return res.status(201).json({code: 201, message: "Pokemon Actualizado correctamente."});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error."}); 
    }
    return res.status(500).json({code: 500, message: "Campos incompletos."}); 
});//Modifica uno o más datos pero no todos de un registro en la tabla pokemon de la base de datos.

pokemon.get('/', async (req,res,next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
}); //mandamos llamar la tabla completa de los pokemones usando la url de /pokemon para mostrar a todos los pokemones o elementos de la tabla pokemon en la base de datos.

pokemon.get('/:id([1-9]{1,3})',async(req,res,next) =>{  // :id([1-9],{1,3}) (esto es una expresión regular de RegEx, que en este caso es una variable y se llama un tipo de función con 2 parámetros, 1. se utilizan corchetes para establecer un rango, en este caso se establece que solo puede haber números de 1 al 9, 2. se utilizan llavez para establecer un conjunto de valores que en este caso que establecen un rango de dígitos que puede tener la variable, en este caso inicia en 1 y máximo puede tener 3 dígitos). RegEx que es una serie de patrones de caracteres con las cuales podamos definir reglas en específico para algún texto o cadena que querramos evaluar.
    const id = req.params.id; //mandamos llamar el id dado por el usuario en la url y se almacena en una variable
    if (id >= 1 && id <= 722){ 
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"}); 
}); //en esta ruta mandamos llamar a un pokemón en específico usando la variable id como parámetro

pokemon.get('/:name([A-Za-z]+)',async(req,res,next) =>{ //:name([A-Za-z]+) - Expresión regular de RegEx para que name acepte puro texto
    const name = req.params.name; //creamos una variable que almacene el dato dado por el usuario
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");

    if(pkmn.length > 0){
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"}); 

});//En esta ruta mandamos llamar a un pokemon en específico usando su nombre como parámetro en vez de su id como la ruta anterior.

module.exports = pokemon;