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

Route.get("/getList",(req,res) =>{
  let sql = "select * from details";
  console.log(req.query);
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      res.send(results);
      connection.release();
      console.log(results);
    })
  })
  
})
module.exports = Route;