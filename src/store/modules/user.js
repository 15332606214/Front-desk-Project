/* 
登陆用户数据的vuex子模块
*/

import { getUserTempId } from "@/utils/userabout";
const state = {
    // getUserTempId()  获取临时标识
    userTempId:getUserTempId()
}
const mutations = {}
const actions= {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}