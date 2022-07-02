import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { StoreBudgetAction } from "../../../redux/actions/StoreSearchAction";
import { getStorage } from "../../state/localStorage";
import logo from "../../../../assets/images/favicon-96x96.png"
import moment from "moment";
import TargetGroupField from "../setting/field/TargetGroupField";
import PDCAField from "../setting/field/PDCAField";
import ProjectListField from "../setting/field/ProjectListField";
import BudgetlisField from "../setting/field/BudgetlisField";
import { formatCurrency } from '../../../utils/CommonUtils'
import { Success, WarningModal } from "../../items/Modal";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const LayoutReport = ({ form, store, isView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listField, setListField] = useState([]);
  const [showDateStatus, setShowDateStatus] = useState(false);
  const [showDetailStatus, setShowDetailStatus] = useState(false);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 22 },
    layout: "Inline",
  };

  const propsUpload = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (store && store.length > 0) {
      setLayoutTemplate(store)
    }
  }, [store])

  const setLayoutTemplate = (store) => {
    let profile = getStorage("profile");
    console.log('start setLayoutTemplate', profile, store)
    let listField = []
    let components = []
    if (store) {
      components = [...store]
      // components = [...(store?.filter(l => l.permission !== 2 || (l.permission === 2 &&  parseInt(profile.role.priority) <= 2)))]
      components.sort((a, b) => (a.index > b.index) ? 1 : -1)
    }
    components?.map((currentItem) => {
      let isDisabled = (currentItem.permission && (profile.role_id !== '1' && currentItem.permission !== parseInt(profile.role_id)) ? true : false)
      let size = (!currentItem.size || currentItem.size === 'long' ? 24 : 12)
      const formItemLayout =
        currentItem.isSubTitle ? {
          labelCol: {
            span: 20,
          },
          wrapperCol: {
            span: 20,
          },
          style: { paddingLeft: '50px' }
        }
          : {
            labelCol: {
              span: 24,
            },
            wrapperCol: {
              span: 24,
            }
          };
      let field = (
        <>
          <Col xs={24} sm={24} md={size} lg={size} xl={size} style={{ textAlign: currentItem.align ?? "left", paddingRight: '20px' }}>

            {currentItem.key === 'OKRs_Budgetlist2' ?
              <>
                <BudgetlisField form={form} content={currentItem} isView={isView} allContent={components} />
              </>
              : currentItem.key === 'OKRs_Projectlist1' ?
                <>

                  <ProjectListField form={form} content={currentItem} isView={isView} />
                </>
                : currentItem.key === 'OKRs_TargetGroup' ?
                  <>
                    <TargetGroupField form={form} content={currentItem} isView={isView} />
                  </>
                  :
                  currentItem.key === 'OKRs_PDCA' ?
                    <>
                      <PDCAField form={form} content={currentItem} isView={isView} />
                    </>
                    : currentItem.type === 'table' ?
                      <>
                        <Text>{currentItem.label}</Text>
                        {setTableContent(currentItem.columns, currentItem.rows, currentItem.key, currentItem.value)}
                      </>
                      : currentItem.type === 'title' ?
                        (<Text style={currentItem.isSubTitle ? { paddingLeft: '50px' } : {}}>{currentItem?.label}</Text>)
                        : (<Form.Item
                          className="template-text"
                          labelAlign='left'
                          labelWrap='true'
                          {...formItemLayout}
                          layout={currentItem.labelPosition ?? 'vertical'}
                          label={currentItem.label}
                          name={currentItem.key}
                        // rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
                        >
                          {currentItem.type === 'textArea' ?
                            (<Input.TextArea showCount maxLength={currentItem.maxLength} disabled={isView || isDisabled ? true : false} />)
                            : currentItem.type === 'inputNumber' ?
                              (<InputNumber
                                formatter={value => {
                                  // console.log('chk formatter' , value);
                                  if (value && !isNaN(+value)) {
                                    return formatCurrency(value)
                                  } else {
                                    form.setFieldsValue({ [currentItem.key]: null })
                                    return 0;
                                  }
                                }
                                }
                                // parser={value => value <= 0 ? null : value?.replace(/\฿\s?|(,*)/g, '')}
                                style={{ width: '100%' }}
                                min={currentItem.min}
                                max={currentItem.max}
                                disabled={isView || currentItem.key === 'OKRs_Budget3' || isDisabled}
                                onChange={(e) => setAutoValue(e, currentItem.key)} />)
                              : currentItem.type === 'checkbox' ?
                                (<Checkbox.Group options={currentItem.options} disabled={isView || isDisabled ? true : false} />)
                                : currentItem.type === 'select' ?
                                  (<Select
                                    disabled={isView || isDisabled ? true : false}
                                    mode={currentItem.mode}
                                    placeholder="Please select"
                                    style={{ width: '100%' }}
                                    options={currentItem.options}
                                    onChange={(value) => handleSelectChange(value, currentItem.key)}
                                  />)
                                  : currentItem.type === 'radio' ?
                                    (<Radio.Group
                                      disabled={isView || isDisabled ? true : false}
                                      options={currentItem.options}
                                    />)
                                    : currentItem.type === 'day' ?
                                      (<DatePicker disabled={isView || isDisabled ? true : false} />)
                                      : currentItem.type === 'date_time' ?
                                        (<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" disabled={isView || isDisabled ? true : false} />)
                                        : currentItem.type === 'range_date' ?
                                          (<RangePicker disabled={isView || isDisabled ? true : false} />)
                                          : currentItem.type === 'upload' ?
                                            (<Upload {...propsUpload}>
                                              <Button icon={<UploadOutlined />} disabled={isView || isDisabled ? true : false}>Click to Upload</Button>
                                            </Upload>)
                                            // : currentItem.type === 'email' ?
                                            // (<Input placeholder="Please enter email." onChange={(e) => form.validateFields()} />)                                                                                        
                                            : (<Input disabled={isView || currentItem.key === 'OKRs_Budget3' || isDisabled} onChange={(e) => setAutoValue(e.target.value, currentItem.key)} />)
                          }
                        </Form.Item>
                        )}

          </Col>
        </>
      )
      listField.push(field)
      if (currentItem.type === 'day' || currentItem.type === 'date_time') {
        form.setFieldsValue({ [currentItem.key]: currentItem.value ? moment(currentItem.value) : null })
      } else if (currentItem.type === 'range_date' && currentItem.value) {
        form.setFieldsValue({ [currentItem.key]: [moment(currentItem.value[0]), moment(currentItem.value[1])] })
      } else {
        form.setFieldsValue({ [currentItem.key]: currentItem.value })
        if (currentItem.key === 'OKRs_Status') {
          if (currentItem.value === 10) {
            form.setFieldsValue({ ['OKRs_Status#date']: moment(currentItem.date) })
            setShowDateStatus(true)
          } else if (currentItem.value === 11 || currentItem.value === 12) {
            form.setFieldsValue({ ['OKRs_Status#detail']: currentItem.detail })
            setShowDetailStatus(true)
          }
        }
      }
    })
    setListField(listField)
  }

  const handleSelectChange = (v, key) => {
    console.log('handleSelectChange', v, key)
    setShowDateStatus(false)
    setShowDetailStatus(false)
    if (key === 'OKRs_Status' && v === 10) {
      setShowDateStatus(true)
    } else if (key === 'OKRs_Status' && (v === 11 || v === 12)) {
      setShowDetailStatus(true)
    }
  }
  const setAutoValue = (v, key) => {
    // console.log('setAutoValue', v, key)
    if (key === 'OKRs_Budget1' || key === 'OKRs_Budget2') {
      console.log('setAutoValue', form.getFieldValue('OKRs_Budget1'), form.getFieldValue('OKRs_Budget2'))
      let b1 = form.getFieldValue('OKRs_Budget1') && !isNaN(+form.getFieldValue('OKRs_Budget1')) ? form.getFieldValue('OKRs_Budget1') : 0
      let b2 = form.getFieldValue('OKRs_Budget2') && !isNaN(+form.getFieldValue('OKRs_Budget2')) ? form.getFieldValue('OKRs_Budget2') : 0
      if (b2 > b1) {
        WarningModal('งบประมาณที่ใช้ ต้องไม่มากกว่า งบประมาณที่จัดสรร')
        form.setFieldsValue({ OKRs_Budget2: 0 })
        form.setFieldsValue({ OKRs_Budget3: 0 })
      } else {
        let val = b1 - b2
        form.setFieldsValue({ OKRs_Budget3: val })
        setBudget1(b2)
      }
    }
  }

  async function setBudget1(data) {
    dispatch(await StoreBudgetAction(data))
  }

  const setTableContent = (options, row, key, value) => {
    let dataSource = []
    let columns = []
    options?.sort((a, b) => (a.index > b.index) ? 1 : -1)
    options.map((item, index) => {
      let col = {
        title: item.colLabel,
        dataIndex: item.colKey + '#' + key,
        key: item.colKey,
      }
      columns.push(col);
    })

    for (let i = 0; i < row; i++) {
      let d = {}
      d.key = i
      d.index = i + 1
      columns.map((c) => {
        // console.log('ccc', c.key, i, value)
        let v = value && Array.isArray(value) ? (value?.find(v => v.index === i + 1 && v.key === c.key)?.value) : null
        form.setFieldsValue({ [c.dataIndex + '#' + (i + 1)]: v })
        Object.assign(d, { [c.dataIndex + '#' + (i + 1)]: v })
      });
      dataSource.push(d)
    }
    console.log('dataSource', dataSource)
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
            name={dataIndex + '#' + record?.index}
            style={{ margin: 0, padding: 0 }}
          >
            <Input
              disabled={isView ? true : false}
              style={{ width: '100%', textAlign: "left" }}
              size="small"
              onChange={(e) => form.setFieldsValue({ [dataIndex + '#' + record?.index]: e.target.value })}
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
      </>
    )
  }

  // console.log('OKRs_Status', form.getFieldValue('OKRs_Status'))
  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form {...layout} form={form}>
          <Row>
            {listField}
            {showDateStatus ?
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item name={"OKRs_Status#date"} label={"กรุณาระบุ"}>
                  <DatePicker />
                </Form.Item>
              </Col>
              : null}
            {showDetailStatus ?
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item name={"OKRs_Status#detail"} label={"กรุณาระบุ"}>
                  <Input />
                </Form.Item>
              </Col>
              : null}
          </Row>
        </Form>
      </Col>
    </>
  );
};
export default LayoutReport;