<template>
  <div class="block wow slideInLeft" style="background: rgba(255, 255, 255, .2)">
    <div @click="changeShow">
      <el-button type="primary" round style="width: 100%">{{timelineshow? '关闭时间轴':'展开时间轴'}}</el-button>
    </div>
  <el-timeline style="margin:20px">
    <el-collapse-transition>
      <div v-if="timelineshow">
    <el-timeline-item :timestamp="item.time" placement="top" class="transition-box"
    v-for="item in timeLocusData" :key="item.id"
    >
      <el-card>
        <h4>{{item.title}}</h4>
        <p style="margin-top: 10px">{{item.content}}</p>
      </el-card>
    </el-timeline-item>
      </div>
    </el-collapse-transition>
  </el-timeline>
</div>    
</template>

<script>
import axios from 'axios';
import WOW from 'wowjs';
  export default {
    name:'timeLocus',
    inject: ['reload'],
    data() {
      return {
        AllArticle:[],
        state:this.$store.state.timeLocus,
        timelineshow : true,
        timeLocusData:[
          {
            id: '2',
            time: '2018/4/1',
            title: '2222222',
            content: '333333'
          },
          {
            id:'1',
            time: '2018/4/12',
            title: '111111',
            content: '222222222'
          },

        ]
      }
    },
    methods:{
        // 获取所有文章
      // GetAllArticle(){
      // this.$http.get('/api/article/typeList',{params:{type:1}}).then(res => {
      //     if(res.data.code === 0){
      //       // 获取文章数组
      //       this.AllArticle = res.data.data
      //       console.log(this.AllArticle);
      //     }
      // })
      // },
      getAllTimeLocus(){
        axios.get('/timelocus').then(res => {
          this.timeLocusData = res.data.data
        })
      },
      changeShow(){
        this.timelineshow = !this.timelineshow
      }
    },
    created(){
      // this.GetAllArticle();
      this.getAllTimeLocus()
    },
    activated(){
      if(this.$store.state.timeLocus == 1){
        // 为1说明当前文章数据被刷新了，需要重新刷新当前组件
        this.reload();
        this.$store.commit('changeTimeLocus',0)
      }
    },
    mounted(){
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
.title {
  font-size: 16px;
  font-weight: 600;
}
.content {
  margin: 20px 0;
}
</style>