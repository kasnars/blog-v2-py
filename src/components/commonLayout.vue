<template>
  <div class="commonLayout">
    <!-- 导航条 -->
    <nav>
      <common-header @goTo="goTo()" class="wow slideInRight common-header" style="top:0px"></common-header>
    </nav>

    <!-- 切换大屏阅读模式按钮 -->
    <!-- <check-box isname="read"></check-box> -->

      <!-- 中心 -->
      <section>
        <div class="wrapper marginTop">
            <el-row :gutter="10" class="head" v-show="!isShowDiv">
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <div class="grid-content bg-purple slideshowBox">
                  <!-- 视图切换 -->
                    <article ref="article">
                      <keep-alive include="timeLocus">
                        <router-view></router-view>
                      </keep-alive>
                    </article>
                </div>
                </el-col>
              <el-col :lg="6" :xl="6">
                <div class="grid-content bg-purple-light synopsis" ref="sidebar">
                  <!-- 侧边栏 -->
                    <aside class="wow slideInRight">
                      <personal-details class="wow slideInRight maginbot"></personal-details>

                       <div class="block weather">
                         <!-- <div class="block maginbot item">
                           “时间就像海绵里的水,只要愿挤,总还是有的”
                         </div>
                         <div class="block item">
                           “人类的悲欢并不相通，我只觉得他们吵闹。”
                         </div>                -->
                         <div class="weatherheader">
                          <div class="itemtext">当前实时天气</div>
                          <div class="locationtext"><i class="el-icon-location"></i>
                            {{location}}
                          </div>
                         </div>
                         <div class="smalltext">
                          <p><i class="el-icon-sunny"></i>
                            天气: {{weatherData.info}}</p>
                          <p><i class="el-icon-cloudy"></i>
                            温度: {{weatherData.temperature}}</p>
                          <p><i class="el-icon-heavy-rain"></i>
                            湿度: {{weatherData.humidity}}</p>
                          <p><i class="el-icon-stopwatch"></i>
                            空气指数: {{weatherData.aqi}}</p>
                          <p><i class="el-icon-wind-power"></i>
                            风向: {{weatherData.direct}}</p>
                          <p><i class="el-icon-timer"></i>
                            风力: {{weatherData.power}}</p>
                         </div>
                         <div class="weatherfoot">数据来源：聚合API</div>
                       </div>


                      <tally class="maginbot" :visit="visit"></tally>
                      <!-- <music class="maginbot  slideInLeft" data-wow-delay="0.2s"></music> -->
                      <!-- <div class="block maginbot">
                        <title-boxs title="最新推荐"></title-boxs>
                        <ranking-list title="最新推荐"></ranking-list>
                      </div> -->
                      <!-- <div class="block maginbot box" v-if="boxShow" @mouseenter="inclick" @mouseleave="outclick">
                        <div id="x" @click="changeBoxShow" v-show="gb" >x</div>
                        <title-boxs title="广告位" :img="boximg"></title-boxs>
                      </div>  -->
                    </aside>
                </div>
                </el-col>
            </el-row>
            <!-- 动画效果展示  -->
            <animation  v-if="isShowDiv"></animation>
        </div>
        
      </section>

    <!-- 底部 -->
    <footer>
      <common-bottom></common-bottom>
    </footer>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
import CommonBottom from './CommonBottom.vue'
import PersonalDetails from './sidebar/personalDetails.vue'
import Music from './sidebar/music.vue'
import Tally from './sidebar/tally.vue'
import TitleBoxs from '@/components/TitleBox/titleBoxs.vue'
import RankingList from './sidebar/rankingList.vue'
import CheckBox from '@/components/checkbox/checkbox.vue'
import axios from 'axios'
export default {
  name: 'commonLayout',
  components:{
    CommonHeader,
    CommonBottom,
    PersonalDetails,
    Music,
    Tally,
    TitleBoxs,
    RankingList,
    CheckBox,
    Animation
  },
  data() {
    return {
      isShowDiv:false,
      weatherData:{
        // aqi: "62",  // 空气质量
        // direct: "西风",
        // humidity: "49", //湿度
        // info: "晴", // 天气情况
        // power: "2级", //风力
        // temperature: "33", // 温度
        // wid: "00"
      },
      location: '武汉',
      visit: 0,
      boximg:'https://img1.baidu.com/it/u=30571864,657645104&fm=26&fmt=auto',
      boxShow:true,
      gb:false
    }
  },
  methods: {
    goTo(){
      this.isShowDiv = false
    },
    showTransition(){
      this.isShowDiv = true;
      window.pageYOffset = document.documentElement.scrollTop = 0;
    },
    changeBoxShow(){
      this.boxShow = false
    },
    inclick(){
      this.gb = true
    },
    outclick(){
      this.gb = false
    }
  },
  mounted(){
    axios.get('/juheapi/weather')
    .then(res => {
      console.log(res.data.data.result.realtime)
      this.weatherData = res.data.data.result.realtime
    })
    axios.get('/read').then(res => {
      // console.log(res.data.data, 'read')
      this.visit = res.data.data
    })
  },
  activated(){

  }
}
</script>

<style scoped lang="scss">
.commonLayout {
  // width: 100%;
  // height: 100%;
  // 导航条
    .common-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
  // 切换部分
  section {
    margin-top: 80px;
    .slideshowBox {
       margin-right: 7px;
    }   
  }
  // 侧边栏
  aside {
    width: 100%;
    .maginbot {
      margin-bottom: 20px;
      width: 100%;
    }
    .weather {
      font-family: 'Courier New', Courier, monospace;
      color: black;
      height: 255px;
      // background: url('https://img2.baidu.com/it/u=384710098,2012479534&fm=26&fmt=auto&gp=0.jpg');
      background: rgba(255, 255, 255, .7);
      background-position: center;
      background-size: 100%;
      z-index: 3;
      margin-bottom: 10px;
      & .itemtext{
        font-size: 20px;
        margin: 3px;
      }
      & .smalltext{
        font-size: 18px;
        .smalltext p{
          margin: 5px;
        }
      }
      .weatherheader{
        // display: flex;
        // justify-content: space-around;
        margin-bottom: 10px;
      }
      .locationtext{
        font-size: 20px;
      }
      .item {
        position: relative;
        background:hsla(0, 0%, 100%, .5);
        box-shadow: 0 0 15px rgb(44, 44, 44);
        z-index: 99;
        // background:hsla(hue, saturation, lightness, alpha);
      }
      .item::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        filter: blur(20px);
        
      }
    }
  }
}

.showTransition {
  cursor:pointer;
  text-align: center;
  font-weight: 600;
}
.weatherfoot{
  text-align: end;
  margin-top: 20px;
}
.box{
  position: relative;
}

  #x {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 25px;
  color: red;
  background-color: #f1f1f1;
  cursor: pointer;
}


</style>
