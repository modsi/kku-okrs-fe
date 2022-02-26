import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, PageHeader } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import ConfigTemplate from './ConfigTemplate'

const { Text, Link } = Typography;
const Template = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const routeChange = () => {
        let path = '/admin/addTempalte';
        navigate(path);
    }

    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            align: 'center',
            width: 50,
            render: (text, record, index) => ((currentPage - 1) * 10) + index + 1
        },
        {
            title: 'Template Name',
            dataIndex: 'name',
            align: 'left',
            width: 80,
            render: (_, record) => record?.full_name
        },
        {
            title: 'Type',
            dataIndex: 'email',
            align: 'left',
            width: 80,
            render: (_, record) => record?.email
        },
        {
            title: 'Created By',
            dataIndex: 'username',
            align: 'left',
            width: 80,
            render: (_, record) => record?.username
        },
        {
            title: 'Update By',
            dataIndex: 'role',
            align: 'left',
            width: 80,
            render: (_, record) => record?.role?.role_name
        },
        {
            title: 'Last Update',
            dataIndex: 'status',
            align: 'center',
            width: 80,
            render: (_, record) => record?.status === "1" ? 'active' : 'disabled',
        },
        {
            title: 'Status',
            dataIndex: 'lastLogin',
            align: 'center',
            width: 80,
            render: (_, record) => record?.last_login !== null ? moment(record.last_login).format(DATE_FULL) : null
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (record) =>
                <div className="text-center">
                    <Button
                        type="link"
                        className="text-danger"
                        onClick={() =>
                            handleClickEdit(record)
                        }
                    >
                        <EditOutlined />
                    </Button>
                </div>

        },
    ];

    const handleClickEdit = (record) => {
        console.log('record >> ', record);
        setIsModalAddEditVisible(true);
        setAddEditTitle('User Management');
        let ag = []
        record?.account_groups?.map((item) => {
            ag.push(item.group_id)
        })
        form.setFieldsValue({
            fullName: record?.full_name,
            username: record?.username,
            email: record?.email,
            role: record?.role?.id,
            status: record?.status === "1" ? true : false,
            group: ag
        });

    }

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination >> ', pagination)
        setCurrentPage(pagination.current)
    };    

    return (
        <>
            {showConfigPage ? (
                <>
                    <PageHeader
                    style={{ padding: "0px"}}
                        onBack={() => setShowConfigPage(false)}
                        title="Back"
                    />
                    <ConfigTemplate />
                </>
            ) : (
                <Card title={"List Template"} className="rounded" >
                    <Row gutter={24} className="row-inquiry-customer">
                        <Col span={24} style={{ textAlign: "left" }} >
                            <Button
                                className="nol-button"
                                onClick={() => setShowConfigPage(true)}
                                loading={isLoading}
                            >
                                <Text className="big6-title"><PlusOutlined /> Add Template</Text>
                            </Button>
                        </Col >
                        <Col span={24} style={{ textAlign: "center" }}>
                            <Table
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                bordered
                                // dataSource={dataSource?.result?.accounts}
                                onChange={handleTableChange}
                                pagination={true}
                                pageSize={10}
                                columns={columns} />
                        </Col>
                    </Row >
                </Card >
            )}
        </>
    )
}
export default Template;