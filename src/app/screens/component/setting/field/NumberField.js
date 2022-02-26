import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, Switch, InputNumber } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"

const { Text, Link } = Typography;
const NumberField = ({ form }) => {
    const dispatch = useDispatch()
    const [form2] = Form.useForm();
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
    const [title, setTitle] = useState('Label Text Field');
    const [required, setRequired] = useState(false);
    const [size, setSize] = useState(2);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [formLayout, setFormLayout] = useState('horizontal');

    const formItemLayout =
        formLayout === 'horizontal'
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

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        layout: "vertical"
    };

    async function setTemplate(data) {
        dispatch(await StoreTemplateAction(data))
    }

    const onSubmit = async () => {
        // console.log(form.getFieldValue())    
        if (form.getFieldValue('label') && form.getFieldValue('labelPosition') && form.getFieldValue('size')) {
            let store = storeTemplate?.components ?? []
            let components = store
            console.log(store)
            let obj = {
                index: store.length + 1,
                labelPosition: form.getFieldValue('labelPosition'),
                type: 'inputNumber',
                key: 'input_' + (store.length + 1),
                label: form.getFieldValue('label'),
                size: form.getFieldValue('size') === 2 ? 'long' : 'short',
                max: max,
                min: min,
                align: "left"
            }
            components.push(obj)
            console.log(components)
            setTitle('Label Text Field')
            setMax(null)
            setMin(null)
            setSize(2)
            setFormLayout('horizontal')
            setTemplate({ ...storeTemplate, components: components })
        } else {
            form.validateFields()
        }
    }

    const onFormLayoutChange = (e) => {
        setFormLayout(e.target.value);
    };

    return (
        <>
            <Row gutter={24}>
                <Col span={24} style={{ textAlign: "left" }}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form form={form} {...layout} >
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label="Label"
                                            name="label"
                                            rules={[{ required: true, message: 'Please input Label!' }]}
                                        >
                                            <Input placeholder="Label Text Field" onChange={(e) => { setTitle(e.target.value) }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Form.Item
                                            label={"Label Position"} name={"labelPosition"} rules={[{ required: true, message: 'Please input Label Position!' }]}>
                                            <Radio.Group onChange={onFormLayoutChange} value={formLayout} >
                                                <Radio value="vertical">Top</Radio>
                                                <Radio value="horizontal">Left</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Form.Item
                                            label={"Size"} name={"size"} rules={[{ required: true, message: 'Please input Size!' }]}>
                                            <Radio.Group onChange={(e) => { setSize(e.target.value) }}>
                                                <Radio value={1}>short</Radio>
                                                <Radio value={2}>long</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={4} xl={4}>
                                        <Form.Item
                                            label={"Max"} name={"max"}>
                                            <InputNumber onChange={(value) => { setMax(value) }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={4} xl={4}>
                                        <Form.Item
                                            label={"Min"} name={"min"}>
                                            <InputNumber onChange={(value) => { setMin(value) }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Card title={"Preview"} className="rounded"  >
                                    <Row>
                                        <Col xs={size === 1 ? 12 : 24} sm={size === 1 ? 12 : 24} md={size === 1 ? 12 : 24} lg={size === 1 ? 12 : 24} xl={size === 1 ? 12 : 24}>

                                            <Form form={form2}
                                                className="template-text"
                                                initialValues={{
                                                    layout: formLayout,
                                                }}
                                                {...formItemLayout}
                                                layout={formLayout} >
                                                <Form.Item
                                                    label={title}
                                                >
                                                    <InputNumber min={min} max={max} />
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Card>
                                <Button
                                    type="primary"
                                    danger
                                    htmlType="submit"
                                    onClick={onSubmit}
                                >
                                    Save
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default NumberField;