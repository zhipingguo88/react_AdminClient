/* 
应用根组件

*/

import React,{Component} from 'react'
import {Button,message} from 'antd'
import {BrowserRouter,HashRouter,Switch,Route} from 'react-router-dom'

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'


export default class App extends Component{
    handleClick=()=>{
        message.success('成功啦！')
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}