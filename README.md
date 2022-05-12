# KasnarsBlog个人主页
## vue2+element-ui+eggjs+mysql

## 后端项目地址 

[eggjs+mysql实现个人博客后端](https://gitee.com/kasnars/egg)

## 线上地址 

[KasnarsBlog](http://kasnars.gitee.io/personalblog/#/)



**部分截图（开发阶段）** 
![QQ截图20210924234119.png](https://i.loli.net/2021/10/11/jUXK5GJQSYr2uZc.png)
![QQ截图20210924233829.png](https://i.loli.net/2021/10/11/Jb4SFjCH2aMlvo5.png)
![QQ截图20210924234020.png](https://i.loli.net/2021/10/11/enMoEpmIKDjzqk8.png)
![QQ截图20210924234105.png](https://i.loli.net/2021/10/11/MIANjRL68rh2Jcg.png)
![QQ截图20210924233931.png](https://i.loli.net/2021/10/11/6ZUmz9a2pBwCHrb.png)
![QQ截图20210924234142.png](https://i.loli.net/2021/10/11/G3UlThg6cAZPbxQ.png)


**所用技术栈**

- vue2
  -  逻辑实现以及页面渲染等功能
- vue-cli 
  -  生成脚手架快速搭建及项目管理 
- vue-router  
  - 路由传参、路由守卫，路由跳转等功能
- sass
  -  实现页面css样式调整和搭建
- axios  
  -  发起ajax网络请求，进行请求响应拦截等 
- element-ui 
  - 登录验证,各种ui组件,比如:分页,加载,输入框,图片,轮播图,卡片等前端效果
- vuex
  - 进行全局状态管理


---

_具体实现的功能_  
+ api封装
+ 实现登录，注册流程，并通过token进行权限验证  
+ 实现图片的上传,文件的下载和文字的编辑
+ 实现简易可搜索播放器功能  
+ 实现文章阅读和分页功能  
+ 实现浏览量和访问量记录，点赞，留言板，时间轴显示等功能


- 文件结构
  - /dist 线上部署文件
  - /node_modules 项目依赖
  - /public 公共文件 图片文件
  - /src  项目代码
    - /api  封装api请求
    - /assets 静态资源，图标，基础css等
    - /components 各个封装后的组件模块
    - /musicNetWork  音乐模块已删除
    - /router 前端路由模块
    - /store  前端store状态管理模块
    - /tools  自封装工具类
    - /views  页面模块 一个文件一个页面
  - package.json  npm依赖文件