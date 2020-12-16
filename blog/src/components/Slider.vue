<template>
    <el-aside style="width:240px;margin-right:25px background-color:#fff; border-radius:9px;">
        <el-card :body-style="{ padding: '0px',height:'380px',width:'240px' }">
          <div class="nav">
            <el-link type="primary">个人介绍</el-link>
            <el-link type="primary">功能</el-link>
          </div>
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <h6 class="name">solitce23</h6>
            <el-row :gutter="20">
              <nav class="site-state">
              <el-col class="site-state-item">
                <a style="cursor:default;" class="article">
                  <span id="article-count">53</span>
                  <span id="article-name">文章</span>
                </a>
              </el-col>
              <el-col class="site-state-item">
                <a href="" class="category">
                  <span id="category-count">53</span>
                  <span id="category-name">分类</span>
                </a>
              </el-col>
              <el-col class="site-state-item">
                <a href="" class="tag">
                  <span id="tag-count">84</span>
                  <span id="tag-name">标签</span>
                </a>
              </el-col>
            </nav>
            </el-row>
          </div>
        </el-card>
         <el-backtop></el-backtop>
    </el-aside>
</template>

<script>
export default {

}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
  }
  .nav{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .name{
   text-align: center;
   font-size: 18px;
   font-family: inherit;
   color:skyblue;
   margin: 5px;
  }
  .site-state{
    display: flex;
    color: #5e72e4;
    justify-content: center;
  }
  .site-state-item{
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 10px;
  }
  .tag{
    border-left: 1px solid #eee;
  }
  .category{
    border-left: 1px solid #eee;
  }
  .site-state-item  span{
    display: block;
  }
  .image {
    width: 50%;
    display: block;
    margin:0 auto;
    border-radius: 100px;
  }
</style>
