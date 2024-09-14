const express = require('express');
const app = express(); //importamos la librería de express y ponemos su constructor
//const  pokedex  = require('./pokedex.json'); //Importamos la base de datos completa de pokedex descargada y le especificamos la ruta donde se encuentra.
const  {pokemon}  = require('./pokedex.json'); //importamos la base de de datos pero no completa, sino se importa uno de los elementos dentro de la misma y para siempre tener a dispocisión algún arreglo o llave de la bd se mete esa llave o arreglo entre llaves {}, osea extraerlo directamente del require (sirve para extraer un elemento en específico en vez de extraer todos los elementos del archivo seleccionado)


/*
Los verbos HTTP (Son maneras en las que se pueden realizar peticiones entre diferentes entidades dentro de la red),se les llaman verbos por que denotan alguna acción en particular y algunos son:

GET : ES PARA OBTENER UN RECURSO
POST: ES CUANDO QUEREMOS GUARDAR O PUBLICAR ALGO EN UN SITIO WEB EN FORMA DE PETICIÓN AL SERVIDOR.

PATCH: ESTÁ DESTINADO A LA ACTUALIZACIÓN DE UN DATO O REGISTRO EN ESPECÍFICO.

PUT: ESTÁ DESTINADO A LA ACTUALIZACIÓN DE TODOS LOS ELEMENTOS EXISTENTES.

DELETE: ELIMINA UN ELEMENTO O RECURSO.
*/

app.get('/', (req, res, next) =>{ //podemos utilizar los verbos http utilizando app."verbo" y recibe 2 parámetros, 1. La url a la cual va a interpretar, 2. función que va a tener 3 parámetros, req,res,next.
    /*req es la petición que nos hace el cliente, al hacerla, la información de esa petición se va a guardar en la variable de req.
    res es la respuesta que vamos a dar y es un elemento que podemos a utilizar que contiene varias funciones que permiten contestar la petición que nos hacer el cliente.*/
    //const pokemon = pokedex; //mandamos a llamar a la bd y "pokemon" es el arreglo o llave que contiene todos los datos de los pokemones de la bd descargada. 
    res.status(200); //Código 200 equivale a que todo salió bien y que recuperamos la información de manera correcta.
    //res.send(pokemon); //enviamos en el servidor la llave para que se impriman los datos en el mismo, en este caso es el json completo de los pokemons
    res.send("Bienvenido al Pokedex")
});
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
app.get('/pokemon/all', (req,res,next) => {
    res.status(200);
    res.send(pokemon);
}); //mandamos llamar a el arreglo completo de los pokemones usando la url de /pokemon para mostrar a todos los pokemones o elementos del arreglo.

app.get('/pokemon/:id([1-9]{1,3})',(req,res,next) =>{  // :id([1-9],{1,3}) (esto es una expresión regular de RegEx, que en este caso es una variable y se llama un tipo de función con 2 parámetros, 1. se utilizan corchetes para establecer un rango, en este caso se establece que solo puede haber números de 1 al 9, 2. se utilizan llavez para establecer un conjunto de valores que en este caso que establecen un rango de dígitos que puede tener la variable, en este caso inicia en 1 y máximo puede tener 3 dígitos). RegEx que es una serie de patrones de caracteres con las cuales podamos definir reglas en específico para algún texto o cadena que querramos evaluar.
    const id = req.params.id - 1; //mandamos llamar el id dado por el usuario en la url y se almacena en una variable
    if (id >= 0 && id <= 150){ //hacemos una condición para verificar que el id dado por el usaurio esté dentro de los existentes en este caso son 151 pokemons pero como el arreglo enpieza en 0 se establece el máximo en 150 ya que el pokemon 151 se encuentra en la pocisión 150.
        res.status(200);
        res.send(pokemon[req.params.id - 1]); //mostramos en el servidor el arreglo de pokemon y entre corchetes representando la posición del arreglo o llave al parámetro dado por el usuario en la url usando el req.params."variable" y se le resta uno para obtener la pocisión real del arreglo ya que recordemos que los arreglos siempre empiezan en pocisión 0 y no en 1.
    }else{ //else es necesario ya que el res es parecido a un return pero no funciona igual a un return, si se elimina este else se ejecutan los dos al mismo tiempo y causa conflicto. Una forma de solucionarlo es usando el else ó en la linea anterior agregar el comando return.
        res.status(404);
        res.send("Pokemon no encontrado");
    }
    
}); //en esta ruta mandamos llamar a un pokemón en específico usando la variable id como parámetro
/*
app.listen(3000, () =>{
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
});*/
app.get('/pokemon/:name',(req,res,next) =>{
    const name = req.params.name; //creamos una variable que almacene el dato dado por el usuario
    for(i=0; i<pokemon.length ; i++){ //creamos un ciclo for que vaya recorriendo todo el arreglo de pokemon (la tabla de la bd)
        if(pokemon[i].name == name){//creamos una condición en la cual si en el arreglo pokemon[Pocisión]."columna o dato de la tabla de la bd, en este caso es el nombre" , en cierta pocisión se consulta el nombre del pokemon y si este coincide con el que el usuario estableció entonces se imprimen los datos de ese pokemón.
            res.status(200);
            res.send(pokemon[i]);
        }
    }
    res.status(404);
    res.send("Pokemon no encontrado");
});//En esta ruta mandamos llamar a un pokemon en específico usando su nombre como parámetro en vez de su id como la ruta anterior.

app.listen(process.env.PORT || 3000, () =>{//app.listen sirve para montar un servidor de manera sencilla, recibe 2 parámetros, 1. el puerto en el que se va a levantar el servidor (para acceder al puerto en el navegador se escribe localhost:"puerto utilizado"), 2. función que se va a ejecutar cuando el servidor esté levantado.
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
}); //se coloca el process.env.PORT para que el proyecto se pueda subir a un entorno de producción. 

//CREAMOS UN SET RUTAS POR CADA ELEMENTO  DE LA BD (EN ESTE CASO SOLO ES UN ELEMENTO O TABLA Y ES POKEMON) QUE NOS PERMITAN MOSTRAR TODOS LOS REGISTROS DE ESE ELEMENTO, MOSTRAR UN SOLO REGISTRO, MOSTRAR CIERTA INFORMACIÓN DE CIERTO REGISTRO O DE TODOS LOS REGISTROS, O PARA BUSCAR CIERTO REGISTRO MEDIANTE CIERTOS DATOS DEL MISMO (NO NECESARIAMENTE SU ID COMO NORMALMENTE SE HACE)
//EL FAMOSO ARREGLO O LLAVE DE POKEMON DENTRO DE LA DB DE POKEDEX SERÍA LO EQUIVALENTE A UNA TABLA EN UNA BASE DE DATOS.
