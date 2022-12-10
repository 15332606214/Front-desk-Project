// 路由器对象
import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routers";
import store from "@/store";

Vue.use(VueRouter)

// 向外暴露路由器对象
const router = new VueRouter({
    // 模式
    mode: 'history',//不带#
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})


// token校验逻辑
router.beforeEach(async (to, from, next) => {
    // 全局前置导航守卫
    // to代表准备去的地方的路由对象
    // from 从哪个地方来的路由对象
    // next是一个函数
    // next() 代表无条件放行
    // next(false) 代表不放行，停在原地
    // next('/') next({path:'/'}) 代表最终让他去哪

    // token校验
    let token = store.state.user.token
    if (token) {
        // 代表登陆了或之前登陆过
        if (to.path === '/login') {
            // 登陆过了，又要去登录页，直接跳到首页
            next('/')
        } else {
            let hasUserInfo = !!store.state.user.userInfo
            if (hasUserInfo) {
                // 此时代表登陆了，去的不是登录页，用户信息存在
                next()
            } else {
                // 登陆了，但去的不是首页，用户信息不存在  我们根据token发的请求获取获取用户的真实信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    alert('用户的token过期')
                    store.dispatch('action', payload)
                    // 去到之前想去但是没有去的地方，需要和登录逻辑配合使用
                    next('/login?redirect'+to.path)
                }
            }
        }
    }else{
        // 代表用户没登陆或者之前也没登陆过

        // 后期我们需要判断用户是不是去订单相关的页面，如果是就先登录
        next()
    }
})

export default router