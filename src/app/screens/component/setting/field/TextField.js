import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Button, Typography, Form, Input, Radio, Space, Checkbox } from 'antd';
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { v4 as uuidv4 } from "uuid";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { WarningModal } from "../../../items/Modal";

const { Text, Link } = Typography;
const TextField = ({ form, content }) => {
  const dispatch = useDispatch()
  const [form2] = Form.useForm();
  const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
  const [title, setTitle] = useState('Label Text Field');
  const [required, setRequired] = useState(false);
  const [size, setSize] = useState(1);
  const [labelPosition, setLabelPosition] = useState(1);
  const [formLayout, setFormLayout] = useState('vertical');
  const [checked, setChecked] = useState(false);

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
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

  useEffect(() => {
    setTitle('Label Text Field')
  }, [])

  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data))
  }

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        label: content.label,
        key: content.key,
        size: content.size === 'long' ? 2 : 1,
        isSubTitle: content.isSubTitle,
      })
      setChecked(content.isSubTitle)
      setTitle(content.label)
    }
  }, [content])

  const onSubmit = async () => {
    // console.log(form.getFieldValue())    
    if (form.getFieldValue('label') && form.getFieldValue('size') && form.getFieldValue('key')) {
      let store = storeTemplate?.component ?? []
      let checkKey = store.find(i => i.key === form.getFieldValue('key') && i.id !== content?.id)
      if (checkKey) {
        WarningModal('Key ถูกใช้งาานแล้ว ใน Field : ' + checkKey?.label)
        form.setFieldsValue({ key: null })
      } else {
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
          labelPosition: "vertical",
          type: 'input',
          key: form.getFieldValue('key'),
          label: form.getFieldValue('label'),
          size: form.getFieldValue('size') === 2 ? 'long' : 'short',
          isSubTitle: form.getFieldValue('isSubTitle') ? true : false,
          align: "left",
        }
        components.push(obj)
        console.log(components)
        setTitle('Label Text Field')
        setSize(2)
        setFormLayout('vertical')
        setTemplate({ ...storeTemplate, component: components })
        form2.resetFields();
      }
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
              <Form form={form} {...layout}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      label="Label"
                      name="label"
                      rules={[
                        { required: true, message: "Please input Label!" },
                      ]}
                    >
                      <Input
                        placeholder="Label Text Field"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      label={<><Text>Key </Text><Link href="https://docs.google.com/spreadsheets/d/1j33CZdrzh4W1PkZb_G-3LtaYSOhGp84vD0QC844LFPg/edit?usp=sharing" target="key ที่ใช้ในการออก dashboard" ><QuestionCircleOutlined /></Link></>}
                      name="key"
                      rules={[
                        { required: true, message: "Please input Key!" },
                      ]}
                    >
                      <Input
                        disabled={content?.required ? true : false}
                        onChange={(e) => {
                          form.setFieldsValue({ ["key"]: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Label Position"} name={"labelPosition"} rules={[{ required: true, message: 'Please input Label Position!' }]}>
                                            <Radio.Group onChange={onFormLayoutChange} value={formLayout} >
                                                <Radio value="vertical">Top</Radio>
                                                <Radio value="horizontal">Left</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col> */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      label={"Size"}
                      name={"size"}
                      rules={[
                        { required: true, message: "Please input Size!" },
                      ]}
                    >
                      <Radio.Group
                        onChange={(e) => {
                          setSize(e.target.value);
                        }}
                      >
                        <Radio value={1}>short</Radio>
                        <Radio value={2}>long</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item name={"isSubTitle"}>
                      <Checkbox checked={checked}
                        onChange={(e) => {
                          setChecked(e.target.checked)
                          form.setFieldsValue({
                            ["isSubTitle"]: e.target.checked,
                          });
                        }}
                      >
                        Is sub Title
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Card title={"Preview"} className="rounded">
                  <Row>
                    <Col
                      xs={size === 1 ? 12 : 24}
                      sm={size === 1 ? 12 : 24}
                      md={size === 1 ? 12 : 24}
                      lg={size === 1 ? 12 : 24}
                      xl={size === 1 ? 12 : 24}
                    >
                      <Form
                        form={form2}
                        className="template-text"
                        initialValues={{
                          layout: formLayout,
                        }}
                        {...formItemLayout}
                        layout={formLayout}
                      >
                        <Form.Item
                          label={title}
                        // name="key"
                        // rules={[{ required: required ? true : false, message: 'Please input ' + title }]}
                        >
                          <Input />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
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
        </Col>
      </Row>
    </>
  );
}
export default TextField;