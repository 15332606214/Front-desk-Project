/* 
vuex核心管理对象store => 仓库
 */
import Vue from "vue";
import Vuex from "vuex"

/* 
收集所有vuex子模块
*/
import home from "./modules/home";
import user from "./modules/user";
import search from "./modules/search";
Vue.use(Vuex)


const mutations = {
    
}
const actions = {
    
}
const getters = {
    
}
// 向外暴露store对象
export default new Vuex.Store({
        mutations,
        actions,
        getters,
        modules:{
            home,
            user,
            search
        }
    })

/* 
vuex多模块编程的总状态
*/