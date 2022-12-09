/* 
登陆用户数据的vuex子模块
*/

import { reqUserLogin, reqUserRegister } from "@/api";
import { getUserTempId, getToken, setToken, removeToken } from "@/utils/userabout";
const state = {
    // getUserTempId()  获取临时标识
    userTempId: getUserTempId(),
    token: getToken(),//先从localStorage中获取token
}
const mutations = {
    RECEIVE_TOKEN(state, token) {
        state.token = token
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