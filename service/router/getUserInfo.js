const express = require("express");
const mysql = require("mysql");
const Router = express.Router();

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'db1'
})

Router.get("/getUserInfo",(req,res) =>{
  let sql = "select * from user";
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      let r = results.filter(item =>{
        return item.isActive == 1;
      })
      res.send(r);
      connection.release();
    })
  })
  
})
module.exports = Router;