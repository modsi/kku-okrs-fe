import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { DatePicker, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, InputNumber } from 'antd';
import logo from "../../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../../redux/actions/StoreSearchAction"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const PDCAField = ({ form, content, isView }) => {
  const dispatch = useDispatch()
  const [form2] = Form.useForm();
  const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
  const [title, setTitle] = useState('Label Text Field');
  const [row, setRow] = useState(1);
  const [listField, setListField] = useState([]);
  const [options, setOptions] = useState([{ index: 1, colLabel: '', colKey: '' }]);
  const [dataSource, setDataSource] = useState([]);
  // const [columns, setColumns] = useState([]);

  const add = () => {
    setRow(row + 1)
  };

  const columns = [
    {
      title: 'ลำดับ',
      width: 20,
      align: "Center",
      fixed: 'left',
      render: (text, record, index) => {
        return {
          props: {
            style: { textAlign: 'Center' }
          },
          children: (index + 1) + "."
        };
      }
    },
    {
      title: 'วิธีการดำเนินการ',
      width: 400,
      align: "Center",
      fixed: 'left',
      dataIndex: 'OKRs_PDCA#title'
    },
    {
      title: 'ระยะเวลา',
      width: 300,
      align: "Center",
      fixed: 'left',
      dataIndex: 'OKRs_PDCA#month'
    }
  ];

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
      if (Array.isArray(content?.value)) {
        content?.value?.map(v => {
          form.setFieldsValue({
            [content.key + "#month#" + v.index]: v.month ? [moment(v.month[0]), moment(v.month[1])] : [null, null],
            [content.key + "#title#" + v.index]: v.title,
          })
        })
        setRow(content?.value?.length ?? 1)
      }
      setTitle(content.label)
    }
  }, [content])

  const onSubmit = async () => {
    // console.log(form.getFieldValue())    
    if (form.getFieldValue('label') && form.getFieldValue('key') && options.length > 0) {
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
      let op2 = options.find(({ colKey }) => colKey === e.target.value)
      if (!op2 || op2.index === op.index) {
        op.colKey = e.target.value
        form.setFieldsValue({ ["colKey" + op.index]: e.target.value });
      } else {
        op.colKey = null
        form.setFieldsValue({ ["colKey" + op.index]: null });
      }
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
            <Input placeholder="label" disabled={isView ? true : false} onChange={(e) => updateOption(item.index, 'colLabel', e)} defaultValue={item.colLabel} style={{ width: '40%' }} />
          </Form.Item>
          <Form.Item
            noStyle
            name={"colKey" + item.index}
            rules={[{ required: true }]}
          >
            <Input placeholder="column key" disabled={isView ? true : false} onChange={(e) => updateOption(item.index, 'colKey', e)} defaultValue={item.colKey} style={{ width: '40%' }} />
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
    setListField(listField);
  };

  const EditableCell = ({
    dataIndex,
    index,
    record,
    children,
    ...restProps
  }) => {
    // console.log(dataIndex, record, index)
    return (
      <>
        {dataIndex ? (
          <td {...restProps} style={{ padding: '2px' }}>
            <Form.Item
              name={dataIndex + '#' + record?.index}
              style={{ margin: 0, padding: 0 }}
            >
              {dataIndex === 'OKRs_PDCA#month' ?
                <RangePicker
                  disabled={isView ? true : false}
                  picker="month"
                  style={{ width: '100%', textAlign: "left" }}
                  size="small"
                />
                :
                <Input
                  disabled={isView ? true : false}
                  style={{ width: '100%', textAlign: "left" }}
                  size="small"
                />
              }
            </Form.Item>
          </td>
        ) : (
          <td {...restProps} style={{ padding: '2px', textAlign: "center" }}>
            {children}
          </td>
        )}
      </>
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
                <Space direction="vertical" style={{ width: "100%", paddingBottom: '20px' }}>
                  <Text>{title}</Text>
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
                  {isView ? null :
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Rows
                    </Button>
                  }
                </Space>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default PDCAField;