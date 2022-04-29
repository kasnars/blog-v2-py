<template>
<div>
<div class="mask"></div>
<div>
  
  <div class="LoginBox" v-if="status === 1">
    <div class="LoginBox-Box"> 
       <el-form :model="form" ref="form"  label-width="0" :inline="false" size="normal" key="1">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" @keyup.enter.native="onSubmit" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login iconfont My-new-iconxuanzhonghaoyou" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
      <el-form-item>


        
<el-row type="flex" class="row-bg" justify="space-around">
    <el-button type="success" round :span="12" >
      <!-- <a href="/reg">      注册账号</a> -->
      <router-link to="/reg">注册账号</router-link>

    </el-button>
  
  <el-button type="primary" round :span="12" @click="Gohome">
        回到主页
    </el-button>
</el-row>
      </el-form-item>
    </el-form>
    </div>
   
  </div>

  <!-- 全屏等待加载 -->
  <!-- <div v-loading.fullscreen.lock="loading"></div> -->
</div>
</div>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios';
import { loginHttp } from '../api/auth';
  export default {
    data() {
     //确认密码的规则
      return {
        loading:false,
        form:{
          username:'',
          password:''
        },
        regform:{
          regname:'',
          nickname:'',
          pass:'',
          checkPass:''
        },

        status: 1,

      }
    },
    methods:{
      // 去主页
      Gohome(){
        this.$router.push({name:'home'})
        // this.$router.push('/')
      },
    // 登录
      onSubmit(){
        this.login()
      },
      changeInput(evenet){
        console.log(event,'event')
        this.$forceUpdate()
      },
      async login(){
        try {
          const {data:{token}} = await loginHttp(this.form)
          window.localStorage.setItem('isLoginStatus',1)
          window.localStorage.setItem('tokenYzx',token)
          this.Gohome()
        } catch (error) {
          this.$message.error('账号不存在或密码错误')
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.register,
.LoginBox {
  width: 400px;
  height: 555px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  padding: 15px;
  .registerBox,
  .LoginBox-Box {
    margin-top: 30%;
  }
  .login {
    width: 100%;
  }
  .sign {
    font-size: 25px;
    color: rgb(18, 217, 243);
    font-weight: 600;
    margin-right: 15px;
  }
}

.el-input--normal {
  position: relative;
  overflow: hidden;
}
.el-input--normal::before {
    content: '';
    position: absolute;
    left: 0;
    height: 3px;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to right,white,#3498db,#1abc9c,
    #8e44ad,#e67e22,#e74c,white);
    transform: translateX(-100%);
    transition: 1s;
  }
  .el-input--normal:hover::before {
    transform: translateX(100%);
  }
.mask{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
        background: rgba(255, 255, 255, .2);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
}
</style>