import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, Table, Button, Modal, Form, Row, Col, Input, Radio, Select, Typography, Switch } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ListInstitutionsAction, ListRolesAction, LIST_INSTITUTIONS, LIST_ROLES } from '../../../redux/actions/ListMasterAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import CustomizeTable from '../../items/CustomizeTable'
import { ConfirmModalEditText, SuccessModal, ErrorModalMassageHtml } from "../../items/Modal";
import { SaveAccAction, listAccountAction, LLIST_ACCOUNT, UpdateAccAction } from '../../../redux/actions/UserAction'
import { historyList } from '../../../mock/data_history';
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';

const { Option } = Select;
const { Text, Link } = Typography;
const History = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const listInstitutions = useSelector(state => state?.main?.[LIST_INSTITUTIONS])
    const dataSource = historyList;
    const listRoles = useSelector(state => state?.main?.[LIST_ROLES])
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState(null);
    const [showGroup, setShowGroup] = useState(false);
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "vertical"
    };

    useEffect(() => {
        console.log(dataSource)
    }, [dataSource])


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
            dataIndex: 'id',
            align: 'center',
            width: 50,
            render: (text, record, index) => ((currentPage - 1) * 10) + index + 1
        },
        {
            title: 'เลขการรับเงิน',
            dataIndex: 'pay_number',
            align: 'left',
            width: 80,
            render: (_, record) => record?.pay_number
        },
        {
            title: 'วันที่รับ',
            dataIndex: 'bldat',
            align: 'left',
            width: 80,
            render: (_, record) => record?.bldat
        },
        {
            title: 'เลขที่หนังสือ อว',
            dataIndex: 'book_number',
            align: 'left',
            width: 80,
            render: (_, record) => record?.book_number
        },
        {
            title: 'ชื่อโครงการ',
            dataIndex: 'project_name',
            align: 'left',
            width: 80,
            render: (_, record) => record?.project_name
        },
        {
            title: 'ชื่อตัวชี้วัด',
            dataIndex: 'indicator_name',
            align: 'center',
            width: 80,
            render: (_, record) => record?.indicator_name,
        },
        {
            title: 'เป้าหมาย',
            dataIndex: 'target',
            align: 'center',
            width: 80,
            render: (_, record) => record?.target,
        },
        {
            title: 'ความสำเร็จ',
            dataIndex: 'success',
            align: 'center',
            width: 80,
            render: (_, record) => record?.success === "1" ? 'success' : 'Not success',
        },
        {
            title: 'จำนวนเงินขออนุมัติ',
            dataIndex: 'approve_amount',
            align: 'center',
            width: 80,
            render: (_, record) => record?.approve_amount,
        },
        {
            title: 'เลขที่คุมยอด',
            dataIndex: 'control_amount',
            align: 'center',
            width: 80,
            render: (_, record) => record?.control_amount,
        },
        {
            title: 'เจ้าของเรื่อง',
            dataIndex: 'subject',
            align: 'center',
            width: 80,
            render: (_, record) => record?.subject,
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            align: 'left',
            width: 80,
            render: (_, record) => record?.status
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
        if (id) {
            data.id = id
            data.updated_datetime = moment().format(DATE_FULL)
            res = await UpdateAccAction(data)
        } else {
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
        <div className='container-user'>
            <Card title={"Data History"} className="rounded container-card" >
                <Row gutter={24} className="row-inquiry-customer">
                    <Col span={24} style={{ textAlign: "left", marginBottom: '5px' }}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <div style={{ float: 'right' }}>
                                    <Row>
                                        <Col className='from-search'>
                                            <Form.Item
                                                // label={"Role"} name={"role"}
                                                rules={[{ required: true, message: 'Role is required!' }]}>
                                                <Select
                                                    // options={SetOptionsForSelect({ label: 'role_name', value: 'id', data: listRoles })}
                                                    placeholder="กลุ่มงาน"
                                                    size="middle"
                                                    style={{ width: '350px' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className='from-search'>
                                            <Form.Item
                                                // label={"Role"} name={"role"}
                                                rules={[{ required: true, message: 'Role is required!' }]}>
                                                <Select
                                                    // options={SetOptionsForSelect({ label: 'role_name', value: 'id', data: listRoles })}
                                                    placeholder="ปีงบประมาณ"
                                                    size="middle"
                                                    style={{ width: '200px' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className='from-search'>
                                            <Form.Item
                                                // label={"Role"} name={"role"}
                                                rules={[{ required: true, message: 'Role is required!' }]}>
                                                <Select
                                                    // options={SetOptionsForSelect({ label: 'role_name', value: 'id', data: listRoles })}
                                                    placeholder="สถานะ"
                                                    size="middle"
                                                    style={{ width: '150px' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                        </Row>
                    </Col>
                    <Col span={24} >
                        <div style={{ textAlign: "center" }}>
                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                bordered={false}
                                dataSource={dataSource?.result?.history}
                                onChange={handleTableChange}
                                pagination={true}
                                pageSize={10}
                                columns={columns} />
                        </div>

                        {/* <div style={{}}>
                            Show 1 to 6 of 30 entries
                        </div> */}
                    </Col>
                </Row>
            </Card>
        </div>

    )
}
export default History;