import React, { Component } from 'react'
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './login.less'

const Item = Form.Item
export default class login extends Component {
  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登陆</h3>
          <Form onSubmit={this.login} className="login-form">
            <Item>
              <Input prefix={<UserOutlined type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="用户名"/>
            </Item>
            <Item>
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
