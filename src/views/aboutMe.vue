<template>
  <div>
    <div class="wrapper marginTop wow slideInLeft">
     <div class="block aboutMe">
       <div class="avatar">
         <img src="../../src/assets/img/myavatar.jpg" alt="">
       </div>
            <p><span class="threed threeds">Kasnars</span></p>
            <p><span class="threed threeds">刘杨鑫</span></p>
            <p><span class="threed threeds">男，00后，软件工程大四学生</span></p>
            <p><span class="threed threeds">现居湖北武汉</span></p>
            <p><span class="threed threeds">现常用技术栈：HTML，CSS，JavaScript，Es6，Vue(2 and 3)，微信小程序，NodeJS</span></p>
            <p><span class="threed threeds">了解以及正在学习：TypeScript，Egg.js，Koa2，MongoDB</span></p>
            <p><span class="threed threeds">常用工具：Element UI，BootStrap</span></p>
            <p><span class="threed threeds">想要成为一名前端工程师，正在向目标努力着</span></p>
            <p><span class="threed threeds">每天没事喜欢刷各种知识论坛和技术论坛，啥都想了解，啥都想看看</span></p>
            <p><span class="threed threeds">个人邮箱：kasnars@163.com</span></p>
            <p><span class="threed threeds">个人Git：https://gitee.com/kasnars</span></p>
            <el-button type="primary" round class="btn">
              <a href="http://1.116.134.48:7001/me" target="_blank">
              点击下载我的个人简历
              </a>
              </el-button>
     </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WOW from 'wowjs';
  export default {
    name:'aboutMe',
    methods:{
      toDownload(){
        // axios.get('/me').then(() => {
        //   this.$message.success('下载成功')
        // }).catch(() => {
        //   this.$$message.error('下载失败')
        // })
      }
    },
    mounted(){
      	// let wow = new WOW.WOW({
        //   boxClass: 'wow',
        //   animateClass: 'animated',
        //   offset: 0,
        //   mobile: true,
        //   live: true
        // });
        // wow.init();
    }
  }
</script>

<style lang="scss" scoped>
  .aboutMe {
    background-color: rgba(0, 0, 0,0);
    color: #fff;
    margin-bottom: 350px;
    .avatar {
      display: flex;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 100px;
      }
    }
    
    p {
      font-size: 15px;
      text-align: center;
      span {
        line-height: 45px
      }
    }
    .bottom {
      margin-top: 20px;
      padding: 20px;
      background-color: rgb(222, 223, 224);
      color: rgb(107, 106, 106);
      border-radius: 5px;
      line-height: 30px;
    }
  }
  .threed {
    font-size: 18px!important;
  }
  .btn {
    margin-top: 10px;
    width: 100%;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>