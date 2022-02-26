import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Modal } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import { FaIndent, FaAdn, FaAdversal, FaBuromobelexperte, FaCalendarDay, FaCalendarAlt, FaFileUpload, FaCalculator, FaCheckSquare, FaList, FaRecordVinyl, FaLink, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import moment from 'moment';
import PreviewTemplate from './PreviewTemplate';
import { StoreTemplateAction, STORE_TEMPLATE } from "../../../redux/actions/StoreSearchAction"
import TitleField from './field/TitleField'
import TextField from './field/TextField'
import TextAreaField from './field/TextAreaField'
import NumberField from './field/NumberField'
import CheckboxField from './field/CheckboxField'
import SelectField from './field/SelectField'

const { Text, Link } = Typography;
const ConfigTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [formField] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
    const [fieldContent, setFieldContent] = useState(null)

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "Inline"
    };

    async function setTemplate(data) {
        dispatch(await StoreTemplateAction(data))
    }

    const setTemplateName = (e) => {
        setTemplate({ ...storeTemplate, templateName: e.target.value })
    }

    const handleClickCancel = () => {
        formField.resetFields();
        setIsModalAddEditVisible(false);
    }

    const setTitleField = () => {
        console.log('setTitleField')
        setIsModalAddEditVisible(true);
        setAddEditTitle("Title Field Component")
        setFieldContent(<TitleField form={formField} />)
    }

    const setTextField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Text Field Component")
        setFieldContent(<TextField form={formField} />)
    }

    const setTextAreaField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Text Area Field Component")
        setFieldContent(<TextAreaField form={formField} />)
    }

    const setNumberField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Number Field Component")
        setFieldContent(<NumberField form={formField} />)
    }

    const setCheckboxField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Checkbox Field Component")
        setFieldContent(<CheckboxField form={formField} />)
    }

    const setSelectField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Select Field Component")
        setFieldContent(<SelectField form={formField} />)
    }
    
    useEffect(() => {
        handleClickCancel()
    }, [storeTemplate])

    return (
        <>
            <Card title={"Create Template"} className="rounded" >
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "left" }}>
                        <Form
                            {...layout}
                            form={form}
                        >
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        name={"templateName"}
                                        rules={[{ required: true, message: 'Name is required!' }]}>
                                        <Input style={{ textAlign: "left" }} placeholder="Enter Template Name" onChange={setTemplateName} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Form.Item name="group">
                                        <Radio.Group>
                                            <Radio value="a">แบบแผนที่ 1</Radio>
                                            <Radio value="b">แบบแผนที่ 2</Radio>
                                            <Radio value="c">แบบพิเศษ</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                        <Button type="primary" loading={isLoading} danger style={{ width: '100%' }}>Save</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setTitleField} ><FaIndent style={{ paddingRight: '3px' }}/> Title</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setTextField}><FaAdn style={{ paddingRight: '3px' }} /> Text Field</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setTextAreaField}><FaAdversal style={{ paddingRight: '3px' }} /> Text Area</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setNumberField}><FaCalculator style={{ paddingRight: '3px' }} /> Number</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setCheckboxField}><FaCheckSquare style={{ paddingRight: '3px' }} /> Checkbox</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }} onClick={setSelectField}><FaList style={{ paddingRight: '3px' }} /> Select</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaRecordVinyl style={{ paddingRight: '3px' }} /> Radio</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaMailBulk style={{ paddingRight: '3px' }} /> Email</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaLink style={{ paddingRight: '3px' }} /> Url</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaPhoneAlt style={{ paddingRight: '3px' }} /> Phone</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaCalendarDay style={{ paddingRight: '3px' }} /> Day</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaCalendarAlt style={{ paddingRight: '3px' }} /> Date/Time</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaBuromobelexperte style={{ paddingRight: '3px' }} /> Table</Button>
                        <Button type="primary" style={{ width: '100%', textAlign: "left" }}><FaFileUpload style={{ paddingRight: '3px' }} /> Upload</Button>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18} xl={20}>
                        <PreviewTemplate />
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
                         {fieldContent}
                    </>
                </Modal>
            </div>
        </>
    )
}
export default ConfigTemplate;