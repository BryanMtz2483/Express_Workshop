const express = require('express');
const user = express.Router(); //importamos express y una herramienta del mismo que nos permite segmentar nuestro código de mejor manera.
const jwt = require('jsonwebtoken'); //Importamos la libreria de jsonwebtoken para generar un token de autenticación para que el usuario pueda acceder a la información que nosotros determinemos.
const db = require('../config/database'); //importamos el archivo donde hacemos la conexión a la base de datos de pokemon.sql

user.post('/', async(req,res,next) => {
    const {user_name,user_mail,user_password} = req.body;
    if (user_name && user_mail && user_password){
        let query = "INSERT INTO user(user_name, user_mail, user_password) ";
        query+= `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Usuario insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});//INSERTAR USUARIOS

user.post('/login', async (req,res,nex) =>{
    const{user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail='${user_mail}' AND user_password='${user_password}';`; 
    const rows = await db.query(query);

    if(user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail:rows[0].user_mail 
            }, "debugkey");//Generamos el token, sign sirve para generarlo y recibe dos parámetros, en el primero recibe un json de los datos con los que vamos a generar el token y en el segundo recibe una llave secreta que es para que el servidor pueda decodificar el mensaje que estamos mandando (para esta llave se recomienda que esté almacenada en una variable de entorno que no sea visible en el código, que se almacene en algún otro lado dentro del servidor y se le manda a llamar con variables de entorno, esto es por seguridad).
            return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(401).json({code: 401, message: "Usuario Y/O contraseña incorrectos"});
        }
    }
    return res.status(401).json({code: 401, message: "Campos incompletos"});
});

user.get('/', async(req,res,next) =>{
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});//VER LOS USUARIOS

module.exports = user;