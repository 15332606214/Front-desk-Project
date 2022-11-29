/* 
包含应用的所有接口的接口请求函数
    函数内部调用ajax函数发送请求
    函数返回的是promise对象 
*/
import ajax from "./ajax";

// 首页三级分类 地址:/probuct/getBaseCategoryList GET 无参
export function getCategoryList(){
    // return ajax.get('/probuct/getBaseCategoryList')
    // return ajax('/probuct/getBaseCategoryList') //发不带参数的get请求
    return ajax({
        url:'/probuct/getBaseCategoryList',
        method:'get'
    })
}