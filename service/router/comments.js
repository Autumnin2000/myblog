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

Router.get('/comments/:id',(req,res)=>{
  console.log(req.params.id);
  let id = req.params.id;
  let sql = `select * from comments where comments.articleId =${id} `;
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      res.send(results);
      connection.release();
    })
  })
})



module.exports = Router