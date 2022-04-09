const express = require("express")
const mysql = require("mysql");
const moment = require("moment");
const Router = express.Router();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db1'
})
//`INSERT INTO comments (\`articleId\`, \`name\`, \`content\`, \`date\`,\`Id\`,\`children\`) VALUES ("${req.params.id}", "${name}", "${content}", "${date}","${Id}","-1")`;
Router.post('/addPerson',(req,res) =>{
    let {
        username,
        password,
        nickname,
        age,
        email,
        level
      } = req.body;
    let sql = `INSERT INTO user (\`username\`, \`password\`, \`nickname\`, \`age\`,\`email\`,\`level\`) VALUES ("${username}", "${password}", "${nickname}", "${age}","${email}","${level}")`
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        connection.query(sql,(err,results) =>{
            if(err)throw err;
            if(results.affectedRows == 1){
                results.message = "操作成功"
            }
            results.code = 200;
            res.send(results)
            connection.release();
        })
    })
})
module.exports = Router;