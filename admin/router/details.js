const express = require("express");
const Route = express.Router();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'blog'
})

Route.get('/details',(req,res)=>{
  console.log(req.query());
  res.send('11')
})



module.exports = Route