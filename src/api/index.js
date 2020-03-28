/* 
    包含n个应用中所有请求接口的函数：请求接口函数
*/
import ajax from './ajax'
import qs from 'qs'


const BASE = ''

//请求登录
//采用分别暴露的方式
export const reqLogin = (username,password) => ajax.post(BASE+'/login',{username,password})
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