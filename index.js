const express = require('express');
const app = express();

/*
Los verbos HTTP (Son maneras en las que se pueden realizar peticiones entre diferentes entidades dentro de la red),se les llaman verbos por que denotan alguna acción en particular y algunos son:

GET : ES PARA OBTENER UN RECURSO
POST: ES CUANDO QUEREMOS GUARDAR O PUBLICAR ALGO EN UN SITIO WEB EN FORMA DE PETICIÓN AL SERVIDOR.

PATCH: ESTÁ DESTINADO A LA ACTUALIZACIÓN DE UN DATO O REGISTRO EN ESPECÍFICO.

PUT: ESTÁ DESTINADO A LA ACTUALIZACIÓN DE TODOS LOS ELEMENTOS EXISTENTES.

DELETE: ELIMINA UN ELEMENTO O RECURSO.
*/

app.get("/", (req, res, next) =>{
    /*req es la petición que nos hace el cliente, al hacerla, la información de esa petición se va a guardar en la variable de req.
    res es la respuesta qie vamos a dar y es un elemento que podemos a utilizar que contiene varias funciones que permiten contestar la petición que nos hacer el cliente.*/
    res.status(200); //Código 200 equivale a que todo salió bien y que recuperamos la información de manera correcta.
    res.send("Bienvenido");
});
app.listen(3000, () =>{
    //  Esto es una función anónima y que no se puede volver a llamar
    console.log("Server is running...");
});