<template>
  <div class="home">
    <el-carousel height="250px" class="block wow slideInLeft">
      <el-carousel-item v-for="item in LbtArticle" :key="item.id">
        <el-image
          class="wow slideInLeftt"
          style="width: 100%; height: 100%"
          :src="item.idView"
          @click="toLbtBlog(item.url)"
          fit="cover"
        ></el-image>
        <h3 class="small">{{ item.id }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="head">
      <div class="block wow slideInLeft">
        <div class="img1" :key="index" v-for="(item, index) in headerArticle">
          <img :src="item.pic_url" @click="GotoDetail(item.id)" alt="" />
          <div class="tit">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="block main marginTop wow slideInLeft">
      <!-- <title-box
        title="个人作品展示"
        class="title-box wow slideInLeft"
        data-wow-delay="0.4s"
      ></title-box> -->
      <el-input
        placeholder="搜索博客关键字"
        v-model="search"
        class="input-with-select"
      >
        <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select> -->
        <el-button slot="append" icon="el-icon-search" @click="blogSearch"></el-button>
      </el-input>
    </div>
    <div class="title-box wow slideInLeft block main marginTop wow slideInLeft">
            <title-box
        title="猜你喜欢"
        style="margin-bottom:10px"
       
      ></title-box>
      <div class="card-list">
      <!-- <blog-card :WorksData="worksdata"></blog-card> -->
          <el-card shadow="hover" v-for="item in blogsList" :key="item.id" style="margin-top:10px" @click.native="GotoArticleDetail(item.id)">
      {{item.title}}
      
    </el-card>
    </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import BlogList from "../components/BlogList/BlogList.vue";
import TitleBox from "../components/TitleBox/titleBox.vue";
import BlogCard from "../components/BlogCart/BlogCard.vue";
import tally from "../components/sidebar/tally.vue";
import chat from "../components/Chat/chat.vue";
import axios from "axios";
import { blogSearchHttp } from '../api/blog'
import {
  tryHideFullScreenLoading,
  showFullScreenLoading,
} from "../network/serviceHelp";
import { getUserListHttp } from "../api/auth";
import { getUserInfo } from '../tools/token'
export default {
  name: "Home",
  components: {
    BlogList,
    TitleBox,
    BlogCard,
  },
  data() {
    return {
      blogsList:'',
      search:'',
      AllArticle: [
        // {
        //   id:1,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // },
        // {
        //   id:1,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // },
        // {
        //   id:1,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // },
        // {
        //   id:1,
        //   title: 'this is title',
        //   descript: 'descript',
        //   content: 'content',
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // }
      ],
      AllArticleClassName: [],
      // 轮播图数据
      LbtArticle: [
        {
          url: "https://juejin.cn/post/7006518993385160711",
          idView:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73234eb50ab24619a4c105746f872061~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844903512845860872",
          idView:
            "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd9dfc3293a5c~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844903959283367950",
          idView:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07525f7f55dc492c9e70157f45140e37~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
        {
          url: "https://juejin.cn/post/6844904182843965453",
          idView:
            "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/8/17291677b3e079dd~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
        },
      ],
      // 头部文章数据
      headerArticle: [],
      worksdata: [
        {
          title: '111',
          content:'111111',
          id: '1',
          tags: ['vue','koa','js','node'],
          images: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
          url:'https://www.bilibili.com/',
          giturl:'https://gitee.com/kasnars/personalblog'
        },
        {
          title: '111',
          content:'111111',
          id: '2',
          tags: ['vue','koa'],
          images: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
          url:'https://www.bilibili.com/',
          giturl:'https://gitee.com/kasnars/personalblog'
        }
      ],
    };
  },
  methods: {
        GotoArticleDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    GotoDetail(id) {
      this.$router.push({ path: "detail/" + id });
    },
    toLbtBlog(url) {
      window.open(url);
    },
    /*
     *
     * 获取点赞排行的文章并按照降序排序
     * @param {Array}
     */

    // // 获取全部文章
    // GetAllArticle(){
    //  this.$http.get('/api/article/typeList').then(res => {
    //     if(res.data.code === 0){
    //       this.ThumbRank(res.data.data)
    //       // 获取前18篇文章
    //       this.AllArticle = res.data.data.slice(0,18)
    //       // 截取最新的6篇给轮播图展示  .concat() 先将文章数组复制出一个新数组再进行反转，如果使用.reverse(),则会改变文章数组，而不产生新数组
    //       this.LbtArticle = res.data.data.concat().reverse().slice(0,6)
    //         // 截取一部分给轮播图右边的盒子
    //       this.headerArticle = res.data.data.slice(6,8)
    //       // 保存最新推荐的文章数据
    //       this.SaveLatestRecommen();
    //     }
    //   })
    // },
    // // 获取所有文章分类
    // GetAllArticleClassName(){
    //   this.$http.get('/api/article/classify').then(res => {
    //     if(res.data.code === 0){
    //       this.AllArticleClassName = res.data.data;
    //       // 获取全部文章
    //        this.GetAllArticle();
    //     }
    //   })
    // },
    // // 保存最新推荐的文章数据
    // SaveLatestRecommen() {
    //      // 标题数组
    //       let RecommendArry = []
    //       // 获取最新推荐的文章id和标题
    //       this.LbtArticle.forEach((item, index) => {
    //      //item 就是当前按循环到的对象  //index是循环的索引，从0开始
    //       RecommendArry.push({id:item.id,title:item.title})
    //     })
    //       // 保存最新推荐到Vuex
    //       this.$store.commit('setRecommendArry',RecommendArry)
    //       this.$EventBus.$emit('Render')
    // },
    getWorksData() {
      showFullScreenLoading();
      return axios.get("/getworks").then((res) => {
        this.worksdata = res.data.data;
      });
    },
    async initUserList() {
      const { data } = await getUserListHttp();
      console.log(data, "data");
    },
    async blogSearch(){
      const { data } = await blogSearchHttp({
        q:this.search
      })
      console.log(data);
      this.blogsList = data.blogs
    }
  },
  created() {
    this.getWorksData().then(() => {
      tryHideFullScreenLoading();
    });
  },
  mounted() {
    // let wow = new WOW.WOW({
    //   boxClass: 'wow',
    //   animateClass: 'animated',
    //   offset: 0,
    //   mobile: true,
    //   live: true
    // });
    // wow.init();
    this.initUserList();
    getUserInfo()
    this.blogSearch()
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.headImg {
  width: 100%;
  transform: translateY(-60px);
}

.head {
  display: flex;
  .slideshow {
    margin-right: 10px;
  }
  .block {
    background-color: rgba(255, 255, 255, 0);
  }
}

// 轮播图
.slideshowBox :hover .title {
  opacity: 1;
}
.slideshowBox {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  .title {
    font-size: 40px !important;
    padding: 25px;
    color: #fff;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 60px;
    transition: all 0.5s;
  }
  .slideshow {
    flex: 2;
    border-radius: 5px;
  }
  .block {
    flex: 1;
    padding: 0;
  }
}

// 轮播图旁边的盒子
.block .img1 {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  img {
    width: 100%;
    border-radius: 5px;
    height: 128px;
    transition: all 0.6s;
    cursor: pointer;
  }
  .tit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(228, 225, 225);
    width: 100%;
    text-align: center;
  }
  img:hover {
    transform: scale(1.2);
  }
}

.main {
  padding: 20px !important;
  background-color: white !important;
}

.BlogList {
  margin-top: 15px;
  .title-box {
    margin-top: 15px;
  }
}

.rightBox {
  margin-top: 15px;
  .el-tag {
    margin: 5px;
  }
}
.card-list {
  max-height: 400px;
  overflow: auto;
}
</style>
