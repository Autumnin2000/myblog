<template>
    <el-aside style="width:240px;margin-right:25px">
        <el-card :body-style="{ padding: '0px',height:'380px',width:'240px' }">
          <div class="nav">
            <el-link type="primary">个人介绍</el-link>
            <el-link type="primary">功能</el-link>
          </div>
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <h6 class="name">solitce23</h6>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
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
  }
  .image {
    width: 50%;
    display: block;
    margin:0 auto;
    border-radius: 100px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
