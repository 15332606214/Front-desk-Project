import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";

// 不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router, //注册路由==>所有组件都可以直接访问两个对象：$router与$route
  store   //注册vuex ==> 所有组件都可以直接访问一个对象：$store
}).$mount('#app')
