import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { v4 as uuidv4 } from "uuid";

const { Text, Link } = Typography;
const TitleField = ({ form, content }) => {
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

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        label: content.label,
        size: content.size === 'long' ? 2 : 1,
      })
      setTitle(content.label)
    }
  }, [content])

  const onSubmit = async () => {
    // console.log(form.getFieldValue())    
    if (form.getFieldValue('label')) {
      let store = storeTemplate?.component ?? []
      let components = store
      if (content?.id) {
        components = [...storeTemplate?.component?.filter((item) => {
          if (item.id !== content?.id) {
            return (
              true
            )
          }
        })]
      }
      let max = store.length > 0 ? Math.max(...store.map(({ index }) => index)) : 0;
      let obj = {
        id: content?.id ?? uuidv4(),
        required: content?.required ?? null,
        index: content?.index ?? (max + 1),
        type: 'title',
        label: form.getFieldValue('label'),
        size: 'long',
        align: "left"
      }
      components.push(obj)
      console.log(components)
      setTitle('')
      setTemplate({ ...storeTemplate, component: components })
    } else {
      form.validateFields()
    }
  }

  return (
    <>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: "left" }}>
          <Form {...layout} form={form}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form form={form} {...layout}>
                  <Form.Item
                    label="Label"
                    name="label"
                    rules={[
                      { required: true, message: "Please input Label!" },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Card title={"Preview"} className="rounded">
                    <Text strong>{title}</Text>
                  </Card>
                  <Button
                    type="primary"
                    style={{
                      background: "#389e0d",
                      borderColor: "#389e0d",
                      borderRadius: ".5rem",
                      marginBottom: "1rem",
                    }}
                    htmlType="submit"
                    onClick={onSubmit}
                  >
                    บันทึก
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default TitleField;