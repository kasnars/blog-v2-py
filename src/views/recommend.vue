<template>
  <div>
    <el-dialog
  title="新增笔记"
  :visible.sync="dialogVisible"
  width="30%"
  >
   <el-form :model="form">
    <el-form-item label="新增标签名" >
      <el-input v-model="postTag" ></el-input>
    </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="postTagBtn">确 定</el-button>
  </span>
</el-dialog>

    <div class="block recommend wow slideInRight bgtrans">
      <div class="outblock">
      <title-box title="全部标签"></title-box>
      <el-button type="primary" round @click="dialogVisible = true">新增标签</el-button>
      </div>
      <div>
        <!-- <ul>
          <li :key="index" v-for="(item,index) in ArrayBlog">
            <a :href="item.url" target="_blank">{{item.name}}</a>
          </li>
        </ul> -->
          <el-tag type=""  v-for=" item in tagList" :key="item.id" class="tags_item">{{item.tag_name}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import { createTagHttp, getUserTagsHttp } from "../api/tag";
import titleBox from "../components/TitleBox/titleBox.vue";
export default {
  name: "recommend",
  components: { titleBox },
  data() {
    return {
      tagList:[],
      postTag:'',
      form:{},
      dialogVisible:false
    };
  },
  methods: {
    async getTagsRemote() {
      const { data } = await getUserTagsHttp();
      this.tagList = data
    },
    postTagBtn(){
      createTagHttp({
        tag_names:[this.postTag]
      }).then(res => {
        this.dialogVisible = false
        this.getTagsRemote();
      })
    }
  },
  mounted() {
    // let wow = new WOW.WOW({
    //     boxClass: 'wow',
    //     animateClass: 'animated',
    //     offset: 0,
    //     mobile: true,
    //     live: true
    // });
    //   wow.init();
    this.getTagsRemote();
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
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 8px 9px;
    border-radius: 5px;
    padding: 10px 17px;
    border: 1px solid rgba(195, 194, 194, 0.5);
    cursor: pointer;
  }
  li:nth-child(n + 1):hover {
    background: rgb(230, 54, 54);
    color: white;
  }
  li:nth-child(2n + 2):hover {
    background: rgb(198, 230, 54);
    color: white;
  }
  li:nth-child(n + 3):hover {
    background: rgb(54, 180, 230);
    color: white;
  }
  li:nth-child(2n + 4):hover {
    background: rgb(230, 54, 163);
    color: white;
  }
}

.assets {
  margin-top: 20px;
}
.bgtrans {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
ul li a {
  display: block;
}
.tags_item {
  // float: right
  margin: 10px 10px 0 0
}
</style>