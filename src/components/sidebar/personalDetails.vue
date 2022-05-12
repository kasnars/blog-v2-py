<template>
  <div class="personalDetails" id="introduction">
    <!-- 个人简介 -->
    <div class="block bgtrans">
      <h2>{{ blogSet.card_title }}</h2>
      <div>
        <p>
          <i class="iconfont My-new-iconzhiye"></i>{{ blogSet.card_school }}
        </p>
        <p>
          <i class="iconfont My-new-icondingwei1"></i
          >{{ blogSet.card_location }}
        </p>
        <p>
          <i class="iconfont My-new-iconyouxiang"></i>{{ blogSet.card_email }}
        </p>
      </div>
      <div>
        <ul class="buttonBox">
          <li class="item">
            <a href="javascript:;" title="个人微信号" class="item-wx"></a>
            <img class="pic" src="~@/assets/img/myvx.jpg" alt="" />
          </li>
          <el-tooltip
            class="item"
            effect="dark"
            content="1185785464@qq.com"
            placement="top-start"
          >
            <li class="item">
              <a href="javascript:;" class="item-e-mail"></a>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="个人常用git地址，点击跳转"
            placement="top-start"
          >
            <li class="item">
              <a
                href="https://gitee.com/python-yang-1117"
                title="gitee主页"
                target="_blank"
                class="item-git"
              ></a>
            </li>
          </el-tooltip>
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="网络原因更新较少"
            placement="top-start"
          >
            <li class="item">
              <a
                href="https://github.com/kasnars"
                target="_blank"
                class="item-qq"
              ></a>
            </li>
          </el-tooltip> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { blogSet } from "../../../blogSet.config";
export default {
  data() {
    return {
      blogSet,
    };
  },
};
</script>

<style lang="scss" scoped>
// 个人简介
.bgtrans {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}
.block {
  height: 100%;
  // background-color: rgb(78, 78, 78);
  h2 {
    padding-bottom: 10px;
    color: rgb(214, 211, 211);
  }
  p {
    margin: 10px 0;
    font-size: 14px;
    color: aliceblue;
  }
}

.buttonBox {
  display: flex;
  margin: 20px 0;
  .item {
    margin: 0 5px;
    cursor: pointer;
    position: relative;
    a {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aliceblue;
    }
    .item-e-mail {
      background: url("~@/assets/img/e-mail.png") no-repeat;
      background-position: 9px 9px;
      background-size: 65%;
      background-color: #fff;
    }
    .item-wx {
      background: url("~@/assets/img/wxx.png") no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-git {
      background: url("~@/assets/img/git.png") no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-qq {
      // background: url('~@/assets/img/qq.png') no-repeat;
      background: url("~@/assets/img/github.jpeg") no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    img {
      width: 60px;
      transition: all 0.5s;
      opacity: 0;
      position: absolute;
      top: -70px;
      left: -5px;
    }
  }
}

// 鼠标悬浮，显示图片
.buttonBox .item a:hover {
  box-shadow: 0 0 15px rgb(255, 255, 255);
}
.buttonBox .item:hover .pic {
  opacity: 1;
  box-shadow: 0 0 6px rgb(255, 255, 255);
}

.iconfont {
  margin-right: 5px;
}
</style>