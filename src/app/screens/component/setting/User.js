import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, Table, Button, Modal, Form, Row, Col, Input, Radio, Select, Typography, Switch } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { ListInstitutionsAction, ListRolesAction, LIST_INSTITUTIONS, LIST_ROLES } from '../../../redux/actions/ListMasterAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import CustomizeTable from '../../items/CustomizeTable'
import { ConfirmModalEditText, SuccessModal, ErrorModalMassageHtml } from "../../items/Modal";
import { SaveAccAction, listAccountAction, LLIST_ACCOUNT, UpdateAccAction } from '../../../redux/actions/UserAction'
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';

const { Option } = Select;
const { Text, Link } = Typography;
const User = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const listInstitutions = useSelector(state => state?.main?.[LIST_INSTITUTIONS])
    const dataSource = useSelector(state => state?.main?.[LLIST_ACCOUNT])
    const listRoles = useSelector(state => state?.main?.[LIST_ROLES])
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState(null);
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "vertical"
    };

    // useEffect(() => {
    //     console.log(dataSource)
    // }, [dataSource])


    useEffect(() => {
        handleListMaster()
        listAccount({ str: "" })
    }, [])

    async function handleListMaster() {
        dispatch(await ListInstitutionsAction())
        dispatch(await ListRolesAction())
    }

    async function listAccount(data) {
        dispatch(await listAccountAction(data))
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
            title: 'Full Name',
            dataIndex: 'name',
            align: 'left',
            width: 80,
            render: (_, record) => record?.full_name
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'left',
            width: 80,
            render: (_, record) => record?.email
        },
        {
            title: 'Username',
            dataIndex: 'username',
            align: 'left',
            width: 80,
            render: (_, record) => record?.username
        },
        {
            title: 'Role',
            dataIndex: 'role',
            align: 'left',
            width: 80,
            render: (_, record) => record?.role?.role_name
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            width: 80,
            render: (_, record) => record?.status === "1" ? 'active' : 'disabled',
        },
        {
            title: 'Last Active',
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
        setId(record.id)
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

    const newUser = async () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle('Registration');
    }

    const conditionSave = () => {
        return {
            title: "Confirm",
            content: "Are you sure you want to save ?"
        }
    }

    const onSubmit = async () => {
        console.log(form.getFieldValue())
        if (form.getFieldValue('fullName') && form.getFieldValue('email') && form.getFieldValue('role') && form.getFieldValue('username')) {
            ConfirmModalEditText(onFinish, conditionSave());
        } else {
            form.validateFields()
        }
    }

    async function onFinish() {
        setIsLoading(true)
        let data = {}
        data.username = form.getFieldValue('username')
        data.password = "1234"
        data.email = form.getFieldValue('email')
        data.full_name = form.getFieldValue('fullName')
        data.role_id = form.getFieldValue('role')
        data.status = form.getFieldValue('status') || form.getFieldValue('status') === undefined || form.getFieldValue('status') === null ? 1 : 0
        data.group = form.getFieldValue('group')
        console.log('onFinish >> data is ', data)
        let res = {}
        if(id){
            data.id = id
            data.updated_datetime = moment().format(DATE_FULL)
            res = await UpdateAccAction(data)
        }else {
          res = await SaveAccAction(data)
        }
        if (res.error === null) {
            handleClickCancel();
            listAccount({ str: "" })
            SuccessModal("Success");
        } else {
            ErrorModalMassageHtml(res.error.message);
        }
        setIsLoading(false)
    }

    const handleClickCancel = () => {
        form.resetFields();
        setId(null)
        setIsModalAddEditVisible(false);
    }

    const setUsername = (e) => {
        console.log('setUsername', e.target.value)
        let value = e.target.value.split("@")
        form.setFieldsValue({
            username: value ? value[0] : null
        });
    }

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination >> ', pagination)
        setCurrentPage(pagination.current)
    };

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
                            bordered={false}
                            dataSource={dataSource?.result?.accounts}
                            onChange={handleTableChange}
                            pagination={true}
                            pageSize={10}
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
                                            label={"Full Name"} name={"fullName"}
                                            rules={[{ required: true, message: 'Full Name is required!' }]}>
                                            <Input style={{ textAlign: "left" }} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Email is required!' }]}
                                            label={"Email"} name={"email"}  >
                                            <Input style={{ textAlign: "left" }} size="small" onChange={setUsername} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Role"} name={"role"}
                                            rules={[{ required: true, message: 'Role is required!' }]}>
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
                                            label={"Username"} name={"username"}
                                            rules={[{ required: true, message: 'Username is required!' }]}>
                                            <Input style={{ textAlign: "left" }} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={4} xl={2}>
                                        <Form.Item
                                            label={"Status"} name={"status"} valuePropName="checked" >
                                            <Switch defaultChecked />
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