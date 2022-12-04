import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import Pagination from "./components/Pagination";

import "./plugins/swiper";  // 加载swiper配置
import './mock/mockServer'
// 不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

new Vue({
  beforeCreate () {
    // 创建或指定事件总线对象，保存到Vue的原型上
    Vue.prototype.$bus = this
  },

  render: h => h(App),
  router, //注册路由==>所有组件都可以直接访问两个对象：$router与$route
  store   //注册vuex ==> 所有组件都可以直接访问一个对象：$store
}).$mount('#app')
