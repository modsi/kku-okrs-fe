import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { v4 as uuidv4 } from "uuid";
import { QuestionCircleOutlined, CaretRightFilled } from "@ant-design/icons";
import { formatCurrency } from '../../../../utils/CommonUtils'

const { Text, Link } = Typography;
const TargetGroupField = ({ form, content }) => {
  const [title, setTitle] = useState('Label Text Field');
  const [formLayout, setFormLayout] = useState('vertical');

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

  useEffect(() => {
    if (content) {
      console.log('TargetGroupField', content);
      if (Array.isArray(content?.value)) {
        content?.value?.map(v => {
          form.setFieldsValue({
            [content.key + "#" + v.index]: v.value,
          })
          if (v.index === 6 && v.label) {
            form.setFieldsValue({
              [content.key + "#label#" + v.index]: v.label,
            })
          }
        })
      }
      setTitle(content.label)
    }
  }, [content])


  return (
    <>
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: "left" }}>
          <Form
            form={form}
            className="template-text"
            initialValues={{
              layout: formLayout,
            }}
            {...formItemLayout}
            layout={formLayout}
          >
            <Form.Item label={title}>
              <Row>
                <Col span={10} >
                  <Text><CaretRightFilled /> ผู้บริหาร</Text>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#1"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#1"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
                <Col span={10}>
                  <Text><CaretRightFilled /> บุคลากรสายวิชาการ</Text>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#2"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#2"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
                <Col span={10}>
                  <Text><CaretRightFilled /> บุคลากรสายสนับสนุน</Text>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#3"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#3"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
                <Col span={10}>
                  <Text><CaretRightFilled /> นักศึกษา</Text>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#4"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#4"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
                <Col span={10}>
                  <Text><CaretRightFilled /> ศิษย์เก่า</Text>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#5"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#5"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
                <Col span={2}>
                  <Text><CaretRightFilled /> อื่นๆ</Text>
                </Col>
                <Col span={8} style={{ paddingRight: '10px' }}>
                  <Form.Item
                    name={"OKRs_TargetGroup#label#6"}
                    style={{ margin: 0, padding: 0 }}>
                    <Input placeholder="โปรดระบุ" />
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Space align="center">
                    <Text> จำนวน</Text>
                    <Form.Item
                      name={"OKRs_TargetGroup#6"}
                      style={{ margin: 0, padding: 0 }}>
                      <InputNumber style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }} formatter={value => !isNaN(+value) ? formatCurrency(value) : value} onChange={(v) => form.setFieldsValue({ ["OKRs_TargetGroup#6"]: v })} />
                    </Form.Item>
                    <Text>คน</Text>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default TargetGroupField;