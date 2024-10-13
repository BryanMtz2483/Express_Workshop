//Dependencias
const express = require('express');
const app = express(); //importamos la librería de express y ponemos su constructor
const morgan = require('morgan');//Importamos morgan. Morgan es un middleware de registro de peticiones HTTP para aplicaciones Express.js en Node.js. Fue diseñado para proporcionar un registro detallado y configurable de las solicitudes y respuestas HTTP en una aplicación Express.
//ROUTERS
const user = require ("./routes/user");//importamos el archivo de user.js que tenemos en la carpeta de routes
const pokemon = require ('./routes/pokemon'); //importamos el archivo de pokemon.js que tenemos en la carpeta de routes
//MIDDLEWARES
const auth = require('./middleware/auth');
const notFound = require ('./middleware/notFound');
const index = require ('./middleware/index');

app.use(express.json());//importamos todo el paquete de librerias que incluye express la cuál contiene el body parser incluido.
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); //app.use, el use se utiliza cuando queremos que alguna función se le aplique a todas las peticiones que entran al servidor y se le conoce como middleware, en este caso este middleware nos servirá para obtener el cuerpo de la petición POST y se formatee en formato JSON
*/


app.get('/', index);

app.use('/user', user);//establecemos que todos los que hagan peticiones a /pokemon sean atendidos por el archivo de user.js para que utilice las funciones que se encuentran dentro del mismo.
app.use(auth);

app.use("/pokemon",pokemon); //establecemos que todos los que hagan peticiones a /pokemon sean atendidos por el archivo de pokemon.js para que utilice las funciones que se encuentran dentro del mismo.

app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{//app.listen sirve para montar un servidor de manera sencilla, recibe 2 parámetros, 1. el puerto en el que se va a levantar el servidor (para acceder al puerto en el navegador se escribe localhost:"puerto utilizado"), 2. función que se va a ejecutar cuando el servidor esté levantado.
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
}); //se coloca el process.env.PORT para que el proyecto se pueda subir a un entorno de producción. 

//CREAMOS UN SET RUTAS POR CADA ELEMENTO  DE LA BD (EN ESTE CASO SOLO ES UN ELEMENTO O TABLA Y ES POKEMON) QUE NOS PERMITAN MOSTRAR TODOS LOS REGISTROS DE ESE ELEMENTO, MOSTRAR UN SOLO REGISTRO, MOSTRAR CIERTA INFORMACIÓN DE CIERTO REGISTRO O DE TODOS LOS REGISTROS, O PARA BUSCAR CIERTO REGISTRO MEDIANTE CIERTOS DATOS DEL MISMO (NO NECESARIAMENTE SU ID COMO NORMALMENTE SE HACE)
//EL FAMOSO ARREGLO O LLAVE DE POKEMON DENTRO DE LA DB DE POKEDEX SERÍA LO EQUIVALENTE A UNA TABLA EN UNA BASE DE DATOS.
