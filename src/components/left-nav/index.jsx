import React, { Component } from 'react'
import { Link , withRouter} from 'react-router-dom'
import { Menu } from 'antd'
import  * as Icon from '@ant-design/icons'



import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'
/* 
    左侧导航组件
*/
const { SubMenu } = Menu
class LeftNav extends Component {
    /* 
        根据指定menu数据数组生成<Item>和<SubMenu>的数组
        reduce+函数递归实现多级菜单
    */
    getMenuNodes2 = (menuList) => {
        //请求路径
        const path=this.props.location.pathname

        return menuList.reduce((pre, item) => {
            // 可能项pre添加<Menu.Item>
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {React.createElement(Icon[item.icon])}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {

                /* 
                判断当前item的key是否是我需要的openKey
                查找Item的所有children中cItem的key，看是否有一个跟请求的path匹配
                */
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openKey = item.key
                }
                pre.push(// 下一级的菜单
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                {React.createElement(Icon[item.icon])}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>)
            }
            // 可能向pre添加<SubMenu>
            return pre
        }, [])
    }

    /* 
        根据指定menu数据数组生成<Item>和<SubMenu>的数组
        map+函数递归实现多级菜单
    */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {React.createElement(Icon[item.icon])} 
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>)
            }
            return (// 下一级的菜单
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            {React.createElement(Icon[item.icon])}
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>)
        })
    }
    /* 
        第一次render（）之后执行一次
        执行异步任务：例如发ajax请求，启动定时器
    */
   componentDidMount(){
    // this.menuNodes = this.getMenuNodes2(menuList)
   }
    /* 
    第一次render（）之前执行一次
    为第一次render（）做一些同步的准备
    */
   UNSAFE_componentWillMount(){
        this.menuNodes = this.getMenuNodes2(menuList)
    }

    render() {
        // this.menuNodes = this.getMenuNodes2(menuList)
        const selectKey = this.props.location.pathname

        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                {/* 
                defaultSelectedKeys:指定默认值后，通过编码更新为其他值，没有更新效果
                selectedKeys：
                */}
                <Menu mode="inline" theme="dark" selectedKeys={[selectKey]} defaultOpenKeys={[this.openKey]}>
                    {
                        this.menuNodes
                    }
                    {/*  <Menu.Item key="/home">
                        <Link to="/home">
                            <HomeOutlined />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="/products"
                        title={
                            <span>
                                <AppstoreOutlined />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <BarsOutlined />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <ToolOutlined />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to="/user">
                            <UserOutlined />
                            <span>用户</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to="/role">
                            <SafetyCertificateOutlined />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="/charts"
                        title={
                            <span>
                                <AreaChartOutlined />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/charts/bar">
                            <Link to="/charts/bar">
                                <BarChartOutlined />
                                <span>柱形图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/line">
                            <Link to="/charts/line">
                                <LineChartOutlined />
                                <span>折线图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie">
                            <Link to="/charts/pie">
                                <PieChartOutlined />
                                <span>饼图</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}

/* 
    向外暴露  使用高阶组件withRouter（）包装非路由组件
    新组件向LeftNav传递3个特别属性：history/location/match
    结果：leftNav可以操作路由相关语法了
*/
export default withRouter(LeftNav)