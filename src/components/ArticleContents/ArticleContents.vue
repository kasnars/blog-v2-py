<template>
  <div>
    <h2>{{data.title}}</h2>
     <div class="timeBox">
       作者：{{data.author_name}}
     </div>
      <div class="timeBox">
        <span class="timer"><i class="iconfont icon-date"></i>{{data.created_time | timer()}}</span>
        <span><i class="el-icon-view"></i>{{data.views}}</span>

      </div>
       <el-tag type=""  v-for=" item in tags" :key="item.id" class="tags_item">{{item.tag_name}}</el-tag>
          <el-image
          v-if="data.img"
          style="width: 600px; height: 500px"
          :src="data.img"
          fit=cover></el-image>
      <!-- 具体文章内容 -->
      <div class="detail contenttext" style="margin-top: 20px">
        <mavon-editor v-model="data.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="atom-one-dark"
          :boxShadow="false"
          style = "white-space: pre-wrap"
          >
        </mavon-editor>
      </div>
                <el-button type="primary" round @click.once="like()" >
            <i class="iconfont  My-new-icondianzan"></i>
            点赞（{{data.count}})
          </el-button>
                          <el-button type="primary" round @click="toCom"  >
            <i class="iconfont  My-new-icondianzan"></i>
            评论
          </el-button>
            <el-button type="primary" round @click="openDig" v-if="data.author == nowId" >
            <!-- <i class="iconfont  My-new-icondianzan"></i> -->
            修改
          </el-button>

                      <el-button type="danger" round @click="remove" v-if="data.author == nowId">
            <!-- <i class="iconfont  My-new-icondianzan"></i> -->
            删除
          </el-button>

              <el-dialog
  title="新增评论"
  :visible.sync="comVisible"
  width="30%"
  >
   <el-form :model="form">
    <el-form-item label="评论内容" >
      <el-input v-model="postCom" ></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="comVisible = false">取 消</el-button>
    <el-button type="primary" @click="postComBtn">确 定</el-button>
  </span>
              </el-dialog>

                <el-dialog
  title="新增回复"
  :visible.sync="hfVisible"
  width="30%"
  >
   <el-form :model="form">
    <el-form-item label="回复内容" >
      <el-input v-model="postHf" ></el-input>
    </el-form-item>
  </el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="hfVisible = false">取 消</el-button>
    <el-button type="primary" @click="postSub">确 定</el-button>
  </span>
</el-dialog>

              <el-dialog
  title="新增笔记"
  :visible.sync="dialogVisible"
  width="30%"
  >
   <el-form :model="form">

    <el-form-item label="笔记标题" >
      <el-input v-model="form.title" ></el-input>
    </el-form-item>
    <el-form-item label="笔记内容" >
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false  ">取 消</el-button>
    <el-button type="primary" @click="updata">确 定</el-button>
  </span>
</el-dialog>
<div class="com-list" style="margin-top:20px">
    <el-card shadow="hover" v-for="(item,index) in comList" :key="item.id" style="margin-top:15px">
      <div class="card-title-flex">
      <div>
      <span>{{index+1}}楼 - </span>
      <span>{{item.user_name}}</span>
      </div>

               <el-button type="text" round @click="delCom(item.id)"  >
            
             删除
          </el-button>
      </div>

      <el-divider content-position="left"></el-divider>
      <div style="display:flex;align-items: center;justify-content: space-between;">
     <div>{{item.content}}</div>
     <div>
          <el-button type="primary" round @click="toHf(item.id)"  >
            
            回复
          </el-button>
     </div>

      </div>
        <div v-if="item.subs.length>0">
          <el-divider content-position="left">相关回复</el-divider>
          <el-card shadow="hover" v-for="inner in item.subs" :key="inner.id" style="margin-top:10px">
            <div>{{inner.user_name}}</div>
            <el-divider content-position="left"></el-divider>
            <div>{{inner.content}}</div>
          </el-card>
        </div>
    </el-card>
</div>

  </div>
</template>

<script>
import { addComHttp, delComHttp, getComHttp, postSubComHttp, removeBlogHttp, updateBlogHttp } from '../../api/blog';
import { getUserInfo } from '../../tools/token';
  export default {
    props:['data','tags'],
    filters:{
      timer(str){
        return str.substring(0,9);
      },
    },
    data(){
      return{
        hfVisible:false,
        comVisible:false,
        dialogVisible:false,
        form:{},
        nowId:'',
        postCom:'',
        comList:'',
        postHf:'',
        selectComId:'',
        isSignIn:""
      }
    },
    mounted(){
this.form = JSON.parse(JSON.stringify(this.data))
this.getUserId()
// if (this.data.id) {
//   this.getAllCom(this.data.id)
// }
    },
    watch:{
      data:{
        handler(newName, oldName) {
         this.getAllCom(this.data.id);
        },
      }
    },
    computed:{
            isSignIn(){
        return localStorage.getItem('isLoginStatus')
      },
    },

    methods:{
      // getArtcileByID(){
      //   this.$http.get(`/article/${this.id}`).then(res => {
      //     this.data = res.data.data;
      //   })
      // },
      // getArtcileByID(){
      //   // const id = this.$route.params.id
      //   this.$http.get(`/article/${this.data.id}`).then(res => {
      //     this.data = res.data.data;
      //   })
      openDig(){
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(this.data))
      },
      updata(){
        updateBlogHttp({
          ...this.form,
          blog_id:this.data.id
        }).then(res => {
          this.dialogVisible = false
          this.$router.go()
        })
      },
      remove(){
        removeBlogHttp({
          blog_id:this.data.id
        }).then(res => {
          this.$router.go(-1)
        })
      },
      getUserId(){
        const { user_id } = getUserInfo()
        this.nowId = user_id
      },
      toCom(){
        this.comVisible = true
      },
      toHf(id){
        this.hfVisible = true
        this.selectComId = id
      },
      postComBtn(){
        const  userdata  = getUserInfo()
        
        console.log(userdata,'dda');
        addComHttp({
          user_id:userdata.user_id,
          user_name:userdata.username,
          blog_id:this.data.id,
          content:this.postCom
        }).then(res => {
          this.comVisible = false
          this.$router.go()
        })
      },
      postSub(){
        const  userdata  = getUserInfo()
        console.log(this.selectComId)
        postSubComHttp({
          user_id:userdata.user_id,
          user_name:userdata.username,
          blog_id:this.data.id,
          content:this.postHf,
          parent:this.selectComId
        }).then(res => {
          this.$router.go()
        })
      },
      getAllCom(id){
        let params = {blog_id:id}
        console.log(params,'params');
        getComHttp(params).then(res => {
          this.comList = res.data.data
          console.log(res.data.data,'com');
        })
      },
      delCom(id){
        delComHttp({
          comment_id:id
        }).then(res => {
          this.$router.go()
        })
      }
    },
 }
</script>

<style lang="scss" scoped>
.timer {
  margin-right: 15px;
}
.timeBox {
  margin-bottom: 20px;
}
i {
  margin-right: 5px;
}
h2 {
  font-size: 25px;
  font-weight: 550;
  margin: 20px 0;
}
.contenttext{
  text-indent: 2em;
}
.tags_item{
  margin-right: 10px;
}
.card-title-flex{
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}
</style>