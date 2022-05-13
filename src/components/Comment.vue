<template>
  <div class="">
    <div class="comment-box  ">
      <div v-if="isSignIn != 1" class="signInText"><span class="login" @click="GotoLogin">登录</span>后才能留言哟~</div>
        <div class="bottom ">
          <div class="dec">
              <span>共<span class="commentTotal">{{commentArray.length}}</span>条留言</span>
          </div>
          <div class="CommentInput ">
              <img  :src="imageUrl?imageUrl:defaultAvatar"  alt="">
              <el-input
              type="textarea"
              :rows="3"
              placeholder="欢迎来到留言板"
              v-model="textarea"
              class="inputbox"
              size="350"
              maxlength="350"
              resize="none"
              >
              </el-input>
<el-button type="primary" @click="postBoard ">发布留言</el-button>
          </div>
          <!-- 评论区 -->
          <ul class="Commentarea ">
              <h3>热门留言</h3>
              <li :key="item.id" v-for="item in commentArray">
                  <div class="Commentareabox">
                      <!-- <div class="pic">
                          <img :src="item.img" alt="">
                      </div> -->
                      <div class="side">
                        <span class="nickname">{{item.user_name}}: </span>
                          <div class="CommentContent">                             
                              <span class="cmcontent">{{item.content}}</span>
                          </div>
                          <div class="timerorlike">
                              <span class="timer">{{item.created_time.split('T')[0]}}</span>
                              <!-- <span  @click.once="toLike(item.id)">
                                <i class="iconfont  My-new-icondianzan"></i>
                                {{item.likes || 0}}
                                </span> -->
                              <!-- <span class="delete" v-if="thisNickName === '怪蜀黍'"  @click="handleDelect(item.id)">删除</span> -->
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios';
import { showFullScreenLoading, tryHideFullScreenLoading } from '../network/serviceHelp'
import { createBoardHttp, getBoardHttp } from '../api/blog';
import { getUserInfo } from '../tools/token';
  export default {
    inject: ['reload'],
    props:['articleId'],
    data() {
      return {
        commentArray:[
          {
            img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            nickname:'11111',
            content: '11111111222',
            likes: 0,
          },
        ],
        textarea:'',

        imageUrl:sessionStorage.getItem("avatar"),
        defaultAvatar:require("@/assets/img/plnew.jpg"),

        thisNickName:sessionStorage.getItem("nickname"),
      }
    },
    methods:{

     handleDelect(id) {
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 发起删除的网络请求
                    this.$http.post('/api/comment/delete',{
                        comment_id:id
                    })
                    .then(res => {
                        if(res.data.code === 0){
                            //发起删除请求操作
                            this.$message({
                                type: 'success',
                                message: `评论删除成功!`
                            });
                            setTimeout(() => {
                                this.reload()
                            }, 500);  
                        }
                    }).catch(e=>{
                        console.log(e)
                    })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      GotoLogin(){
        this.$router.push({name:'login'})
      },
      // 获取文章评论
      GetArticleComment(){
        if(this.articleId){
          this.$http.get('/api/comment/list',{params:{article_id:this.articleId}})
          .then(res => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data.reverse();
          })
        }else {
          // 如果当前没有文章id,则属于留言 ，则把文章id赋值为0再发送请求
           this.$http.get('/api/comment/list',{params:{article_id:0}})
          .then(res => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data.reverse();
          })
        }
      },
      // 发送评论
      SendComment(){
         if(localStorage.getItem('isLoginStatus') == 1 && localStorage.getItem('getToken')){
            // // 发起评论请求
            // this.$http.post('/api/comment/publish',{
            //   content:textarea,
            //   // 有则发送文章id，无则发送0
            //   article_id:this.articleId ? this.articleId:0
            // }).then(res => {
            //   this.GetArticleComment();
            //   this.textarea = ''
            // })
            const payload = {
              nickname: localStorage.getItem('nickname'),
              img: localStorage.getItem('userimg'),
              content: this.textarea,
            }
            if (payload.content.trim() === ''){
              this.$message.error('内容不能为空')
              return
            } else {
              axios.post('/comment', payload).then(() => {
                this.$message.success('评论成功')
                const newId = this.commentArray.pop().id + 1
                payload.id = newId
                this.commentArray.push(payload)
                // this.$router.go(0)
                this.textarea = ''
              })
            }
          }else {
            this.$message({
                message: '请登录后进行操作',
                type: 'warning'
              });
              this.$router.push({name:'login'})
          }
      },

      getAllComment(){
        showFullScreenLoading()
        axios.get('/comment').then(res => {
          this.commentArray = res.data
        }).then(() => tryHideFullScreenLoading())
      },

      toLike(id){
        if(localStorage.isLoginStatus !== '1'){
          this.$message.error('未登录，请先登录')
          return
        }
        axios.put(`/comment/${id}`).then(() => {
          this.$message.success('点赞成功')
          this.commentArray.forEach(item => {
            if(item.id === id) { item.likes ++}
          })
          // this.$router.go(0)
        })
      },
      getAllBoard(){
        getBoardHttp().then(res=>{
          console.log(res.data.data);
          this.commentArray = res.data.data
        })
      },
      postBoard(){
        if (localStorage.getItem('isLoginStatus') != 1) {
          this.$message.error('还未登录，请先登录')
        } else {
          const userdata = getUserInfo()
          createBoardHttp({
            content:this.textarea,
            user_id:userdata.user_id,
            user_name:userdata.username,
          }).then(res => {
            this.$message.success('留言成功')
            this.getAllBoard()
          })
        }
        

      }
    },
    computed:{
      // 查询登录状态
      isSignIn(){
        return localStorage.getItem('isLoginStatus');
      },
    },
    // created(){
    //   this.getAllComment()
    // },
    mounted(){
      this.getAllBoard()
    }
  }
</script>

<style lang="scss" scoped>
.top {
    overflow: hidden;
    position: relative;
    margin-bottom: 85px;
    .top-left,
    .top-right {
        float: left;
    }
    .top-left {
        margin-right:25px;
        img {
            width: 130px;
        }
    }
    .top-right {
       div {
           margin: 15px 0;
       }
       .title {
           font-size: 25px;
           font-weight: 400;
       }
       
    }
    .top-right-btn {
          position: absolute;
          bottom: 1px;
          right: 0px;
    }
}
.bottom {
    .dec {
        margin-bottom: 25px;
    }
    .CommentInput {
      display: flex;
        margin-bottom: 55px;
        img {
            width: 75px;
            height: 75px;
            margin: 0 15px;
            border-radius: 5px;
        }
    }
}

.commentTotal {
  color: red;
}
.Commentarea {
    li {
        font-size: 14px;
        margin: 10px 0;
        width: 100%;
        border-bottom: 1px dashed  rgb(204, 204, 204);
        .Commentareabox {
            padding: 15px 0;
            overflow: hidden;
            display: flex;
            .pic,
            .side {
                .nickname {
                    color: skyblue;
                }              
                .timerorlike {
                    margin-top: 15px;
                    .timer {
                        color: #999;
                    }
                    i {
                      margin-right: 8px;
                    }
                    .vertical {
                        margin: 0 10px;
                    }
                    .delete {
                      margin-right: 10px;
                      color: skyblue;
                      cursor:pointer
                    }
                }
            }
            .pic {
                img {
                    width: 50px;
                    margin-right: 10px;
                }
            }

             .side {
                width: 93%;
                .timerorlike {
                     .timer {
                    float: left;
                }
                span {
                    float: right;
                }
                }
            }
        }
    }
}
.My-new-icondianzan {
      // 鼠标小手
  cursor:pointer;
}

.signInText {
   margin-bottom: 10px;
   .login {
    // 鼠标小手
    cursor:pointer;
    color: skyblue;
  }
}
.CommentContent{
  margin-top: 10px;
  font-size: 16px;
  text-indent: 1em;
}
.trans{
  background: rgba(255, 255, 255, .1);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
}
</style>