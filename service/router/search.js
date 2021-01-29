const express = require("express");
const Router = express.Router();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'blog'
})

Router.get('/search/:keywords',(req,res)=>{
  let keywords = req.params.keywords;
  let sql = `select * from details where details.title like '%${keywords}%' or details.category like '%${keywords}%'`;
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      if(results.length == 0){
        res.send({
          code:-1,
          message:'搜索失败,未知错误'
        })
      }else{
        res.send({
          code:0,
          message:'搜索成功！',
          data:results
        })
      }
    })
  })
})



module.exports = Router