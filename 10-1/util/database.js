const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'shop',
    password:'David1933@'
});
module.exports=pool.promise();