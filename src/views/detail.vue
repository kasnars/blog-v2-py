<template>
<div>
    <div class="block wow slideInLeft">
      <!-- 您的位置 -->
      <location Tit1="个人总结" Tit2="技术总结" class="wow slideInLeft"></location>
      <!-- 具体文章 -->
      <article-contents :data="data" :tags="tags" class="wow slideInLeft"></article-contents>
      <!-- 点赞/打赏 -->
      <!-- <div class="likeBox">
          <el-button type="primary" round @click.once="like()">
            <i class="iconfont  My-new-icondianzan"></i>
            点赞（{{data.count}})
          </el-button>
      </div> -->
      <!-- 弹框 -->
      <!-- <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        custom-class="tankuang"
        >
      </el-dialog> -->

      <!-- 评论 -->
      <!-- <comment :articleId="id"></comment> -->
    </div>
   </div>
</template>

<script>
import WOW from 'wowjs';
import comment from '@/components/Comment.vue'
import location from '../components/Location/location.vue'
import ArticleContents from '../components/ArticleContents/ArticleContents.vue'
import { tryHideFullScreenLoading, showFullScreenLoading } from '../network/serviceHelp'
import Cookie from 'js-cookie'
import axios from 'axios';
import { getBlogByIdHttp,  } from '../api/blog'
import { getBlogtagsHttp } from '../api/tag'
  export default {
    components:{
      comment,
      location,
      ArticleContents,
     
    },
    data() {
      return {
        id:this.$route.params.id,
        data:{

        },

        isClick:true,

        dialogVisible: false,
        tags:[]
      }
    },
    methods:{
      async getBlogDetailRemote(id){
        const { data } = await getBlogByIdHttp({
          blog_id:id
        })
        this.data = data
      },
      async getBlogTagremote(id){
        const { data } = await getBlogtagsHttp({
          blog_id:id,
        })
        this.tags = data
      },
      // 点赞
      like(){
        // 判断是否登录了
         if(localStorage.getItem('isLoginStatus') === '1'){
          //  console.log(this.id, 'qqqq')
           axios.put(`/article/${this.id}`).then(() => {
             this.$message.success('点赞成功')
             this.data.likeCount ++
           })
          
        }else {
          this.$message({
            message: '请登录后进行操作',
            type: 'warning'
          });
          // this.$router.push({name:'login'})
        }
        
      }
    },
    mounted(){
        this.getBlogDetailRemote(this.id)
        this.getBlogTagremote(this.id)
    }
  }
</script>

<style lang="scss" scoped>
.head {
   margin-top: 20px;
}
.likeBox {
  display: flex;
  justify-content: center;
  margin: 25px 0;
  .el-button {
    margin: 0 10px;
  }
  i {
    margin-right: 8px;
  }
}

.wx {
  width: 150px;
}
</style>