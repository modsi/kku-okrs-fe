import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Steps, Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import { tem1, tem2 } from '../../../../template-mock'
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import { clearStorege, getStorage } from "../../../screens/state/localStorage";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const temp_columns = [
    {
        title: <Text className="big6-title">รายการ</Text>,
        align: 'center',
    }
];

const ManageTemplate = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const listTemplateMaster = useSelector(state => state?.main?.[LIST_TEMPLATES])
    const [listTemplate, setListTemplate] = useState([])
    const [columns, setColumns] = useState(temp_columns)
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState([])
    const [listField, setListField] = useState([]);
    const [profile, setProfile] = useState({})
    const [listComponent, setListComponent] = useState([]);

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        layout: "vertical"
    };

    useEffect(() => {
        handleListMaster()
        let p = getStorage('profile')
        setProfile(p)
    }, [])

    useEffect(() => {
        if (listTemplateMaster) {
            let list = listTemplateMaster.result?.filter(l => l.status === "1");
            setListTemplate(list)
        }
    }, [listTemplateMaster])

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

    const handleClickEdit = () => {
        let obj = listTemplate.find(template => template.id === form.getFieldValue('template'))
        console.log("handleClickEdit", obj, profile)
        let l = obj?.component?.filter(i => profile.role_id === '1' ? i.permission === 3 || i.permission === 4 : i.permission === parseInt(profile.role_id))
        setListComponent(l)
        setLayoutTemplate(l)
        setIsModal2(true);
        setAddEditTitle(profile?.role?.role_name)
    }

    const setLayoutTemplate = (listComponent) => {
        console.log('start setLayoutTemplate', listComponent)
        let listField = []
        listComponent?.sort((a, b) => (a.index > b.index) ? 1 : -1)
        listComponent?.map((currentItem) => {
            let field = (
                <>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                        {currentItem.type === 'title' ?
                            (<Text style={currentItem.isSubTitle ? { paddingLeft: '50px' } : {}}>{currentItem?.label}</Text>)
                            : (<Form.Item
                                className="template-text"
                                labelAlign='left'
                                labelWrap='true'
                                layout={currentItem.labelPosition ?? 'vertical'}
                                label={currentItem.label}
                                name={currentItem.key}
                            // rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
                            >
                                {currentItem.type === 'textArea' ?
                                    (<Input.TextArea showCount maxLength={currentItem.maxLength} />)
                                    : currentItem.type === 'inputNumber' ?
                                        (<InputNumber min={currentItem.min} max={currentItem.max} />)
                                        : currentItem.type === 'checkbox' ?
                                            (<Checkbox.Group options={currentItem.options} />)
                                            : currentItem.type === 'select' ?
                                                (<Select
                                                    mode={currentItem.mode}
                                                    placeholder="Please select"
                                                    style={{ width: '100%' }}
                                                    options={currentItem.options}
                                                />)
                                                : currentItem.type === 'radio' ?
                                                    (<Radio.Group
                                                        options={currentItem.options}
                                                    />)
                                                    : currentItem.type === 'day' ?
                                                        (<DatePicker />)
                                                        : currentItem.type === 'date_time' ?
                                                            (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)
                                                            : currentItem.type === 'range_date' ?
                                                                (<RangePicker />)
                                                                // : currentItem.type === 'upload' ?
                                                                //     (<Upload {...propsUpload}>
                                                                //         <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                                //     </Upload>)
                                                                // : currentItem.type === 'email' ?
                                                                // (<Input placeholder="Please enter email." onChange={(e) => form.validateFields()} />)                                                                                        
                                                                : (<Input />)
                                }
                            </Form.Item>
                            )}
                    </Col>
                </>
            )
            listField.push(field)
        })
        setListField(listField)
    }

    const onSubmit = async () => {
        setIsLoading(true)
        if (form.getFieldValue('template')) {
            let obj = listTemplate.find(template => template.id === form.getFieldValue('template'))
            let components = obj?.component
            components?.sort((a, b) => (a.index > b.index) ? 1 : -1)
            let col = []
            let data = {}
            data.templateName = obj?.template_name
            col.push({
                title: 'ลำดับ',
                align: 'center',
                render: (text, record, index) => ((currentPage - 1) * 10) + index + 1
            })
            col.push({
                title: 'Template Name',
                align: 'center',
                dataIndex: 'templateName'
            })
            col.push({
                title: 'Report Name',
                align: 'center',
                dataIndex: 'reportName'
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
                                handleClickEdit()
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
        setIsLoading(false)
    }

    const handleTableChange = (pagination, filters, sorter) => {
      console.log("pagination >> ", pagination);
      setCurrentPage(pagination.current);
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
                            pagination={false}
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
                    <Form form={form2} {...layout} >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {/* <Steps progressDot current={1} className="step-dot">
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                    <Step title="" description="" />
                                </Steps> */}
                            </Col>
                        </Row>
                        <Row>
                            {listField}
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
            <Form form={form} {...layout}>
              <Row>
                <Col
                  className="form-login form-user"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                >
                  <Form.Item name={"template"}>
                    <Select
                      options={SetOptionsForSelect({
                        label: "template_name",
                        value: "id",
                        data: listTemplate,
                      })}
                      placeholder="-Template ที่พร้อมใช้งาน-"
                      size="middle"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} className="row-inquiry-customer">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button
                    className="btn-event btn-color-cancel"
                    style={{ margin: "0 8px" }}
                    onClick={() => {
                      handleClickCancel();
                    }}
                    danger
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    className="btn-event btn-color-ok"
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
    );
}
export default ManageTemplate;