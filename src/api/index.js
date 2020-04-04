/* 
    包含n个应用中所有请求接口的函数：请求接口函数
    函数的返回值都是promise对象
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'


const BASE = ''

//请求登录
//采用分别暴露的方式
export const reqLogin = (username, password) => ajax.post(BASE + '/login', {
    username,
    password
})
/* export const reqLogin=(username,password)=>(
    ajax({
        method:'post',
        url: BASE+'/login',
        data:{
            username,
            password
        }
        // data:qs.stringify({username,password})
    })
) */
/* export function reqLogin(username,password) {
    return ajax({
        method:'post',
        url: BASE+'/login',
        data:{
            username,
            password
        }
        // data:qs.stringify({username,password})
    })
  } */

/* const name='admin'
const pwd = 'admin'

reqLogin(name,pwd).then(response=>{
    const result=response.data
    console.log('请求成功了',result)
}, error=>{
    console.log('请求失败了', error)
}) */


//  发送jsonp请求得到天气信息 
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            if(!err && data.error===0){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error("获取天气信息失败")
            }
        })
    })
}

// 获取分类列表

// export const reqCategorys = () =>ajax.get(BASE+'/manage/category/list')
/* export const reqCategorys =()=>ajax({
    // method:'GET',//默认值为GET，故可以省略
    url:BASE+'/manage/category/list',
}) */
export const reqCategorys=()=>ajax(BASE+'/manage/category/list')

// 添加分类
export const reqAddCategory=(categoryName)=>ajax.post(BASE+'/manage/category/add',{
    categoryName
})
// 修改分类
export const reqUpdateCategory=({categoryId, categoryName})=>ajax.post(BASE+'/manage/category/update',{
    categoryId,
    categoryName
})
