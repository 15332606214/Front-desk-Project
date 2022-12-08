// axios二次封装


import axios from "axios";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

import store from "@/store";

// 1，配置基础的路径和超时
// service是一个能发任意ajax请求的函数，可以作为对象使用
const service = axios.create({
    baseURL:'http://gmall-h5-api.atguigu.cn/api',//基础路径
    timeout:20000,//超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config)=>{
    // 2，显示请求进度条
    NProgress.start()

    let userTempId = store.state.user.userTempId
    if(userTempId){
        config.headers.userTempId = userTempId
    }

    // 必须返回config。后面会根据返回的config，使用xhr对象发送请求
    return config
})

// 添加响应拦截器
service.interceptors.response.use(
    response => {   //请求成功返回的回调
        // 2，隐藏请求进度条
        NProgress.done()

        // 3。成功返回的数据不在是response，而是响应体数据response.data
        return response.data
    },
    error => {      //请求失败返回的回调
        // 2，隐藏请求进度条
        NProgress.done()

        // 4.统一处理请求错误，具体请求也可以选择处理或者不处理
        alert(error.message || '未知的请求错误')

        // throw error
        return Promise.reject(error)
    }
)

export default service