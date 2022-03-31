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

Router.post('/addComment/:id/:parentId?', (req, res) => {
  let {
    content,
    date,
    name,
    Id
  } = req.body;
  date = moment(date).format('YYYY-MM-DD HH:mm:ss');
  if (req.params.parentId) {
    let sql = `select children from comments where comments.Id =${req.params.parentId}`;
    let children = "";
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, async (error, results, fileds) => {
        if (error) throw error;
        if (results.length == 0) {
          res.send({
            code: -1,
            message: '操作失败,未知错误'
          })
          return;
        } else {
          children = await results[0].children;
          if (children == '-1') {
            children = Id.toString();
          } else {
            Id = Id.toString();
            children = children + "," + Id;
          }

          let updSql = `update comments SET comments.children = "${children}" where comments.Id = ${req.params.parentId}`
          pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(updSql, (error, results, fileds) => {
              if (error) throw error;
              if (results.length == 0) {
                res.send({
                  code: -1,
                  message: '操作失败,未知错误'
                })
              }else {
                let sql = `INSERT INTO comments (\`articleId\`, \`name\`, \`content\`, \`date\`,\`Id\`,\`children\`) VALUES ("${req.params.id}", "${name}", "${content}", "${date}","${Id}","-1")`;
                pool.getConnection((err, connection) => {
                  if (err) throw err;
                  connection.query(sql, (error, results, fileds) => {
                    if (error) throw error;
                    if (results.length == 0) {
                      res.send({
                        code: -1,
                        message: '评论失败'
                      })
                    } else {
                      res.send({
                        code: 0,
                        message: '评论成功'
                      })
                    }
              
                  })
                })
              }

            })
          })
        }

      })
    })
  }else {
    let sql = `INSERT INTO comments (\`articleId\`, \`name\`, \`content\`, \`date\`,\`Id\`,\`children\`) VALUES ("${req.params.id}", "${name}", "${content}", "${date}","${Id}","-1")`;
                pool.getConnection((err, connection) => {
                  if (err) throw err;
                  connection.query(sql, (error, results, fileds) => {
                    if (error) throw error;
                    if (results.length == 0) {
                      res.send({
                        code: -1,
                        message: '评论失败'
                      })
                    } else {
                      res.send({
                        code: 0,
                        message: '评论成功'
                      })
                    }
              
                  })
                })
  }
})
module.exports = Router;