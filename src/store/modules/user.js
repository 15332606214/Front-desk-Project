/* 
登陆用户数据的vuex子模块
*/

import { reqUserLogin, reqUserRegister, reqUserInfo, reqUserLogout } from "@/api";
import { getUserTempId, getToken, setToken, removeToken } from "@/utils/userabout";


// 页面刷新或者项目重启，之前state当中所有的数据全部销毁重新初始化

const state = {
    // getUserTempId()  获取临时标识
    userTempId: getUserTempId(),
    token: getToken(),//先从localStorage中获取token
    userInfo: {}
}
const mutations = {
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RESET_USERINFO(state){
        // 包含用户信息和token
        state.userInfo={}
        state.token=''
    }
}
const actions = {
    async userRegister({ commit }, userInfo) {
        const result = await reqUserRegister(userInfo)
        if (result.code === 200) {
            c
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async userLogin({ commit }, userInfo) {
        const result = await reqUserLogin(userInfo)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit(' RECEIVE_USERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    
    async resetUserInfo({commit}){
         removeToken() //调用函数清空localStrage当中的token信息
         commit('RESET_USERINFO')
    },

    async userLogout({commit}){
        const result = await reqUserLogout()
        if(result.code===200){
            removeToken() //调用函数清空localStrage当中的token信息
            commit('RESET_USERINFO')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}