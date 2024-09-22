const mysql = require('mysql'); //importamos mysql 
const util = require('util'); //importamos la librería util para trabajar de manera asíncrona con las peticiones que hagamos a la base de datos. Una promesa (también conocida como promise) es un objeto que representa un valor que puede estar disponible en el futuro, es decir, un valor que no se conoce inmediatamente, pero se puede esperar que se resuelva en un momento dado.


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

pool.query = util.promisify(pool.query); //Establecemos que todo lo que nos regrese una consulta sea una promesa

module.exports = pool; //exportamos nuestra conexión a la base de datos para utilizarda donde querramos.