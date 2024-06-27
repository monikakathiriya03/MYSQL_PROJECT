const database = require('mysql2');

const connection = database.createConnection({
    port: process.env.DB_PORT ,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit:20
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('MySql is Connected!');
})

module.exports = connection;
