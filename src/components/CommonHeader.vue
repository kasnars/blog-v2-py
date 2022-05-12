<template>
<div>
  <!-- pc端导航 -->
  <header>
      <div class="wrapper">
        <el-row>
          <el-col :span="4">
            <div class="logo threed">{{blogSet.blogTitle}}</div>
          </el-col>
          <el-col :span="20">
            <!-- 导航菜单 -->
            <el-menu mode="horizontal" 
            :default-active="activeIndex" 
            @select="handleSelect"
            background-color="rgba(255, 255, 255, .0)"
            text-color="#9d9d9d"
            active-text-color="#fff"
            class="nav"
            >
              <el-menu-item index="1" @click="goToto">
                 <router-link to="/" ><i class="iconfont My-new-iconshouye"></i>主页</router-link>
              </el-menu-item>
              <el-menu-item index="2" @click="goToto">
                 <router-link to="/Lists"><i class="iconfont My-new-iconzixun"></i>博客文章</router-link>
              </el-menu-item>
              <!-- <el-menu-item index="3" @click="goToto, changeTimeShow">
                  <router-link to="/timeLocus" ><i class="iconfont My-new-icondaojishi"></i>学习记录</router-link>
              </el-menu-item> -->
              <el-menu-item index="4" @click="goToto">
                 <router-link to="/recommend" ><i class="iconfont My-new-icondianzan"></i>全部标签</router-link>
              </el-menu-item>
              <el-menu-item index="5" @click="goToto">
                 <router-link to="/aboutMe" ><i class="iconfont My-new-iconwode1"></i>关于作者</router-link>
              </el-menu-item>
              <el-menu-item index="6" @click="goToto">
                 <router-link to="/LeaveWord"><i class="iconfont My-new-iconbianji"></i>给我留言</router-link>
              </el-menu-item>
              <el-menu-item index="7"  @click="goToto">
                 <router-link to="/article" ><i class="iconfont My-new-icondianzan"></i>我的收藏</router-link>
              </el-menu-item>
              <el-menu-item index="8" @click="goLogin" v-if="isSignIn != 1">
                 <a   class="login"><i class="iconfont My-new-iconxuanzhonghaoyou"></i>马上登录</a>
              </el-menu-item>
               <el-submenu index="9"  @click="goToto" v-if="isSignIn == 1 " >
                 <!-- <router-link to="/personal"    class="login">{{nameNick}},欢迎您</router-link> -->
                 <!-- <div class="login">{{nameNick}},欢迎您</div> -->
                 <!-- <a  class="login">{{nameNick}},欢迎您</a> -->
                     <template slot="title"  class="login">{{nameNick}},欢迎您</template>
    <el-menu-item index="9-1" style="color:black;background: whitesmoke;" @click="outLine">退出登录</el-menu-item></el-menu-item>
              </el-submenu >
            </el-menu>
          </el-col>
        </el-row>
      </div>
  </header>
  <!-- <div id="mobileNav">
    
      <el-row class="tac">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="logotit">KasnarsBlog</span>
              <span v-if="UserInfo.nickname">{{UserInfo.nickname}},欢迎您</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/" @click="Goto"><i class="iconfont My-new-iconshouye"></i>博客首页</el-menu-item>
              <el-menu-item index="/Lists" @click="Goto"><i class="iconfont My-new-iconzixun"></i>技术博文</el-menu-item>
               <el-menu-item index="/timeLocus" @click="Goto"><i class="iconfont My-new-icondaojishi"></i>时间轨迹</el-menu-item>
              <el-menu-item index="/recommend" @click="Goto"><i class="iconfont My-new-icondianzan"></i>博客推荐</el-menu-item>
              <el-menu-item index="/aboutMe" @click="Goto"><i class="iconfont My-new-iconwode1"></i>关于我</el-menu-item>
               <el-menu-item  index="/LeaveWord" @click="Goto"><i class="iconfont My-new-iconbianji"></i>留言</el-menu-item>
              <el-menu-item index="/personal" v-if="UserInfo.nickname" @click="Goto"><i class="iconfont My-new-iconwode1"></i>{{UserInfo.nickname}}的个人中心</el-menu-item>
              <el-menu-item  index="/login" v-else @click="Goto">登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-row>
  </div> -->
  
</div>
    
</template>

<script>
  import { blogSet } from '../../blogSet.config'
import { getUserInfo } from '../tools/token'
  export default {
    data() {
      return {
        blogSet,
        activeIndex:'1',
        UserInfo:{},
        nickname:''
      }
    },
    methods: {
      // 修改当前活跃
        handleSelect(index) {
          this.activeIndex = index + ''
        },
      goToto(){
        this.$emit('goTo')
      },
      goLogin(){
        this.$router.push('/login')
        // window.location.href = '/login'
        // this.$router.go(0)
        // window.location.reload();
      },
      // 获取用户信息
      // GetInfo(){
      //    this.$http.get('/api/users/info').then( (res) => {
      //      console.log(res);
      //      this.UserInfo = res.data.data
      //      this.nickname = res.data.data.nickname
      //      let avatar = res.data.data.head_img
      //     //  获取用户昵称保存在 sessionStorage
      //     sessionStorage.setItem("avatar", avatar);
      //      sessionStorage.setItem("nickname", this.nickname);
      //     //  console.log(this.UserInfo);
      //    })
      // },
      // 移动端导航
      handleOpen(key, keyPath,index) {
        console.log(key, keyPath);
        console.log(index);
      },
      handleClose(key, keyPath,index) {
        console.log(key, keyPath);
        console.log(index);
      },
      Goto(){
        let but = document.querySelector('.el-submenu__title');
        but.click();
      },
      changeTimeShow(){
        this.$store.commit('changeTimeLocus', 1)
        console.log(222222)
      },
      outLine(){
        window.localStorage.setItem('isLoginStatus',0)
        window.localStorage.setItem('tokenYzx','')
        this.$router.go()
      }
    },
    computed:{
      isSignIn(){
        return localStorage.getItem('isLoginStatus')
      },
      nameNick(){
        const { username } = getUserInfo()
        return username
      }
    },
    created(){
      // this.GetInfo();
    },
    updated(){
      console.log(this.isSignIn,'islogin')
    }

  }
</script>

<style lang="scss" scoped>
.el-row {
  background-color:rgba(255, 255, 255, .0)
}
header {
      background: rgba(255, 255, 255, .1);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
  // background-color:#2d2d2d;
  // box-shadow: 1px 1px 1px 1px rgb(41, 40, 40);
  .logo {
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  }
  .nav {
    float:right;
    li {
      padding: 0;
    }
    a {
      padding: 20px;
      .iconfont {
        color: #fff;
        // 垂直居中
        vertical-align: top;
        margin: 0 5px 0 0 ;
      }
    }
    .login {
      background: rgb(19, 167, 226);
      color: #fff;
      height: 100%;
      margin: 0;
    }
  }
}

i {
  margin-right: 8px;
}


.el-menu.el-menu--horizontal {
   border-bottom: 0
}

</style>