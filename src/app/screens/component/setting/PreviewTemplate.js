import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select } from 'antd';
import { DeleteFilled } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import logo from "../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../redux/actions/StoreSearchAction"

const { Text, Link } = Typography;
const PreviewTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [listField, setListField] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "Inline"
    };

    useEffect(() => {
        setLayoutTemplate()
    }, [storeTemplate])

    const remove = (index) => {
        let store = [...storeTemplate?.components?.filter((item) => {
            if (item.index !== index) {
                return (
                    true
                )
            }
        })]
        setTemplate({ ...storeTemplate, components: store })
    }

    async function setTemplate(data) {
        dispatch(await StoreTemplateAction(data))
    }

    const setLayoutTemplate = () => {
        let listField = []
        storeTemplate?.components?.map((item) => {
            let size = item.size === 'long' ? 23 : 11
            const formItemLayout =
                item.labelPosition === 'horizontal'
                    ? {
                        labelCol: {
                            span: 4,
                        },
                        wrapperCol: {
                            span: 20,
                        },
                        labelAlign: "left"
                    }
                    : {
                        labelCol: {
                            span: 24,
                        },
                        wrapperCol: {
                            span: 24,
                        }
                    };
            let field = (
                <>
                    <Col xs={24} sm={24} md={size} lg={size} xl={size} style={{ textAlign: item.align ?? "left" }}>
                        <Row>
                            <Col xs={24} sm={24} md={2} lg={2} xl={2} >
                                <Button
                                    type="link"
                                    style={{ padding: '0px' }}
                                    onClick={() =>
                                        remove(item.index)
                                    }
                                >
                                    <DeleteFilled />
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={22} lg={22} xl={22} >
                                <Form.Item
                                    className="template-text"
                                    {...formItemLayout}
                                    layout={item.labelPosition ?? 'vertical'}
                                    label={item.label}
                                    name={item.key}
                                    rules={[{ required: item.required ? true : false, message: 'Please input ' + item?.label }]}
                                >
                                    {/* <Space direction="horizontal" style={{ width: '100%' }}> */}
                                    {item.type === 'title' ?
                                        (<Text strong>{item?.value}</Text>)
                                        : item.type === 'textArea' ?
                                            (<Input.TextArea showCount maxLength={item.maxLength} />)
                                            : item.type === 'inputNumber' ?
                                                (<InputNumber min={item.min} max={item.max} />)
                                                : item.type === 'checkbox' ?
                                                    (<Checkbox.Group options={item.options} />)
                                                    : item.type === 'select' ?
                                                        (<Select
                                                            mode={item.mode}
                                                            placeholder="Please select"
                                                            style={{ width: '100%' }}
                                                            options={item.options}
                                                        />)
                                                        : (<Input />)
                                    }
                                    {/* </Space> */}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col >
                </>
            )
            listField.push(field)
        })
        // console.log('listField >> ', listField)
        setListField(listField)
    }

    return (
        <>
            <Card title={""} className="rounded" >
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Form
                            {...layout}
                            form={form}
                        >
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Image
                                        src={logo}
                                        preview={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Text strong>{storeTemplate?.templateName}</Text>
                                </Col>
                            </Row>
                            <Row>
                                {listField}
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Card>
        </>
    )
}
export default PreviewTemplate;