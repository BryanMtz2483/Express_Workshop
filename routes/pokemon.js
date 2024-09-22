const express = require('express');
const pokemon = express.Router(); //importamos express y una herramienta del mismo que nos permite segmentar nuestro código de mejor manera.

/*const  {pk}  = require('../pokedex.json'); //importamos la base de de datos pero no completa, sino se importa uno de los elementos dentro de la misma y para siempre tener a dispocisión algún arreglo o llave de la bd se mete esa llave o arreglo entre llaves {}, osea extraerlo directamente del require (sirve para extraer un elemento en específico en vez de extraer todos los elementos del archivo seleccionado)*/
/*
const  pk  = require('../pokedex.json').pokemon; //importamos la base de de datos pero no completa, sino se importa uno de los elementos dentro de la misma y para siempre tener a dispocisión algún arreglo o llave de la bd se establece esa llave o arreglo después de poner la ruta donde se encuentre la bd conde se ubica esa llave en cuestión.
*/
const db = require('../config/database'); //importamos el archivo donde hacemos la conexión a la base de datos de pokemon.sql
/*
app.get("/nombre", (req,res,next) =>{
    res.status(200);
    res.send("Estás en la página 'nombre'");
})//en este caso nombre es un texto estático por lo tanto no se puede poner otra cosa en la url que no sea el nombre, para solucionar esto "nombre" tendría que ser una variable y se hace de esta manera: 
*/
/*
app.get("/:name", (req,res,next) =>{//se ponen los dos puntos para hacer que nombre sea una variable y se pueda poner cualquier cosa en esa parte de la url.
    //req.params.name; req es la petición y dentro de esta el parametro es name, que es la variable de la url, con esto ya sabemos como obtener datos que vengan de la url
    res.status(200);
    res.send("Bienvenido " + req.params.name); //aquí se imprime un mensaje de bienvenida y se concatena el parametro que se pidió en la url usando el req.params."variable"
});*/
pokemon.post('/', (req,res,next) =>{ //declaramos la misma ruta de abajo pero con la diferencia que ek verbo HTTP ahora es con POST así que no choca.
    return res.status(200).send(req.body);
}); //En un navegador convencional esta ruta no funciona ya que el buscador solo usa metodos GET, para ver esta ruta utilizamos el software POSTMAN.

pokemon.get('/', async (req,res,next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    console.log(pkmn);
    return res.status(200).send(pkmn);
}); //mandamos llamar a el arreglo completo de los pokemones usando la url de /pokemon para mostrar a todos los pokemones o elementos del arreglo.

pokemon.get('/:id([1-9]{1,3})',(req,res,next) =>{  // :id([1-9],{1,3}) (esto es una expresión regular de RegEx, que en este caso es una variable y se llama un tipo de función con 2 parámetros, 1. se utilizan corchetes para establecer un rango, en este caso se establece que solo puede haber números de 1 al 9, 2. se utilizan llavez para establecer un conjunto de valores que en este caso que establecen un rango de dígitos que puede tener la variable, en este caso inicia en 1 y máximo puede tener 3 dígitos). RegEx que es una serie de patrones de caracteres con las cuales podamos definir reglas en específico para algún texto o cadena que querramos evaluar.
    const id = req.params.id - 1; //mandamos llamar el id dado por el usuario en la url y se almacena en una variable
    if (id >= 0 && id <= 150){ //hacemos una condición para verificar que el id dado por el usaurio esté dentro de los existentes en este caso son 151 pokemons pero como el arreglo enpieza en 0 se establece el máximo en 150 ya que el pokemon 151 se encuentra en la pocisión 150.
        res.status(200);
        return res.send(pk[req.params.id - 1]); //mostramos en el servidor el arreglo de pokemon y entre corchetes representando la posición del arreglo o llave al parámetro dado por el usuario en la url usando el req.params."variable" y se le resta uno para obtener la pocisión real del arreglo ya que recordemos que los arreglos siempre empiezan en pocisión 0 y no en 1.
    }else{ //else es necesario ya que el res es parecido a un return pero no funciona igual a un return, si se elimina este else se ejecutan los dos al mismo tiempo y causa conflicto. Una forma de solucionarlo es usando el else ó en la linea anterior agregar el comando return.
       return res.status(404).send("Pokemon no encontrado"); //esta es una forma más fácil de usar el res.status y send al mismo tiempo, sirve para reducir código y optimizarlo.
    }
    
}); //en esta ruta mandamos llamar a un pokemón en específico usando la variable id como parámetro
/*
app.listen(3000, () =>{
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
});*/
pokemon.get('/:name([A-Za-z]+)',(req,res,next) =>{ //:name([A-Za-z]+) - Expresión regular de RegEx para que name acepte puro texto
    const name = req.params.name; //creamos una variable que almacene el dato dado por el usuario
   /* for(i=0; i<pokemon.length ; i++){ //creamos un ciclo for que vaya recorriendo todo el arreglo de pokemon (la tabla de la bd)
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){//creamos una condición en la cual si en el arreglo pokemon[Pocisión]."columna o dato de la tabla de la bd, en este caso es el nombre" , en cierta pocisión se consulta el nombre del pokemon y si este coincide con el que el usuario estableció entonces se imprimen los datos de ese pokemón y se le esbalece to uppercase para que lo establecido por el usuario se transforme a mayusculas y que el registro de la bd también se haga mayúscula.
            return res.status(200).send(pokemon[i]);
        }//este for es una forma de buscar los valores pero existe una forma más fácil y es la siguiente:
    }*/
    const pkmn = pk.filter((p) => { //declaramos una variable para retornar "pk" y es igual a cada uno de los elementos del arreglo completo de pokemon que es "p"
        /* if (p.name.toUpperCase() == name.toUpperCase()){//hacemos una condición en la cual si el parámetro name es idéntico al atributo name de alguno de los pokemones en la bd, entonces se retorna ese elemento (para asegurarse de ello se transforman en mayusculas usando el touppercase)
            return p;
        }*/ //este if es una forma de hacer la validación pero existe otra forma y es usando el operador ternario, que es una forma simple de hacer un if en una sola línea.
    
        //Operador ternario: Condición ? valor si verdadero : valor si falso

        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null; //el return es NECESARIO para poder regresar la operación y lo que salga de esta al filtro y se akmacene en pk ya que si no se usa el return, dará un error.
    });

    (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokemon no encontrado"); //si la longitud del arreglo es mayor a 0 entonces se da el elemento encontrado y en caso de que no se cierra y se retorna el pokemon no encontrado


});//En esta ruta mandamos llamar a un pokemon en específico usando su nombre como parámetro en vez de su id como la ruta anterior.

module.exports = pokemon;