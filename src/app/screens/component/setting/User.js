import React, { useEffect, useState, useMemo } from 'react';
import { Card, Table, Button, Modal, Form, Row, Col, Input, Radio, Select, Typography } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const User = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18, align: "left" },
        layout: "horizontal"
    };

    const dataSource = [
        {
            no: 1,
            key: '1',
            name: 'Mike',
            lastName: 'App',
            username: 'asdd',
            role: 'User',
            status: 'Active',
            lastLogin: '15 minute ago'
        },
        {
            no: 2,
            key: '2',
            name: 'John',
            lastName: 'Xoui',
            username: 'ghjk',
            role: 'Admin',
            status: 'Active',
            lastLogin: '35 minute ago'
        },
    ];

    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 50,
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 80,
            render: (_, record) => record?.name + ' ' + record.lastName
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: 80,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            width: 80,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            width: 80,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 80,
        },
        {
            title: 'Last Active',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            align: 'center',
            width: 80,
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 100,
            dataIndex: '',
            key: 'x',
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
        setAddEditTitle('แก้ไขผู้ใช้งาน');
        form.setFieldsValue({
            name: record?.name,
            lastName: record?.lastName,
            username: record?.username,
            role: record?.role
        });
    }

    const newUser = async () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle('เพิ่มผู้ใช้งาน');
    }

    const onSubmit = async () => {
        handleClickCancel()
    }

    const handleClickCancel = () => {
        form.resetFields();
        setIsModalAddEditVisible(false);
    }

    const statusOrder = [
        {
            value: "Admin",
            label: "Admin",
        },
        {
            value: "User",
            label: "User",
        },
    ];

    return (
        <>
            <Card title={"User"} className="rounded" >
                <Row gutter={24} className="row-inquiry-customer">
                    <Col span={24} style={{ textAlign: "left" }}>
                        <Button
                            className="nol-button"
                            onClick={newUser}
                            loading={isLoading}
                        >
                            <Text className="big6-title"><PlusOutlined className="big6-title" style={{ color: 'hotpink' }}/> Add User</Text>
                        </Button>
                    </Col>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered
                            dataSource={dataSource}
                            columns={columns} />
                    </Col>
                </Row>
            </Card>

            <div>
                <Modal
                    closable={true}
                    title={addEditTitle}
                    visible={isModalAddEditVisible}
                    width={"30%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <>
                        <Form form={form} {...layout} >
                            <Card loading={isLoading}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"ชื่อ"} name={"name"}  >
                                            <Input style={{ textAlign: "left" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"นามสกุล"} name={"lastName"}  >
                                            <Input style={{ textAlign: "left" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"ชื่อผู้ใช้งาน"} name={"username"}  >
                                            <Input style={{ textAlign: "left" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"อีเมล"} name={"email"}  >
                                            <Input style={{ textAlign: "left" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"เบอร์โทร"} name={"tel"}  >
                                            <Input style={{ textAlign: "left" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"บทบาท/กลุ่ม"} name={"role"}  >
                                            <Select
                                                size="middle"
                                                className="input-longtype select-normaltype"
                                                placeholder={"-Please select-"}
                                                options={statusOrder}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"สถานะ"} name={"status"}  >
                                            <Radio.Group
                                                name="radiogroup"
                                                initialValues={1}
                                            >
                                                <Radio value={1}>ใช้งาน</Radio>
                                                <Radio value={2}>ปิดการใช้งาน</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24} className="row-inquiry-customer">
                                    <Col span={24} style={{ textAlign: "center" }}>
                                        <Button
                                            style={{ margin: "0 8px" }}
                                            onClick={() => {
                                                handleClickCancel();
                                            }}
                                            danger
                                        >
                                            ยกเลิก
                                        </Button>
                                        <Button
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
                            </Card>
                        </Form>
                    </>
                </Modal>
            </div>
        </>

    )
}
export default User;