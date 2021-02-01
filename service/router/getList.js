const express = require("express");
const mysql = require("mysql");
const Router = express.Router();

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'blog'
})

Router.get("/getList",(req,res) =>{
  let sql = "select * from details";
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      res.send(results);
      connection.release();
    })
  })
  
})
module.exports = Router;