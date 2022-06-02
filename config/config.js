const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tag_Temporal'
});

db.connect(function(err){
    if(err) throw err;
    console.log('Conexion a la base de datos exitosa');
});

module.exports = db;