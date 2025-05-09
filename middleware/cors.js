module.exports = (req,res,next ) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
} 

// En la línea 2 lo que hacemos es que ponemos una respuesta donde en el encabezado estamos estableciendo que queremos darle el acceso a todos los usuarios.

//En las lineas 3 a 6 establecemos que vamos a permitir que en los encabezados se permitan encabezados de origen, de petición, de tipo de contenido, de aceptación y de autorización.

//En el if se establece que si en el metodo de la petición que nos están haciendo es OPTIONS entonces se establece que daremos acceso a los usuarios para hacer peticiones para todos los métodos HTTP y retornamos una respuesta

//Next servirá para llamar la siguiente ruta o función a ejecutarse.
