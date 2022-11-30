/* 
首页相关数据的vuex子模块
*/
import { reqCategoryList } from "@/api";

const state = {
    categoryList:[]
}
const mutations = {
    // 接受保持分类列表
    RECEIVE_CATEGORY_LIST(state,categoryList) {
        state.categoryList = categoryList.splice(0,16)
    }
}
const actions = {
    // 获取三级分类列表的异步action
    async getCategoryList({commit}){
        // 发异步ajax请求（调用接口请求函数）
        const result = await reqCategoryList()
        // 如果请求成功，得到的数据提交给mutation
        if(result.code==200) {
            const categoryList = result.data
            commit('RECEIVE_CATEGORY_LIST',categoryList)
        }
    }
}
const getters = {
    
}
export default {
    state,
    mutations,
    actions,
    getters
}