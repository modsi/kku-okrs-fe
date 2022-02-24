import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, Table, Button, Modal, Form, Row, Col, Input, Radio, Select, Typography, Switch } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { ListInstitutionsAction, ListRolesAction, LIST_INSTITUTIONS, LIST_ROLES } from '../../../redux/actions/ListMasterAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'

const { Option } = Select;
const { Text, Link } = Typography;
const User = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const listInstitutions = useSelector(state => state?.main?.[LIST_INSTITUTIONS])
    const listRoles = useSelector(state => state?.main?.[LIST_ROLES])
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "vertical"
    };

    useEffect(() => {
        handleListMaster()
    }, [])

    async function handleListMaster() {
        dispatch(await ListInstitutionsAction())
        dispatch(await ListRolesAction())
    }

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
        setAddEditTitle('Registration');
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
                            <Text className="big6-title"><PlusOutlined /> Add User</Text>
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
                    width={"70%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <>
                        <Form form={form} {...layout} >
                            <Card loading={isLoading}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Full Name"} name={"fullName"}  >
                                            <Input style={{ textAlign: "left" }} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            rules={[{ type: 'email', }]}
                                            label={"Email"} name={"email"}  >
                                            <Input style={{ textAlign: "left" }}  size="small" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Role"} name={"role"}  >
                                            <Select
                                                options={SetOptionsForSelect({ label: 'role_name', value: 'id', data: listRoles })}
                                                placeholder="Please select"
                                                // onChange={handleChange}
                                                size="middle"
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={10}>
                                        <Form.Item
                                            label={"Username"} name={"username"}  >
                                            <Input style={{ textAlign: "left" }} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={4} xl={2}>
                                        <Form.Item
                                            label={"Status"} name={"status"}  >
                                            {/* <Radio.Group
                                                name="radiogroup"
                                                initialValues={1}
                                            >
                                                <Radio value={1}>ใช้งาน</Radio>
                                                <Radio value={2}>ปิดการใช้งาน</Radio>
                                            </Radio.Group> */}

                                            <Switch />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            wrapperCol={{ span: 23 }}
                                            label={"Group"} name={"group"}  >
                                            <Select
                                                options={SetOptionsForSelect({ label: 'groupname', value: 'groupid', data: listInstitutions })}
                                                mode="multiple"
                                                placeholder="Please select"
                                                // onChange={handleChange}
                                                size="large"
                                                style={{ width: '100%' }}
                                            />
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