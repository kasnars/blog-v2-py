<template>
  <div class="wow slideInLeft">
    <article-lists  :AllArticle="AllArticle"></article-lists>
    <el-pagination
  background
  layout="prev, pager, next"
  @current-change="changePage"
  :page-size="4"
  :total="total">
</el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import WOW from 'wowjs';
import ArticleLists from '../components/articleLists/ArticleLists.vue'
import { tryHideFullScreenLoading, showFullScreenLoading } from '../network/serviceHelp'
import { getAllBlogListHttp } from '../api/blog'
  export default {
  inject: ['reload'],
  components: { ArticleLists },
  data() {
    return {
      AllArticle:[
        // {
        //   id:1,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   time: '2020-08-09',
        // },
        // {
        //   id:2,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   time: '2020-08-09',
        // },
        // {
        //   id:3,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   time: '2020-08-09',
        // },
        // {
        //   id:41,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   time: '2020-08-09',
        // }
      ],
      key:this.$route.query.key,
      // 当前的页，默认为第一页
      curPage:1,
      // 设置每页的数量
      // pageSize:2,
      // 全部文章数量
      count:'',
      pageShow: false,
      onePage : 2,
      nowpage: 1,
      // pageSize: [4,8,12],
      total:''
    }
  },
   beforeRouteUpdate (to, from, next) {
     this.reload()
     next()
  },
  watch:{
    key(val){
        alert(val)
    }
  },
  methods:{
    // change(val){
    //   this.GetAllArticle(val,this.pageSize);
    // },
    // GetAllArticle(curPage,pageSize){
    //   if(this.key){
    //     // 获取分类文章信息
    //     this.$http.get('/api/article/list/Singleclassify',{params:{classname:this.key}}).then(res => {
    //     if(res.data.code === 0){
    //       // 获取文章数组
    //       this.AllArticle = res.data.data.list;
    //       console.log("获取分类文章信息",this.AllArticle);
    //     }
    //   })
    //   }else {
    //     // 获取全部文章信息
    //     this.$http.get('/api/article/typeList',{params:{curPage:curPage,pageSize:pageSize}}).then(res => {
    //     if(res.data.code === 0){
    //       // 获取文章数组
    //       this.AllArticle = res.data.data;
    //       this.count =  res.data.coust
    //     }
    //   })
    //   }
     
    // },
    async getAllBlogList(){
      const { data } = await getAllBlogListHttp()
      this.AllArticleRaw = data.blogs
      this.total = data.total
      this.AllArticle = this.AllArticleRaw.slice(0,4)

    },
    changePage(nowPage){
      this.AllArticle = this.AllArticleRaw.slice(4*(nowPage-1),nowPage*4)
      console.log(this.AllArticleRaw,'raw');
      console.log(this.AllArticle,'now');
    },
    getAllArticle(){
      showFullScreenLoading()
      return axios.get('/article').then(res => {
        this.AllArticle = res.data.data
      })
    },
  },
  created(){
    // 分页请求
    // this.GetAllArticle(this.curPage,this.pageSize);
    this.getAllArticle().then(() =>{
      tryHideFullScreenLoading()
    })
  },
  mounted(){
    // let wow = new WOW.WOW({
    //       boxClass: 'wow',
    //       animateClass: 'animated',
    //       offset: 0,
    //       mobile: true,
    //       live: true
    //     });
    //     wow.init();
    this.getAllBlogList()
  }
  }
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>