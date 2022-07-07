import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Typography, Table, Form, Input, Space, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { formatCurrency } from '../../../../utils/CommonUtils'
import { STORE_BUDGET_USED } from "../../../../redux/actions/StoreSearchAction";
import { useSelector } from 'react-redux'

const { Text } = Typography;
const BudgetlisField = ({ form, content, isView }) => {
  const [title, setTitle] = useState('Label Text Field');
  const [row, setRow] = useState(1);
  const [options, setOptions] = useState([{ index: 1, colLabel: '', colKey: '' }]);
  const [dataSource, setDataSource] = useState([]);
  const [maxBudget, setMaxBudget] = useState(null);
  const [usedBudget, setUsedBudget] = useState(form.getFieldValue('OKRs_Budget2') ? parseInt(form.getFieldValue('OKRs_Budget2')) : null);
  const budget = useSelector(state => state?.storeSearchReducer?.[STORE_BUDGET_USED])
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
      title: 'รายการ',
      width: 400,
      align: "Center",
      fixed: 'left',
      dataIndex: 'OKRs_Budgetlist2#list_name'
    },
    {
      title: 'งบประมาณ',
      width: 300,
      align: "Center",
      fixed: 'left',
      dataIndex: 'OKRs_Budgetlist2#budget'
    }
  ];

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    layout: "vertical"
  };

  useEffect(() => {
    if (budget) {
      console.log('BudgetlisField checkBudget >> ', budget);
      setMaxBudget(budget)
    } else {
      setMaxBudget(null)
    }
    setBudgetList()
  }, [budget])

  const setBudgetList = () => {
    let usedBudget = parseInt(budget);
    let countRemoved = 0;
    Object.keys(form.getFieldsValue()).forEach(function (key) {
      if (key.startsWith('OKRs_Budgetlist2#budget')) {
        let s = key.split('#')
        let v = form.getFieldValue(key);
        console.log('setBudgetList', key, s, v, usedBudget);
        if (v) {
          if (!usedBudget || usedBudget < 1) {
            form.setFieldsValue({ ['OKRs_Budgetlist2#list_name#' + s[2]]: null })
            form.setFieldsValue({ [key]: null })
            countRemoved++;
            usedBudget = 0
          } else if (usedBudget <= v) {
            form.setFieldsValue({ [key]: usedBudget })
            usedBudget = 0
          } else {
            usedBudget = parseInt(usedBudget) - parseInt(v)
          }
        }
      }
    })
    setUsedBudget(usedBudget);
    remove(countRemoved)
  }

  useEffect(() => {
    if (content) {
      console.log('BudgetlisField', content);
      if (Array.isArray(content?.value)) {
        content?.value?.map(v => {
          form.setFieldsValue({
            [content.key + "#budget#" + v.index]: v.budget,
            [content.key + "#list_name#" + v.index]: v.list_name,
          })
        })
        setRow(content?.value?.length ?? 1)
      }
      setTitle(content.label)
    }
  }, [content])


  const remove = (countRemoved) => {
    setRow(row - countRemoved)
    // let ds = []
    // dataSource.map((data) => {      
    //   if(data.index !== index){
    //     let d = {}
    //     Object.assign(d, data)
    //     ds.push(d)
    //   }
    // })    
    // console.log('remove>>', index, dataSource, ds);
    // setDataSource(ds)
  };

  useEffect(() => {
    DynamicFieldSet()
  }, [options, row])
 

  const DynamicFieldSet = () => {
    let data = []
    for (let i = 0; i < row; i++) {
      let d = {}
      d.key = i
      d.index = i + 1
      data.push(d)
    }
    setDataSource(data)
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
              {dataIndex === 'OKRs_Budgetlist2#budget' ?
                <InputNumber
                  onBlur={(e) => setAutoValue(e.target.value, dataIndex + '#' + record?.index)}
                  style={{ width: '100%' }}
                  // max={maxBudget}
                  formatter={value => {
                    // console.log('chk formatter' , value);
                    if (value && !isNaN(+value)) {
                      return formatCurrency(value)
                    } else {
                      form.setFieldsValue({ [dataIndex + '#' + record?.index]: null })
                      return 0;
                    }
                  }
                  }
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

  const setAutoValue = (v, k) => {
    console.log('setAutoValue', maxBudget, v, k)
    setBudgetList()
  }


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

  // console.log('usedBudget >> ', usedBudget);
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
                      disabled={usedBudget === null || usedBudget > 0 ? false : true}
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
export default BudgetlisField;