import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { v4 as uuidv4 } from "uuid";

const { Text, Link } = Typography;
const TitleField = ({ form }) => {
    const dispatch = useDispatch()
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
    const [title, setTitle] = useState('');

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
        if (form.getFieldValue('label')) {
            let store = storeTemplate?.components ?? []
            let components = store
            let max = store.length > 0 ? Math.max(...store.map(({ index }) => index)) : 0;
            let obj = {
                id: uuidv4(),
                index: max + 1,
                type: 'title',
                value: form.getFieldValue('label'),
                size: 'long',
                align: "left"
            }
            components.push(obj)
            console.log(components)
            setTitle('')
            setTemplate({ ...storeTemplate, components: components })
        } else {
            form.validateFields()
        }
    }

    return (
        <>
            <Row gutter={24}>
                <Col span={24} style={{ textAlign: "left" }}>
                    <Form
                        {...layout}
                        form={form}
                    >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form form={form} {...layout} >
                                    <Form.Item
                                        label="Label"
                                        name="label"
                                        rules={[{ required: true, message: 'Please input Label!' }]}
                                    >
                                        <Input onChange={(e) => { setTitle(e.target.value) }} />
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Card title={"Preview"} className="rounded"  >
                                        <Text strong>{title}</Text>
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
                    </Form>
                </Col>
            </Row>
        </>
    )
}
export default TitleField;