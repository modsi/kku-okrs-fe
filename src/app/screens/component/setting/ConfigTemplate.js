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
import RadioField from './field/RadioField'
import DayField from './field/DayField'
import DateTimeField from './field/DateTimeField'
import RangeDateField from './field/RangeDateField'
import UploadField from './field/UploadField'
import EmailField from './field/EmailField'
import { LIST_TYPE_TEPM, LIST_FIELD_TEPM, ListFieldMasterTemplateAction } from '../../../redux/actions/ListMasterAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import { ConfirmModalEditText, SuccessModal, ErrorModalMassageHtml } from "../../items/Modal";
import { SaveTempateAction } from '../../../redux/actions/TemplateAction'

const { Text, Link } = Typography;
const ConfigTemplate = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [formField] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const listType = useSelector(state => state?.main?.[LIST_TYPE_TEPM])
    const listField = useSelector(state => state?.main?.[LIST_FIELD_TEPM])
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

    const setRadioField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Radio Field Component")
        setFieldContent(<RadioField form={formField} />)
    }

    const setDayField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Day Field Component")
        setFieldContent(<DayField form={formField} />)
    }

    const setDateTimeField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Date/Time Field Component")
        setFieldContent(<DateTimeField form={formField} />)
    }

    const setRangeDateField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Range Date Field Component")
        setFieldContent(<RangeDateField form={formField} />)
    }

    const setUploadField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Upload Field Component")
        setFieldContent(<UploadField form={formField} />)
    }

    const setEmailField = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle("Email Field Component")
        setFieldContent(<EmailField form={formField} />)
    }

    useEffect(() => {
        handleClickCancel()
    }, [storeTemplate])

    useEffect(() => {
        if (listType) {
            form.setFieldsValue({ ['templateType']: listType[0].id })
            handleListMaster(listType[0].id)
        }
    }, [listType])

    const handleTypeChange = (e) => {
        handleListMaster(e.target.value)
    }

    async function handleListMaster(typeId) {
        dispatch(await ListFieldMasterTemplateAction(typeId))
    }

    const saveTemplate = () => {
        if (form.getFieldValue('templateName') && form.getFieldValue('templateType')) {
            ConfirmModalEditText(onFinish, conditionSave());
        } else {
            form.validateFields()
        }
    }

    const conditionSave = () => {
        return {
            title: "Confirm",
            content: "Are you sure you want to save ?"
        }
    }

    async function onFinish() {
        setIsLoading(true)
        let store = storeTemplate?.components ?? []
        let data = {}
        data.type_id = form.getFieldValue('templateType')
        data.name = form.getFieldValue('templateName')
        data.component = store
        console.log('onFinish >> data is ', data)
        let res = {}
        if (id) {
            data.id = id
            data.updated_datetime = moment().format(DATE_FULL)
            // res = await UpdateAccAction(data)
        } else {
            res = await SaveTempateAction(data)
        }
        if (res.error === null) {
            SuccessModal("Success");
        } else {
            ErrorModalMassageHtml(res.error.message);
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className='container-user'>
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
                                            <Input style={{ textAlign: "left" }}
                                                placeholder="Enter Template Name"
                                            // onChange={setTemplateName}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                        <Form.Item name="templateType" rules={[{ required: true, message: 'TemplateType is required!' }]}>
                                            <Radio.Group
                                                size="small"
                                                options={SetOptionsForSelect({ label: 'name', value: 'id', data: listType })}
                                                value={1}
                                                onChange={handleTypeChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={2} xl={2} style={{ textAlign: "right" }}>
                                        <Button type="primary" loading={isLoading} danger style={{ width: '100%', background: "green", borderColor: "green" }} onClick={saveTemplate} >Save</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setTitleField} ><FaIndent style={{ paddingRight: '3px', marginRight: '5px' }} />  Title</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setTextField}><FaAdn style={{ paddingRight: '3px', marginRight: '5px' }} />  Text Field</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setTextAreaField}><FaAdversal style={{ paddingRight: '3px', marginRight: '5px' }} />  Text Area</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setNumberField}><FaCalculator style={{ paddingRight: '3px', marginRight: '5px' }} />  Number</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setCheckboxField}><FaCheckSquare style={{ paddingRight: '3px', marginRight: '5px' }} />  Checkbox</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setSelectField}><FaList style={{ paddingRight: '3px', marginRight: '5px' }} />  Select</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setRadioField}><FaRecordVinyl style={{ paddingRight: '3px', marginRight: '5px' }} />  Radio</Button>
                            {/* <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setEmailField}><FaMailBulk style={{ paddingRight: '3px', marginRight: '5px' }} />  Email</Button> */}
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setDayField}><FaCalendarDay style={{ paddingRight: '3px', marginRight: '5px' }} />  Day</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setDateTimeField}><FaCalendarAlt style={{ paddingRight: '3px', marginRight: '5px' }} />  Date/Time</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setRangeDateField}><FaCalendarAlt style={{ paddingRight: '3px', marginRight: '5px' }} />  Range Date</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}}><FaBuromobelexperte style={{ paddingRight: '3px', marginRight: '5px' }} />  Table</Button>
                            <Button type="primary" style={{ width: '100%', textAlign: "left", borderRadius: '0px'}} onClick={setUploadField}><FaFileUpload style={{ paddingRight: '3px', marginRight: '5px' }} />  Upload</Button>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={18} xl={20}>
                            <PreviewTemplate />
                        </Col>
                    </Row>
                </Card>
            </div>
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