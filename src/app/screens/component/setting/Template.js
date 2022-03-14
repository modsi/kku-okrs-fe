import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, PageHeader, Input } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import ConfigTemplate from './ConfigTemplate'
import { tem1, tem2 } from '../../../../template-mock'
import SettingTemplate from './SettingTemplate'
import { ListTypeTemplateAction, LIST_TYPE_TEPM } from '../../../redux/actions/ListMasterAction'
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'

const { Text, Link } = Typography;
const Template = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [showSettingPage, setShowSettingPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // const [dataSource, setDataSource] = useState([])
    const [data, setData] = useState([])
    const listType = useSelector(state => state?.main?.[LIST_TYPE_TEPM])
    const dataSource = useSelector(state => state?.main?.[LIST_TEMPLATES])


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
            dataIndex: 'template_name',
            align: 'left',
            width: 80,
            render: (_, record) => record?.template_name
        },
        {
            title: 'Type',
            dataIndex: 'type',
            align: 'left',
            width: 80,
            render: (_, record) => record?.type_name
        },
        {
            title: 'Created By',
            dataIndex: 'createname',
            align: 'left',
            width: 80,
            render: (_, record) => record?.createname
        },
        {
            title: 'Update By',
            dataIndex: 'updatename',
            align: 'left',
            width: 80,
            render: (_, record) => record?.updatename !== "" ? record?.updatename : '-'
        },
        {
            title: 'Last Update',
            dataIndex: 'updatedate',
            align: 'center',
            width: 80,
            render: (_, record) => record?.updatedate
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            width: 80,
            // render: (_, record) => record?.status === 1 ? 'พร้อมใช้งาน' : 'ยังไม่พร้อมใช้งาน',
            render: (_, record) => {
                return {
                    props: {
                        style: { color: record?.status === 1 ? 'green' : 'red' }
                    },
                    children: record?.status === 1 ? 'พร้อมใช้งาน' : 'ยังไม่พร้อมใช้งาน'
                };
            }
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (record) =>
                // <div className="text-center">
                //     <Button
                //         type="link"
                //         className="text-danger"
                //         onClick={() =>
                //             handleClickEdit(record)
                //         }
                //     >
                //         <FileSearchOutlined />
                //     </Button>
                // </div>
                <div className="text-center">
                    <Button
                        type="link"
                        className="text-danger btn-view"
                        onClick={() =>
                            handleClickEdit(record)
                        }
                    >
                        <Text>view</Text>
                        {/* <EditOutlined /> */}
                    </Button>
                </div>
        },
    ];

    const handleClickEdit = (record) => {
        setShowSettingPage(true)
        // console.log('record >> ', record);
        setData(record)
    }

    const handleTableChange = (pagination, filters, sorter) => {
        // console.log('pagination >> ', pagination)
        setCurrentPage(pagination.current)
    };

    useEffect(() => {
        handleListMaster()
        listTemplate({ str: "" })
    }, [])

    async function handleListMaster() {
        dispatch(await ListTypeTemplateAction())
    }

    async function listTemplate(data) {
        dispatch(await ListTemplateAction(data))
    }

    console.log(dataSource)
    return (
        <>
            {showConfigPage ? (
                <>
                    <PageHeader
                        style={{ padding: "0px" }}
                        onBack={() => setShowConfigPage(false)}
                        title="Back"
                    />
                    <ConfigTemplate />
                </>
            ) : showSettingPage ? (
                <>
                    <PageHeader
                        style={{ padding: "0px" }}
                        onBack={() => setShowSettingPage(false)}
                        title="Back"
                    />
                    <SettingTemplate data={data} />
                </>
            ) : (
                <div className='container-user'>
                    <Card title={"List Template"} className="rounded container-card">
                        <Row gutter={24} className="row-inquiry-customer">
                            <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ textAlign: "left" }} >
                                <Button
                                    className="nol-button custom-btn"
                                    onClick={() => setShowConfigPage(true)}
                                    loading={isLoading}
                                >
                                    <Text className="big6-title custom-add-user"><PlusOutlined /> Add Template</Text>
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <div style={{ float: 'right' }}>
                                    <Row>
                                        <Col>
                                            <Input className='form-search' placeholder="Search by template name" size="small" />
                                        </Col>
                                        {/* <Col>
                                            <Button style={{border: "0px", background: "#F3F6F9", borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
                                            <SearchOutlined />
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </div>
                            </Col>
                            <Col span={24} style={{ textAlign: "center" }}>
                                <Table
                                    className='table-user'
                                    rowKey={(record, index) => record.key}
                                    style={{ whiteSpace: 'pre' }}
                                    loading={isLoading}
                                    scroll={{ x: 'max-content' }}
                                    size="small"
                                    bordered={false}
                                    dataSource={dataSource?.result}
                                    onChange={handleTableChange}
                                    pagination={true}
                                    pageSize={10}
                                    columns={columns} />
                            </Col>
                        </Row >
                    </Card >
                </div>
            )}
        </>
    )
}
export default Template;