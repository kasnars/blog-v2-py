<template>
  <div>

    <el-dialog
  title="新增标签"
  :visible.sync="tagShow"
  width="30%"
  >
   <el-form :model="form">
    <el-form-item label="新增标签名" >
      <el-input v-model="tempTags" ></el-input>
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="tagShow = false">取 消</el-button>
    <el-button type="primary" @click="postTagBtn">确 定</el-button>
  </span>
</el-dialog>

    <el-dialog
  title="新增笔记"
  :visible.sync="dialogVisible"
  width="30%"
  >
   <el-form :model="form">
     <el-form-item label="笔记标签" >
       <el-select v-model="postTags" multiple placeholder="请选择" size="medium">
    <el-option
      v-for="item in httpTags"
      :key="item.id"
      :label="item.tag_name"
      :value="item.tag_name">
    </el-option>
  </el-select>
  <el-form-item label="创建标签">
    <el-button @click="tagShow = true">点击创建新标签</el-button>
  </el-form-item>
  <el-form-item label="新创建的标签为" v-if="endTags">
    <el-tag type="success">{{endTags}}</el-tag>
  </el-form-item>
  </el-form-item>
    <el-form-item label="笔记标题" >
      <el-input v-model="form.title" ></el-input>
    </el-form-item>
    <el-form-item label="笔记内容" >
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="postBlog">确 定</el-button>
  </span>
</el-dialog>
    <div class="block trans outblock">
      <!-- 标题 -->
      <title-box title="个人日常技术总结"></title-box>
      <el-button type="primary" round @click="dialogVisible = true">发布笔记</el-button>
    </div>
    <div class="block trans" style="margin: 10px 0">
      <el-row>
        <el-col
          :span="12"
          v-for="item in AllArticle"
          :key="item.id"
          :offset="item.id > 0 ? 2 : 0"
          style="margin: 10px"
          class="contanincard"
        >
          <el-card :body-style="{ padding: '10px' }" class="contanincard">
            <el-image
              style="width: 100%; height: 200px"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fimages03%2F20200601%2F53b43699e59c467c82b666f645ba4bd4.jpeg&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654181892&t=8b957dbebd054183fdcd7a51347d4089"
              fit="cover"
            ></el-image>
            <div style="padding: 10px">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <p class="time" style="margin: 10px 0">
                  {{ parseDescript(item.content) }}
                </p>
                <time class="time" style="margin: 10px 0">{{
                  dateFormat(item.created_time)
                }}</time>
              </div>
              <el-button
                type="text"
                class="button"
                @click="GotoArticleDetail(item.id)"
                >查看详情</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createBlogHttp, updateBlogHttp } from '../../api/blog';
import { createTagHttp, createTagRelationHttp, getUserTagsHttp } from '../../api/tag';

import { getUserInfo } from '../../tools/token';
import TitleBox from "../TitleBox/titleBox.vue";
export default {
  props: ["AllArticle"],
  components: {
    TitleBox,
  },
  data(){
    return{
    dialogVisible:false,
    form:{},
    httpTags:'',
    postTags:'',
    endTags:'',
    tempTags:'',
    tagShow:false,
    }

  },
  mounted() {
    console.log(this.AllArticle, "allart");
    getUserTagsHttp().then(res => {
this.httpTags = res.data
console.log(this.httpTags);
    })
  },
  methods: {
    dateFormat( date) {
 
      return date.toLocaleString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '')
   
    },
    // 去文章详情
    GotoArticleDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    parseDescript(str) {
      return str.slice(0, 10) + "........";
    },
    postBlog(){
      const { user_id } = getUserInfo()
      this.form.author = user_id
      console.log(this.form,'postfion');
      // if (this.endTags) {
      //   this.form.postTags = [...this.form.postTags, this.endTags]
      // }
      console.log(this.form,'postfion');
      createBlogHttp(this.form).then(res => {
        this.postTagAndBlog(res.data.id)
        this.$parent.getAllBlogList()
        this.form = null
        this.endTags = null
        this.$router.go()
      })
      this.dialogVisible = false
    },
    updateBlog(){
      updateBlogHttp({
        
      })
    },
    postTagBtn(){
      createTagHttp({
        tag_names:[this.tempTags]
      }).then(res => {
        this.tagShow = false
        this.endTags = this.tempTags
        // this.getTagsRemote();
      })
    },
    postTagAndBlog(id){
      console.log(id,this.postTags);
      createTagRelationHttp({
        blog_id:id,
        tag_names:[...this.postTags, this.endTags]
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.outblock{
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
}
ul {
  margin-top: 15px;
}
li {
  margin: 20px 0 30px 0;
  cursor: pointer;
}
.title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
.content {
  display: flex;
  .image {
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.4s;
    }
    img:hover {
      transform: scale(1.3);
    }
  }
  .describe {
    margin-left: 10px;
    flex: 5;
    position: relative;
    overflow: hidden;
    height: 150px;
    .tag {
      margin: 5px 0;
      .el-tag {
        margin-right: 10px;
      }
    }

    p {
      display: block;
      font-size: 14px;
      color: #666;
      // 文字溢出隐藏
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 26px;
    }
    .describe-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      line-height: 28px;
      i {
        margin-right: 5px;
      }
      span {
        margin: 0 10px;
        font-size: 14px;
        color: rgb(107, 107, 107);
      }
      .author {
        margin-left: 0;
      }

      .el-button {
        float: right;
      }
    }
  }
}
.contanincard {
  width: 400px;
}
.trans {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
</style>