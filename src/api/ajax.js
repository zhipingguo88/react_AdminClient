/* 
    封装的能发ajax请求的函数，向外暴露的本质是axios
    1. 解决post请求携带参数的问题：默认是json，需要转换成urlencode格式
    2. 让请求成功的结果不再是response，而是response.data
    3. 统一处理所有的所有请求异常错误
*/
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
// Add a request interceptor
// 添加请求拦截器：让post请求的请求体格式为urlencoded格式 
// 在真正发请求之前执行
axios.interceptors.request.use(function (config) {
    const {method,data}=config
    if(method.toLowerCase()==='post' && typeof data ==='object'){
        config.data=qs.stringify(data)
    }

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor
// 添加响应拦截器
// 功能：1. 让请求成功的结果不再是response，而是response.data
// 功能：2. 让请求失败的结果 
// 在请求返回之后且在我么指定的请求回调函数之前
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {//统一处理所有的所有请求异常错误
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    message.error('请求错误'+ error.message)
    // 返回一个pending状态的promise，中断promise链
    // return Promise.reject(error);
    return new Promise(()=>{})
  });



export default axios