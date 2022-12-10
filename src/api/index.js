/* 
包含应用的所有接口的接口请求函数
    函数内部调用ajax函数发送请求
    函数返回的是promise对象 
*/
import ajax from "./ajax";
import mockAjax from "./mockAjax";


// 首页三级分类 地址:/probuct/getBaseCategoryList GET 无参
export function reqCategoryList() {
    // return ajax.get('/probuct/getBaseCategoryList')
    // return ajax('/probuct/getBaseCategoryList') //发不带参数的get请求
    return ajax({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}


// 获取首页广告轮播
export const reqBannerList = () => mockAjax('/banners')


//mock接口函数
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')


// 搜索分页列表  /api/list  post 
export const reqSearch = (searchParams) => ajax.post('/list', searchParams)


// 获取详细数据  /api/list/{ skuId }  get
export const reqDetailInfo = (skuId) => {
    return ajax({
        url: `/item/${skuId}`,
        method: 'get'
    })
}


// 添加购物车(修改购物车的商品数量)     /api/cart/addToCart/{ skuId }/{ skuNum }   post
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return ajax({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}


// 获取购物车列表
export const reqCartList = () => {
    return ajax({
        url: '/cart/cartList',
        method: 'get'
    })
}


// 用户注册
// /api/user/passport/register
// post
export const reqUserRegister = (userInfo) => {
    return ajax({
        url: `/user/passport/register`,
        method: 'post',
        data: userInfo
    })
}


// 用户登录
// /api/user/passport/register
// post
export const reqUserLogin = (userInfo) => {
    return ajax({
        url: `http://gmall-h5-api.atguigu.cn/api/user/passport/login`,
        method: 'post',
        data: userInfo
    })
}

// 根据token获取用户信息
// /api/user/passport/auth/getUserInfo
// get
export const reqUserInfo = () =>{
    return ajax({
        url:'/user/passport/auth/getUserInfo'
    })
}

// 退出登录
// /api/user/passport/logout
// get
export const reqUserLogout=()=>{
    return ajax({
        url:'/user/passport/logout',
        method:'get'
    })
}