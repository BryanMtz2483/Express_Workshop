const express = require('express');
const app = express(); //importamos la librería de express y ponemos su constructor
const morgan = require('morgan');//Importamos morgan. Morgan es un middleware de registro de peticiones HTTP para aplicaciones Express.js en Node.js. Fue diseñado para proporcionar un registro detallado y configurable de las solicitudes y respuestas HTTP en una aplicación Express.
/*
const  pokedex  = require('./pokedex.json'); //Importamos la base de datos completa de pokedex descargada y le especificamos la ruta donde se encuentra.
*/
const pokemon = require ('./routes/pokemon'); //importamos el archivo de pokemon.js que tenemos en la carpeta de routes
app.use(express.json());//importamos todo el paquete de librerias que incluye express la cuál contiene el body parser incluido.
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); //app.use, el use se utiliza cuando queremos que alguna función se le aplique a todas las peticiones que entran al servidor y se le conoce como middleware, en este caso este middleware nos servirá para obtener el cuerpo de la petición POST y se formatee en formato JSON
*/
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
    res.status(200).json({code: 1, message: "Bienvenido al Pokedex."});
});

app.use("/pokemon",pokemon); //establecemos que todos los que hagan peticiones a /pokemon sean atendidos por el archivo de pokemon.js para que utilice las funciones que se encuentran dentro del mismo.

app.use((req,res,next)=>{
    return res.status(404).json({code: 404, message: "Url no encontrado."})
});

app.listen(process.env.PORT || 3000, () =>{//app.listen sirve para montar un servidor de manera sencilla, recibe 2 parámetros, 1. el puerto en el que se va a levantar el servidor (para acceder al puerto en el navegador se escribe localhost:"puerto utilizado"), 2. función que se va a ejecutar cuando el servidor esté levantado.
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
}); //se coloca el process.env.PORT para que el proyecto se pueda subir a un entorno de producción. 

//CREAMOS UN SET RUTAS POR CADA ELEMENTO  DE LA BD (EN ESTE CASO SOLO ES UN ELEMENTO O TABLA Y ES POKEMON) QUE NOS PERMITAN MOSTRAR TODOS LOS REGISTROS DE ESE ELEMENTO, MOSTRAR UN SOLO REGISTRO, MOSTRAR CIERTA INFORMACIÓN DE CIERTO REGISTRO O DE TODOS LOS REGISTROS, O PARA BUSCAR CIERTO REGISTRO MEDIANTE CIERTOS DATOS DEL MISMO (NO NECESARIAMENTE SU ID COMO NORMALMENTE SE HACE)
//EL FAMOSO ARREGLO O LLAVE DE POKEMON DENTRO DE LA DB DE POKEDEX SERÍA LO EQUIVALENTE A UNA TABLA EN UNA BASE DE DATOS.
