import React, { Component } from 'react'
import {Form,Input,Button,message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

import {reqLogin} from '../../api/index.js'
import logo from '../../assets/images/logo.png'
import './login.less'

const Item = Form.Item

export default class login extends Component {
  onFinish = async values => {
    const result = await reqLogin(values.username,values.password)
    // alert(`发送ajax请求,username=${values.username},password=${values.password}`)
    if (result.status===0){
      //将user信息储存到local中,注意这里localStorage.item（）中第二个参数必须是string类型的，如果要储存json对象需要stringify方法
      const user = result.data
      // localStorage.setItem('user_key',JSON.stringify(user))
      storageUtils.saveUser(user)
      // 保存在内存中
      memoryUtils.user=user
      // 跳转到管理界面
      message.success('登陆成功')
      this.props.history.replace('/')
    }else{
      message.error(result.msg)
    }
  }
  /* 
      对密码进行自定义认证，(rule, value) => Promise，注意这里返回的是一个Promise对象
  */
  
  validatePwd = ( _ , value) =>{
    value=value.trim()
    if(!value){
      return Promise.reject('密码必须输入')
    }else if(value.length<4){
      return Promise.reject('密码不能小于4位')
    }else if(value.length>12){
      return Promise.reject('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/){
      return Promise.reject('密码必须为英文数字和下划线的组合')
    }else{
      return Promise.resolve()
    }
  }
  render() {

    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user = memoryUtils.user
    if(user._id){
      //this.props.history.replace('/login') //这种方式是用在事件回调函数中进行路由跳转, 不能使用render（）中使用
      return <Redirect to="/"/> //react-router-dom中路由器组件专门提供方法，自动跳转到指定的路由路径
    }

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登陆</h3>

          <Form name='user'  initialValues={{remember: true}} className="login-form" onFinish={this.onFinish}>
            <Item name='username' rules={[
              {required:true,message:'用户名是必须的'},
              {min:4,message:'用户名不能小于4位'},
              {max:12,message:'用户名不能大于12位'},
              {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名是必须是英文数字或下划线'},
              ]}>
              <Input prefix={<UserOutlined type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="用户名"/>
            </Item>
            <Item name='password' rules={[
              {validator:this.validatePwd},
              ]}>
              <Input prefix={<LockOutlined type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     type="password" placeholder="密码"/>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>

    );
  }
}


/* 
用户名/密码的合法性要求
  1)  必须输入
  2） 必须大于等于4位
  3） 必须小于等于12位
  4） 必须是英文、数字或者下划线组成

*/
/* 
组件：组件类，本质是一个构造函数
组件对象：组件类的实例，也就是构造函数的实例
*/
