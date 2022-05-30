import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, Switch, InputNumber, Checkbox } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const CheckboxField = ({ form, content }) => {
  const dispatch = useDispatch()
  const [form2] = Form.useForm();
  const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
  const [title, setTitle] = useState('Label Text Field');
  const [required, setRequired] = useState(false);
  const [size, setSize] = useState(2);
  const [max, setMax] = useState(null);
  const [options, setOptions] = useState([{ index: 1, label: '', value: '' }]);
  const [formLayout, setFormLayout] = useState('vertical');
  const [listField, setListField] = useState([]);

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

  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data))
  }

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        label: content.label,
        key: content.key,
        size: content.size === 'long' ? 2 : 1,
      })
      setTitle(content.label)
      setOptions(content.options)
      DynamicFieldSet()
    }
  }, [content])

  const checkOptions = () => {
    let chk = true
    options?.map(o => {
      // console.log('options', o)
      if (!o.value || !o.label) {
        chk = false
      } else {
        let chkValue = options.find((op) => op.value === o.value && op.index !== o.index) ? true : false
        if (chkValue) {
          chk = false
          console.log('options value duplicated', o)
          o.value = null
          form.setFieldsValue({ ["value" + o.index]: null });
        }
      }
    })
    return chk;
  }

  const onSubmit = async () => {
    // console.log(form.getFieldValue())    
    if (form.getFieldValue('label') && form.getFieldValue('key') && checkOptions()) {
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
        labelPosition: "vertical",
        type: 'checkbox',
        key: form.getFieldValue('key'),
        label: form.getFieldValue('label'),
        size: 'long',
        options: options,
        align: "left"
      }
      components.push(obj)
      console.log(components)
      setTitle('Label Text Field')
      setOptions([{ index: 1, label: '', value: '' }])
      setSize(2)
      setFormLayout('vertical')
      setTemplate({ ...storeTemplate, component: components })
      form2.resetFields();
    } else {
      form.validateFields()
    }
  }

  const onFormLayoutChange = (e) => {
    setFormLayout(e.target.value);
  };

  const add = () => {
    let max = options && options.length > 0 ? Math.max(...options.map(({ index }) => index)) : 0;
    setOptions([...options, { index: max + 1, label: '', value: '' }])
  };

  const remove = (index) => {
    form.setFieldsValue({ ["label" + index]: null, ["value" + index]: null });
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
    // console.log('updateOption >>', inx, type, e)
    let op = options.find(({ index }) => index === inx)
    if (type === "label") {
      op.label = e.target.value
      form.setFieldsValue({ ["label" + op.index]: e.target.value });
    } else {
      // let op2 = options.find(({ value }) => value === e.target.value)
      // if (!op2 || op2.index === op.index) {
      op.value = e.target.value
      form.setFieldsValue({ ["value" + op.index]: e.target.value });
      // } else {
      //   op.value = null
      //   form.setFieldsValue({ ["value" + op.index]: null });
      // }
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
    console.log('DynamicFieldSet options >>', options)
    options?.sort((a, b) => (a.index > b.index) ? 1 : -1)
    options.map((item, index) => {
      let field = (
        <>
          <Form.Item
            noStyle
            name={"label" + item.index}
            rules={[{ required: true }]}
          >
            <Input placeholder={"label " + item.index} onChange={(e) => updateOption(item.index, 'label', e)} defaultValue={item.label} style={{ width: '40%' }} />
          </Form.Item>
          <Form.Item
            noStyle
            name={"value" + item.index}
            rules={[{ required: true }]}
          >
            <Input placeholder={"value" + item.index} onChange={(e) => updateOption(item.index, 'value', e)} defaultValue={item.value} style={{ width: '40%' }} />
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
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              style={{ paddingRight: "10px" }}
            >
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
                  {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label={"Size"} name={"size"} rules={[{ required: true, message: 'Please input Size!' }]}>
                                            <Radio.Group onChange={(e) => { setSize(e.target.value) }}>
                                                <Radio value={1}>short</Radio>
                                                <Radio value={2}>long</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col> */}
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label={"Options (value ห้ามซ้ำกัน)"} name={"options"}>
                      {listField}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: "60%" }}
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
                        <Form.Item label={title}>
                          <Checkbox.Group options={options} />
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
export default CheckboxField;