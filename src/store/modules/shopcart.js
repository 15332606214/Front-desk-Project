import { reqAddOrUpdateCart, reqCartList } from "@/api";
const state = {
    shopCartList: []
}

const mutations = {
    RECEIVESHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}

const actions = {
    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateCart(skuId, skuNum)

        // 让Promise有成功也有失败
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code === 200) {
            commit('RECEIVESHOPCARTLIST', result.data)
        }
    }
}

const getters = {}


export default {
    state,
    mutations,
    actions,
    getters,
}