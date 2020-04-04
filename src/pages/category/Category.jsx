import React, { useState, useEffect, useRef } from 'react'
import {
    Card,
    Button,
    Table,
    message,
    Modal,
} from 'antd'

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import CategoryForm from './add-update-form'
/* 
    分页管理
*/

export default function Category(props) {

    const [categorys, setCategorys] = useState([])
    const [loading, setLoading] = useState(false)
    const [showStatus, setShowStatus] = useState(0)//0：不显示，1：显示添加，2:显示修改

    const columnsRef = useRef(
        initColumns()
    )
    const formRef = useRef(null)
    const categoryRef = useRef({})

    useEffect(() => {
        getCategorys()
    }, [])

    function initColumns() {
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => <LinkButton onClick={() => {
                    categoryRef.current = category//保存当前分类，其他地方都可以读取到
                    setShowStatus(2)
                }}>修改分类</LinkButton>
            },
        ]
        return columns
    }
    /* 
    异步获取分类列表显示
    */
    async function getCategorys() {
        // 显示loading
        setLoading(true)
        // 发异步ajax请求
        const result = await reqCategorys()
        setLoading(false)
        // 取出分类列表
        const categorys = result.data
        if (result.status === 0) {//成功了
            // 更新category状态数据
            setCategorys(categorys)
        } else {
            message.error('获取分类列表失败')
        }
    }
    /* 
    点击确定的回调：去添加/修改分类
    */
    function handleOk() {
        //进行表单验证

        //验证通过后，得到输入数据
        formRef.current.validateFields(async function (err, values) {
            if (!err) {
                
                const { categoryName } = values
                let result
                if (showStatus === 1) {
                    result = await reqAddCategory(categoryName)
                } else {
                    const categoryId = categoryRef.current._id
                    result = await reqUpdateCategory({ categoryId, categoryName })
                }
                setShowStatus(0)
                formRef.current.resetFields()//重置输入数据（变成初始值）
                //根据响应结果，做不同处理
                const action = showStatus === 1 ? '添加' : '修改'
                if (result.status === 0) {
                    getCategorys()
                    // console.log(result.data)
                    message.success(action + '分类成功')
                } else {
                    message.error(action + '分类失败')
                }
                
            }
        })
        //添加分类请求



    }

    /* 
    点击取消的回调
    */
    function handleCancel() {
        formRef.current.resetFields()
        setShowStatus(0)
    }


    // 右上角结构
    const extra = (
        <Button type='primary' onClick={() => setShowStatus(1)}>
            <PlusOutlined />
            添加
        </Button>
    )

    const category = categoryRef.current

    return (

        <Card extra={extra}>
            <Table
                columns={columnsRef.current}
                dataSource={categorys}
                rowKey='_id'
                bordered
                pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                loading={loading}
            />
            <Modal
                title={showStatus === 1 ? '添加分类' : '修改分类'}
                visible={showStatus !== 0}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* 将子组件传递过来的form对象保存到当前父组件 */}
                <CategoryForm setForm={(form) => { formRef.current = form }} categoryName={category.name} />
            </Modal>
        </Card>
    )
}


