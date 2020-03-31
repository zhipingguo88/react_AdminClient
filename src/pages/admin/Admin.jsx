import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'


const { Footer, Sider, Content } = Layout
export default class Admin extends Component {
  render() {

    //读取保存的user，如果不存在，直接跳转到登录界面

    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user = memoryUtils.user
    if (!user._id) {
      //this.props.history.replace('/login') //这种方式是用在事件回调函数中进行路由跳转, 不能使用render（）中使用
      return <Redirect to="/login" /> //react-router-dom中路由器组件专门提供方法，自动跳转到指定的路由路径
    }

    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ background: 'pink' }}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{textAlign:'center', color:'rgba(0,0,0,0.3)'}}>
            推荐使用谷歌浏览器，可以获得更佳网页操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
