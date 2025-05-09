module.exports = (req, res, next) =>{ //podemos utilizar los verbos http utilizando app."verbo" y recibe 2 parámetros, 1. La url a la cual va a interpretar, 2. función que va a tener 3 parámetros, req,res,next.
    /*req es la petición que nos hace el cliente, al hacerla, la información de esa petición se va a guardar en la variable de req.
    res es la respuesta que vamos a dar y es un elemento que podemos a utilizar que contiene varias funciones que permiten contestar la petición que nos hacer el cliente.*/
    //const pokemon = pokedex; //mandamos a llamar a la bd y "pokemon" es el arreglo o llave que contiene todos los datos de los pokemones de la bd descargada. 
    return res.status(200).json({code: 1, message: "Bienvenido al Pokedex."});
}
