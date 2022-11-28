import Vue from 'vue'
import App from './App.vue'
import router from "./router";

// 不显示非生产环境打包的提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router //注册路由==>所有组件都可以直接访问两个对象：$router与$route
}).$mount('#app')
