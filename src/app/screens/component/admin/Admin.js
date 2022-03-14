import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Button, Typography, Table, Modal, Form, Select, Input, Steps } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import { tem1, tem2 } from '../../../../template-mock'
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'

const { Text, Link } = Typography;
const { Step } = Steps;
const temp_columns = [
    {
        title: <Text className="big6-title">รายการ</Text>,
        align: 'center',
    }
];

const Admin = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [form] = Form.useForm();
    // const listTemplate = useSelector(state => state?.main?.[LIST_TEMPLATES])
    const [listTemplate, setListTemplate] = useState([])
    const [columns, setColumns] = useState(temp_columns)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState([])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        layout: "vertical"
    };

    useEffect(() => {
        handleListMaster()
        let ar = []
        ar.push(tem1)
        ar.push(tem2)
        setListTemplate(ar)
    }, [])

    async function handleListMaster() {
        dispatch(await ListTemplateAction({}))
    }

    const handleClickCancel = () => {
        setIsModalAddEditVisible(false);
        setIsModal2(false)
    }

    const newTemplate = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle('เลือกใช้ Template')
    }

    const handleClickEdit = (record) => {
        // setShowSettingPage(true)
        // // console.log('record >> ', record);
        // setData(record)
    }

    const onSubmit = async () => {
        if (form.getFieldValue('template')) {
            let obj = listTemplate.find(template => template.id === form.getFieldValue('template'))
            let components = obj?.components
            let col = []
            let data = {}
            col.push({
                title: 'ลำดับ',
                align: 'center',
                render: (text, record, index) => ((currentPage - 1) * 10) + index + 1
            })
            components.map(component => {
                // console.log(component)                
                let c = {}
                c.title = component.label
                c.align = 'center'
                c.dataIndex = component.key
                data[component.key] = ''
                col.push(c)
            })
            col.push({
                title: 'Action',
                align: 'center',
                fixed: 'right',
                render: (record) =>
                    <div className="text-center">
                        <Button
                            type="primary"
                            className="pre-button"
                            onClick={() => {
                                setIsModal2(true);
                                setAddEditTitle('แผนปฏิบัติการ')
                            }
                            }
                        >
                            <Text className="big6-title">manage</Text>
                            {/* <EditOutlined /> */}
                        </Button>
                        <Button
                            type="primary"
                            className={record?.status ? "pre-button" : "nol-button"}
                            onClick={() =>
                                handleClickEdit(record)
                            }
                        >
                            <Text className="big6-title">ส่งไปแบบรายงาน</Text>
                            {/* <EditOutlined /> */}
                        </Button>
                    </div>
            })
            setColumns(col)
            setDataSource([...dataSource, data])
            handleClickCancel()
        } else {
            form.validateFields()
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination >> ', pagination)
        setCurrentPage(pagination.current)
    };

    // console.log("listTemplate >> ", listTemplate)
    return (
        <>
            <Card title={"Manage Template"} className="rounded" >
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "right" }} >
                        <Button
                            size="large"
                            type="link"
                            onClick={newTemplate}
                            className="ggar-button"
                        >
                            <PlusCircleFilled className="big3-title" />
                        </Button>
                    </Col >
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Table
                            className='table-user'
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered={false}
                            dataSource={dataSource}
                            onChange={handleTableChange}
                            pagination={true}
                            pageSize={10}
                            columns={columns} />
                    </Col>
                </Row >
            </Card>

            <div>
                <Modal
                    className="card-m-tem"
                    closable={true}
                    title={addEditTitle}
                    visible={isModal2}
                    width={"30%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <Form form={form} {...layout} >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Steps progressDot current={1} className="step-dot">
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                </Steps>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='form-login form-user' xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name={"y"} label={"1.ปี"}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} className="row-inquiry-customer">
                            <Col span={24} style={{ textAlign: "center" }}>
                                <Button
                                    className='btn-event btn-color-cancel'
                                    style={{ margin: "0 8px" }}
                                    onClick={() => {
                                        handleClickCancel();
                                    }}
                                    danger
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    className='btn-event btn-color-ok'
                                    type="primary"
                                    danger
                                    htmlType="submit"
                                    onClick={onSubmit}
                                    loading={isLoading}
                                >
                                    ยืนยัน
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>

            <div>
                <Modal
                    className="card-m-tem"
                    closable={true}
                    title={addEditTitle}
                    visible={isModalAddEditVisible}
                    width={"30%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <Form form={form} {...layout} >
                        <Row>
                            <Col className='form-login form-user' xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name={"template"}>
                                    <Select
                                        options={SetOptionsForSelect({ label: 'template_name', value: 'id', data: listTemplate })}
                                        placeholder="-Template ที่พร้อมใช้งาน-"
                                        size="middle"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} className="row-inquiry-customer">
                            <Col span={24} style={{ textAlign: "center" }}>
                                <Button
                                    className='btn-event btn-color-cancel'
                                    style={{ margin: "0 8px" }}
                                    onClick={() => {
                                        handleClickCancel();
                                    }}
                                    danger
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    className='btn-event btn-color-ok'
                                    type="primary"
                                    danger
                                    htmlType="submit"
                                    onClick={onSubmit}
                                    loading={isLoading}
                                >
                                    ยืนยัน
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
export default Admin;