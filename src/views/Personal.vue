<template>
  <div class="wrapper wow slideInLeft">
    <div class="content">
      <el-form ref="form"  label-width="80px" :inline="false" size="normal">
        <el-form-item label="昵称">
          <el-input v-model="nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://1.116.134.48:7001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="head_img"
            >
            <!-- <img :src="imageUrl" class="avatar"> -->
            <div class=""><el-avatar :size="250" :src="imageUrl"></el-avatar></div>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="个人签名">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="content">
        </el-input>
        </el-form-item>
        <el-form-item >
          <el-row>
          <el-button type="primary" @click="updateUserInfo" :span="12">保存</el-button>
          <el-button @click="exit" :span="12">退出登录</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
import WOW from 'wowjs';
import Cookie from 'js-cookie'
import axios from 'axios';
export default {
    data() {
      return {
        form:{
          nickname:''
        },
        imageUrl:'',
        nickname:'',
        content: ''
      }
    },
     methods: {

      handleAvatarSuccess(res) {
        console.log(res)
          this.imageUrl = res.url
        },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      exit(){
        // 清除Cookie
        Cookie.set('token','')
        // 清除sessionStorage
        sessionStorage.clear();
        // this.$router.push({path:'/'})
        // location.reload();
        localStorage.setItem('isLoginStatus', 0)
        localStorage.setItem('getToken', '')
        this.$router.go(0)
        // this.$router.push('/')
      },

      // 更新用户信息
      async onSubmit(){
        await this.$http.post('/api/users/updateUser',{
          nickname:this.nickname,
          head_img:this.imageUrl
        })
        // 刷新页面
        location.reload();
      },
      updateUserInfo(){
        const updateData = {
          name:localStorage.getItem('username'),
          nickname: this.nickname,
          img: this.imageUrl,
          personal: this.content
        }
        axios.put('/user/update', updateData).then(res => {
          // console.log(res.data, 'reeeeee')
          // this.$router.go(0)
          this.$message.success('更新成功')
          this.$router.push('/')
        }).catch(()=> this.$message.error('更新个人信息出错'))
      },
      getUserInfo(){
        const username = localStorage.getItem('username')
        axios.get(`/user/${username}`).then(res => {
          // console.log(res.data.data, 'userinfo')
          this.nickname = res.data.data.nickname,
          this.imageUrl = res.data.data.img,
          this.content = res.data.data.personal
        })
      }

    },
    created(){
      this.getUserInfo()
    },
    mounted(){
      this.getUserInfo()

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
// .content {
//   width: 30%;
//   margin: 5% auto;
//   color: #fff!important;
// }

//   /deep/.el-form-item__label {
//       font-size: 14px;
//       color: #fff!important;
//   }
// // 头像
//   .avatar-uploader .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//   }
//   /deep/.avatar-uploader-icon:hover {
//     border-color: #ffffff!important;
//   }
//   .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 178px;
//     height: 178px;
//     line-height: 178px;
//     text-align: center;
//   }
//   .avatar {
//     width: 178px;
//     height: 178px;
//     display: block;
//   }
</style>