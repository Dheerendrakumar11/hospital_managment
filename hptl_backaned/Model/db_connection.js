const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config()

const connection = mysql.createConnection({
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    database:process.env.DATABASE,
    mysql:process.env.MYSQL

});

connection.connect((err)=>{
    if(err){
        console.log("Database not connected",err)
    }
    else{
        console.log("Database connected successfully")
    }
});

module.exports = connection;
