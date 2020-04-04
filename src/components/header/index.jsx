import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../../components/link-button'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import { QuestionCircleOutlined } from '@ant-design/icons'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'
class Header extends Component {

    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',//图片url
        weather:"",//天气文本
    }

    logout = () => {
        //显示确认提示
        Modal.confirm({
            title: '',
            icon: <QuestionCircleOutlined />,
            content: '确认退出吗?',
            onOk: () => {
                console.log('OK');
                // 确定后，删除储存的用户信息
                // local中的
                storageUtils.removeUser()
                // 内存中的
                memoryUtils.user = {}
                // 跳转到登陆界面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        }) 
    }
    // 根据当前请求的path得到对应的title
    getTitle=()=>{
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
                const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
            }
            
        })
        return title
    }
    /* 
    获取天气信息的函数
    */
    getWeather= async ()=>{
        const {dayPictureUrl,weather} = await reqWeather('吉林')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    componentDidMount(){
        // 启动循环定时器
        this.intervalId=setInterval(() => {
            this.setState({
                currentTime:formateDate(Date.now())
            })
        }, 1000);
        //发jsonp请求获取天气信息显示
        this.getWeather()
    }
    UNSAFE_componentWillMount(){
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime} = this.state

        const user = memoryUtils.user
        // 得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username}&nbsp;&nbsp;
                    {/* 组件的标签体作为标签的children属性传入 */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                    {/* <a href="##" onClick={this.logout}>退出</a> */}
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={this.state.dayPictureUrl} alt="weather" />
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)
