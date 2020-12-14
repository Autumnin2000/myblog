const express = require("express");
const mysql = require("mysql");
const Route = express.Router();

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'blog'
})

Route.post('/login',(req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let sql = `SELECT * from user WHERE username = "${username}" AND password = "${password}"`;
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      if(results.length == 0){
        res.send({
          code:-1,
          message:'用户名或密码错误'
        })
      }else{
        res.send({
          code:0,
          message:'登录成功'
        })
      }
      
    })
  })
})
module.exports = Route;