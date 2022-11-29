<template>
  <div id="app">
    <Header></Header>
    <!-- 一级路由在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {getCategoryList} from "./api";
export default {
  name: 'App',

  mounted(){
    //异步获取三级分类列表
    getCategoryList().then(result=>{
      console.log('result',result);
    })
  },

  components: {
    Header,
    Footer
  }
}
</script>


