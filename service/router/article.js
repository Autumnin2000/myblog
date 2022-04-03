const express = require("express")
const mysql = require("mysql");
const moment = require("moment");
const Router = express.Router();
const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'db1'
})

Router.post('/addArticle',(req,res)=>{
  let {content,date,title,desc} = req.body;
  date = moment(date).format('YYYY-MM-DD HH:mm:ss');
  let sql = `INSERT INTO details (\`content\`, \`date\`, \`title\`, \`desc\`, \`isActive\`) VALUES ("${content}", "${date}", "${title}", "${desc}",1)`;
  pool.getConnection((err,connection) => {
    if(err)throw err;
    connection.query(sql,(error,results,fileds)=>{
      if(error)throw error;
      if(results.length == 0){
        res.send({
          code:-1,
          message:'插入失败'
        })
      }else{
        res.send({
          code:0,
          message:'插入成功'
        })
      }
      
    })
  })
})
module.exports = Router;
