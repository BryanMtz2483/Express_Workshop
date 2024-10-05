const express = require('express');
const user = express.Router(); //importamos express y una herramienta del mismo que nos permite segmentar nuestro código de mejor manera.

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
});

user.get('/', async(req,res,next) =>{
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = user;