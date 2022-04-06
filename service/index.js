/**
 * 
 * 入口模块
 */
const express = require('express');
const bodyParser =require('body-parser');
const getListRouter = require('./router/getList');
const detailRouter =require('./router/details');
const userRouter= require('./router/user');
const articleRouter = require('./router/article');
const commentsRouter = require('./router/comments');
const addComment = require("./router/addComment");
const searchRouter = require("./router/search");
const deleteArticle = require("./router/deleteArticle")
const getTags = require("./router/getTags");
// 创建主应用
const app = express();
const port = 3000;
const allowHeaders = "Origin, Expires, Content-Type, X-E4M-With, Authorization";
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", allowHeaders);
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//监听服务器
app.get('/', (req, res) => res.send('Hello World!'))
app.use(getListRouter);
app.use(userRouter);
app.use(detailRouter);
app.use(articleRouter);
app.use(commentsRouter);
app.use(addComment);
app.use(searchRouter);
app.use(deleteArticle);
app.use(getTags);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))