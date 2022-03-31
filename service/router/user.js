const express = require("express");
const mysql = require("mysql");
const Token = require('../module/token');
const Router = express.Router();

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'db1'
})

Router.post('/login',(req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let id = '20220331BLOGSERVICE';
  let tokenKey = Token.en(id);
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
          token:tokenKey,
          code:0,
          message:'登录成功'
        })
      }
      
    })
  })
})
module.exports = Router;