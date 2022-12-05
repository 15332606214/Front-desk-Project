// 路由器对象
import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routers";

Vue.use(VueRouter)

// 向外暴露路由器对象
export default new VueRouter({
    // 模式
    mode: 'history',//不带#
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})