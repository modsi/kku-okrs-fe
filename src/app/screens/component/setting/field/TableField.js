import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, InputNumber } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { WarningModal } from "../../../items/Modal";

const { Text, Link } = Typography;
const TableField = ({ form, content }) => {
  const dispatch = useDispatch()
  const [form2] = Form.useForm();
  const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
  const [title, setTitle] = useState('Label Text Field');
  const [row, setRow] = useState(1);
  const [listField, setListField] = useState([]);
  const [options, setOptions] = useState([{ index: 1, colLabel: '', colKey: '' }]);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  const add = () => {
    let max = options && options.length > 0 ? Math.max(...options.map(({ index }) => index)) : 0;
    setOptions([...options, { index: max + 1, colLabel: '', colKey: '' }])
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
      })
      setOptions(content.columns)
      setRow(content.rows)
      setTitle(content.label)
      DynamicFieldSet()
    }
  }, [content])

  const checkOptions = () => {
    let chk = true
    options?.map(o => {
      // console.log('options', o)
      if (!o.colKey || !o.colLabel) {
        chk = false
      } else {
        let chkValue = options.find((op) => op.colKey === o.colKey && op.index !== o.index) ? true : false
        if (chkValue) {
          chk = false
          // console.log('options colKey duplicated', o)
          o.colKey = null
          form.setFieldsValue({ ["colKey" + o.index]: null });
        }
      }
    })
    return chk;
  }

  const onSubmit = async () => {
    // console.log(form.getFieldValue())    
    if (form.getFieldValue('label') && form.getFieldValue('key') && checkOptions()) {
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
          type: 'table',
          key: form.getFieldValue('key'),
          label: form.getFieldValue('label'),
          size: 'long',
          columns: options,
          rows: row,
          align: "left"
        }
        components.push(obj)
        console.log(components)
        setTitle('Label Text Field')
        setOptions([{ index: 1, colLabel: '', colKey: '' }])
        setTemplate({ ...storeTemplate, component: components })
        form2.resetFields();
      }
    } else {
      form.validateFields()
    }
  }

  const remove = (index) => {
    form.setFieldsValue({ ["colLabel" + index]: null, ["colKey" + index]: null });
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
  }, [options, row])

  const updateOption = (inx, type, e) => {
    // console.log('updateOption >>', index, type, e)
    let op = options.find(({ index }) => index === inx)
    if (type === "colLabel") {
      op.colLabel = e.target.value
      form.setFieldsValue({ ["colLabel" + op.index]: e.target.value });
    } else {
      // let op2 = options.find(({ colKey }) => colKey === e.target.value)
      // if (!op2 || op2.index === op.index) {
      op.colKey = e.target.value
      form.setFieldsValue({ ["colKey" + op.index]: e.target.value });
      // } else {
      //   op.colKey = null
      //   form.setFieldsValue({ ["colKey" + op.index]: null });
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
    // console.log('options >>', options)
    options?.sort((a, b) => (a.index > b.index) ? 1 : -1)
    let cols = []
    options.map((item, index) => {
      let field = (
        <>

          <Form.Item
            noStyle
            name={"colLabel" + item.index}
            rules={[{ required: true }]}
          >
            <Input placeholder={"column name " + item.index} onChange={(e) => updateOption(item.index, 'colLabel', e)} defaultValue={item.colLabel} style={{ width: '40%' }} />
          </Form.Item>
          <Form.Item
            noStyle
            name={"colKey" + item.index}
            rules={[{ required: true }]}
          >
            <Input placeholder={"column key " + item.index} onChange={(e) => updateOption(item.index, 'colKey', e)} defaultValue={item.colKey} style={{ width: '40%' }} />
          </Form.Item>

          <MinusCircleOutlined
            className="dynamic-delete-button"
            onClick={() => remove(item.index)}
          />
        </>
      )
      listField.push(field);

      let col = {
        title: item.colLabel ?? 'column label',
        dataIndex: item.colKey ?? ("colKey" + item.index),
        key: item.colKey ?? ("colKey" + item.index),
      }
      cols.push(col);
    })
    let data = []
    for (let i = 0; i < row; i++) {
      let d = {}
      d.key = i
      d.index = i + 1
      cols.map((c) => {
        Object.assign(d, { [c.dataIndex]: null })
      });
      data.push(d)
    }
    setDataSource(data)
    setColumns(cols)
    setListField(listField);
  };

  const EditableCell = ({
    dataIndex,
    index,
    record,
    ...restProps
  }) => {
    // console.log(dataIndex,record,index)
    return (
      <td {...restProps} style={{ padding: '2px' }}>
        <Form.Item
          name={dataIndex + '_' + record?.index}
          style={{ margin: 0, padding: 0 }}
        >
          <Input
            style={{ width: '100%', textAlign: "left" }}
            size="small"
          />

        </Form.Item>

      </td>
    );
  };


  const mergedColumns = columns.map(col => {
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index,
        dataIndex: col.dataIndex,
      }),
    };
  });

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
                <Form.Item
                  label={<><Text>Key </Text><Link href="https://docs.google.com/spreadsheets/d/1j33CZdrzh4W1PkZb_G-3LtaYSOhGp84vD0QC844LFPg/edit?usp=sharing" target="key ที่ใช้ในการออก dashboard" ><QuestionCircleOutlined /></Link></>}
                  name="key"
                  rules={[{ required: true, message: "Please input Key!" }]}
                >
                  <Input
                    disabled={content?.required ? true : false}
                    onChange={(e) => {
                      form.setFieldsValue({ ["key"]: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item label={"Columns (key ห้ามซ้ำกัน)"} name={"columns"}>
                  {listField}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Columns
                    </Button>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  initialValue={row}
                  label="Number of Rows"
                  name="rows"
                  rules={[{ required: true, message: "Please input Rows!" }]}
                >
                  <InputNumber
                    onChange={(value) => {
                      setRow(value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Card title={"Preview"} className="rounded">
                    <Text strong>{title}</Text>
                    <Table
                      dataSource={dataSource}
                      columns={mergedColumns}
                      pagination={false}
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      bordered
                    />
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
export default TableField;