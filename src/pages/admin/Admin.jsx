import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component {
  render() {

    //读取保存的user，如果不存在，直接跳转到登录界面

    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user =memoryUtils.user
    if(!user._id){
      //this.props.history.replace('/login') //这种方式是用在事件回调函数中进行路由跳转, 不能使用render（）中使用
      return <Redirect to="/login"/> //react-router-dom中路由器组件专门提供方法，自动跳转到指定的路由路径
    }

    return (
      <div>
        hello, {user.username}
      </div>
    );
  }
}
