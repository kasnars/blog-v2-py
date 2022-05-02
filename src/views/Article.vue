<template>
    <div class="wrapper">
        <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>您还未登录，无法查看收藏列表</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="toPre">返回上一页</el-button>
    <el-button type="primary" @click="toLogin">马上登录</el-button>
  </span>
</el-dialog>

        <h1 class="title">文章列表</h1>
        <div class="article">
            <!-- <el-button class="addBtn" @click="handleAdd">新增+</el-button> -->
            <el-table :data="articleList" border stripe>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="日期"
                    width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span>{{ scope.row.created_time.split('T')[0] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
                        <!-- <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button> -->
                        <el-button size="mini" type="danger" @click="handleDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
    </div>
</template>

<script>
import { delLikeHttp, getLikeListHttp } from '../api/blog'
import { getUserInfo } from '../tools/token'
    export default {
        data() {
            return {
                articleList:[],
                centerDialogVisible:true
            }
        },
        methods:{
            handleAdd() {
                this.$router.push({name:'editArticle'})
            },
            handleLook(row) {
                let id = row.id
                this.$router.push({path:'/detail/'+id})
            },
            handleEdit(row) {
                let id = row.id;
                this.$router.push({name:'editArticle',params: {id:id}})
            },
            handleDelect(row){
                let id = row.id
                // this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //   this.$message({
                //     type: 'success',
                //     message: `文章删除成功!`
                //   });
                //     // 发起删除的网络请求
                //     this.$http.post('/api/article/delete',{
                //         article_id:id
                //     })
                //     .then(res => {
                //         if(res.data.code === 0){
                //             //发起删除请求操作
                //             this.$message({
                //                 type: 'success',
                //                 message: `${id}文章删除成功!`
                //             });
                //             setTimeout(() => {
                //                 location.reload()
                //             }, 500);  
                //         }
                //     }).catch(e=>{
                //         console.log(e)
                //     })
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '已取消删除'
                //     });          
                // });
                console.log(id);
                const { user_id } = getUserInfo()
                delLikeHttp({
                    user_id,
                    blog_id:id
                }).then(res => {
                    this.getList()
                })
            },
            getMyBlogList(){
               this.$http.get('/api/article/myList').then(res => {
                 console.log(res);
                 if(res.data.code === 0){
                    this.articleList = res.data.data
                    console.log(this.articleList);
                 }
               })
            },
            getList(){
                const { user_id } = getUserInfo()
                getLikeListHttp({user_id}).then(res => {
                    console.log(res.data.data);
                    this.articleList = res.data.data
                })
            },
            toLogin(){
                this.$router.push('/login')
            },
            toPre(){
                this.$router.go(-1)
            }

        },
        created() {
            // this.getMyBlogList()
                        if (localStorage.getItem('isLoginStatus') == 1) {
                this.centerDialogVisible = false
            }
        },
        mounted(){
            this.getList(   )

            
        }
    }
</script>

<style lang="scss" scoped>
.title {
    margin: 30px 0;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
}
.article {
    .addBtn {
        float: right;
        margin-bottom: 20px;
    }
}
.el-table {
    .cell {
        text-align: center;
    }
}
</style>