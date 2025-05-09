const jwt = require('jsonwebtoken'); //Importamos la libreria de jsonwebtoken para generar un token de autenticación para que el usuario pueda acceder a la información que nosotros determinemos.

module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"debugkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({code: 401, message: "No tienes permiso :("});
    }
}//En este middleware se va a intentar obtener el token de autenticación de la petición del usuario a través del encabezado de la petición, el usuario la tiene que enviar y trata de decodificar esa petición, si se pudo decodificar la va a guardar en la constante decoded que es el token que generamos en la ruta de user y con req.user le generamos un nuevo campo a la petición y almacenarle el valor de decoded, en este caso llamado user, en ese campo irán los datos que establecimos en la ruta de user al momento de establecer la generación del token (en este caso es el id y el email del usuario, esto para no tener que estar guardando este dato en el almacenamiento local o solicitarlo a cada rato podemos hacerlo ya parte de nuestra petición).Next sirve para mandar a llamar la siguiente función o ruta que en este caso seria pokemon. En caso de fallar todo esto, simplemente no se avanzará y se mandará un error al usuario para notificarle que carece de permisos para acceder a la información de pokemon.
