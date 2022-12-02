/* 
搜索页相关数据的vuex子模块
*/

import { reqSearch } from "@/api";

const state = {
    productList:{} //搜索出的商品相关数据
}

const mutations = {
    // 接受保存商品列表相关数据
    RECEIVE_PRODUCT_LIST (state,productList) {
        state.productList = productList
    }
}

const actions = {
    // 根据指定的搜索条件，异步获取商品列表的action
    async getProductList ({commit},searchParams){
       
        // 1.ajax请求，获取数据
        const result = await reqSearch(searchParams)
        // 2.如果请求成功，得到的数据提交给mutation
        if(result.code===200) {
            // const productList = result.data
            commit('RECEIVE_PRODUCT_LIST',result.data)
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