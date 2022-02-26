import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Select, Form, Input, Radio, Space, Image, Switch, InputNumber, Checkbox } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const SelectField = ({ form }) => {
    const dispatch = useDispatch()
    const [form2] = Form.useForm();
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
    const [title, setTitle] = useState('Label Text Field');
    const [required, setRequired] = useState(false);
    const [size, setSize] = useState(2);
    const [mode, setMode] = useState(null);
    const [options, setOptions] = useState([{ index: 1, label: 'A', value: 'A' }]);
    const [formLayout, setFormLayout] = useState('vertical');
    const [listField, setListField] = useState([]);

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
                type: 'select',
                key: 'input_' + (store.length + 1),
                label: form.getFieldValue('label'),
                size: form.getFieldValue('size') === 2 ? 'long' : 'short',
                options: options,
                mode: mode,
                align: "left"
            }
            components.push(obj)
            console.log(components)
            setTitle('Label Text Field')
            setOptions([{ index: 1, label: 'A', value: 'A' }])
            setSize(2)
            setMode(null)
            setFormLayout('vertical')
            setTemplate({ ...storeTemplate, components: components })
        } else {
            form.validateFields()
        }
    }

    const onFormLayoutChange = (e) => {
        setFormLayout(e.target.value);
    };

    const add = () => {
        let max = Math.max(...options.map(({ index }) => index));
        setOptions([...options, { index: max + 1, label: 'A', value: 'A' }])
    };

    const remove = (index) => {
        let store = [...options?.filter((item) => {
            if (item.index !== index) {
                return (
                    true
                )
            }
        })]
        setOptions(store)
    };

    useEffect(() => {
        DynamicFieldSet()
    }, [options])

    const updateOption = (inx, type, e) => {
        // console.log('updateOption >>', index, type, e)
        let op = options.find(({ index }) => index === inx)
        if (type === "label") {
            op.label = e.target.value
        } else {
            op.value = e.target.value
        }
        let store = [...options?.filter((item) => {
            if (item.index !== inx) {
                return (
                    true
                )
            }
        })]
        setOptions([...store, op])
    };

    const DynamicFieldSet = () => {
        let listField = []
        // console.log('options >>', options)
        options.map((item, index) => {
            let field = (
                <>
                    <Form.Item
                        noStyle
                        name={"label" + item.index}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="label" onChange={(e) => updateOption(item.index, 'label', e)} defaultValue={item.label} style={{ width: '40%' }} />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name={"value" + item.index}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="value" onChange={(e) => updateOption(item.index, 'value', e)} defaultValue={item.value} style={{ width: '40%' }} />
                    </Form.Item>

                    <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(item.index)}
                    />
                </>
            )
            listField.push(field);
        })
        setListField(listField);
    };

    return (
        <>
            <Row gutter={24}>
                <Col span={24} style={{ textAlign: "left" }}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={10} xl={10} style={{ paddingRight: "10px" }}>
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
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Label Position"} name={"labelPosition"} rules={[{ required: true, message: 'Please input Label Position!' }]}>
                                            <Radio.Group onChange={onFormLayoutChange} value={formLayout} >
                                                <Radio value="vertical">Top</Radio>
                                                <Radio value="horizontal">Left</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Size"} name={"size"} rules={[{ required: true, message: 'Please input Size!' }]}>
                                            <Radio.Group onChange={(e) => { setSize(e.target.value) }}>
                                                <Radio value={1}>short</Radio>
                                                <Radio value={2}>long</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Mode"} name={"mode"}>
                                            <Radio.Group onChange={(e) => { setMode(e.target.value) }}>
                                                <Radio value="multiple">Multiple</Radio>
                                                <Radio value="">Nolmal</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            label={"Options "} name={"options"}>
                                            {listField}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{ width: '60%' }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add Option
                                                </Button>
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
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
                                                    <Select
                                                        mode={mode}
                                                        placeholder="Please select"
                                                        style={{ width: '100%' }}
                                                        options={options}
                                                    />
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
export default SelectField;