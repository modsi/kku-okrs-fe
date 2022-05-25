import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader, Modal, Steps, Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import { tem1, tem2 } from '../../../../template-mock'
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import { clearStorege, getStorage } from "../../state/localStorage";
import {
  ConfirmModalEditText,
  SuccessModal,
  ErrorModalMassageHtml,
} from "../../items/Modal";
import { SaveFormAction, ListFormAction, LIST_FORM, UpdateFormAction } from "../../../redux/actions/FormAction";
import {
  StoreTemplateAction,
  STORE_TEMPLATE,
} from "../../../redux/actions/StoreSearchAction";
import FormReport from './FormReport'
import FormUpload from "./FormUpload";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const temp_columns = [
  {
    title: <Text className="big6-title">รายการ</Text>,
    align: 'center',
  }
];

const ManageTemplate = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [addEditTitle, setAddEditTitle] = useState('');
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const listTemplateMaster = useSelector(state => state?.main?.[LIST_TEMPLATES])
  const listForm = useSelector(state => state?.main?.[LIST_FORM])
  const [listTemplate, setListTemplate] = useState([])
  const [columns, setColumns] = useState(temp_columns)
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([])
  const [listField, setListField] = useState([]);
  const [profile, setProfile] = useState({})
  const [listComponent, setListComponent] = useState([]);
  const [step, setStep] = useState(0);
  const [listFormComponent, setListFormComponent] = useState([]);
  const [listTableForm, setListTableForm] = useState([]);
  const [showConfigPage, setShowConfigPage] = useState(false);
  const storeTemplate = useSelector(
    (state) => state?.storeSearchReducer?.[STORE_TEMPLATE]
  );

  const propsStatus =
  {
    "id": "00000",
    "index": 4000,
    "key": "OKRs_Status",
    "size": "long",
    "type": "select",
    "align": "left",
    "permission": 2,
    "label": "สถานะ",
    "required": true,
    "options": [
      {
        "index": 1,
        "label": "สิ้นสุดโครงการ",
        "value": 1
      },
      {
        "index": 2,
        "label": "Reject to แผนปฏิบัติการ",
        "value": 6
      },
      {
        "index": 3,
        "label": "Reject to แผนงบประมาณ",
        "value": 7
      },
      {
        "index": 4,
        "label": "Reject to ผู้ใช้งาน",
        "value": 8
      }
    ],
    "labelPosition": "vertical"
  }

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    layout: "vertical"
  };

  useEffect(() => {
    let p = getStorage('profile')
    setProfile(p)
    handleListMaster()
  }, [])

  useEffect(() => {
    if (listTemplateMaster) {
      let list = listTemplateMaster.result?.filter(l => l.status === "1");
      setListTemplate(list)
    }
  }, [listTemplateMaster])

  useEffect(() => {
    if (listForm) {
      setListFormComponent(listForm.result?.filter(l => l.step_id !== "3" && l.step_id !== "8"))
    }
  }, [listForm])

  useEffect(() => {
    if (listFormComponent) {
      setPage()
    }
  }, [listFormComponent])

  async function handleListMaster() {
    let p = getStorage('profile')
    console.log(p)
    dispatch(await ListTemplateAction({}))
    dispatch(await ListFormAction({ roleId: p.role_id, str: '', username: p.username }))
  }

  const handleClickCancel = () => {
    setIsModalAddEditVisible(false);
    setIsModal2(false)
    form2.resetFields()
  }

  const newTemplate = () => {
    setIsModalAddEditVisible(true);
    setAddEditTitle('เลือกใช้ Template')
  }

  const handleClickEdit = (record) => {
    console.log("handleClickEdit", record)
    form2.setFieldsValue({ ['name']: record.name })
    setStep(record.stepId === '6' || record.stepId === '7' || record.stepId === '8' ? 3 : record.stepId - 1)
    setListComponent(record)
    let l = record?.component?.filter(i => profile.role_id === '1' ? i.permission === 3 || i.permission === 4 : i.permission === parseInt(profile.role_id))
    setLayoutTemplate(l)
    setIsModal2(true);
    setAddEditTitle(profile?.role?.role_name)
  }

  const setLayoutTemplate = (listComponent) => {
    console.log('start setLayoutTemplate', listComponent)
    let listField = []
    listComponent?.sort((a, b) => (a.index > b.index) ? 1 : -1)
    listComponent?.map((currentItem) => {
      console.log('value', currentItem.value)
      let field = (
        <>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} >
            {currentItem.type === 'title' ?
              (<Text style={currentItem.isSubTitle ? { paddingLeft: '50px' } : {}}>{currentItem?.label}</Text>)
              : (<Form.Item
                className="template-text"
                labelAlign='left'
                labelWrap='true'
                layout={currentItem.labelPosition ?? 'vertical'}
                label={currentItem.label}
                name={currentItem.key}
                rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
              >
                {currentItem.type === 'textArea' ?
                  (<Input.TextArea showCount maxLength={currentItem.maxLength} />)
                  : currentItem.type === 'inputNumber' ?
                    (<InputNumber min={currentItem.min} max={currentItem.max} />)
                    : currentItem.type === 'checkbox' ?
                      (<Checkbox.Group options={currentItem.options} />)
                      : currentItem.type === 'select' ?
                        (<Select
                          mode={currentItem.mode}
                          placeholder="Please select"
                          style={{ width: '100%' }}
                          options={currentItem.options}
                        />)
                        : currentItem.type === 'radio' ?
                          (<Radio.Group
                            options={currentItem.options}
                          />)
                          : currentItem.type === 'day' ?
                            (<DatePicker />)
                            : currentItem.type === 'date_time' ?
                              (<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)
                              : currentItem.type === 'range_date' ?
                                (<RangePicker />)
                                : (<Input />)
                }
              </Form.Item>
              )}
          </Col>
        </>
      )
      form2.setFieldsValue({ [currentItem.key]: currentItem.value })
      listField.push(field)
    })
    setListField(listField)
  }

  const onSubmitNewReport = async () => {
    setIsLoading(true)
    if (form.getFieldValue('template')) {
      let obj = listTemplate.find(template => template.id === form.getFieldValue('template'))
      let components = obj?.component
      components?.sort((a, b) => (a.index > b.index) ? 1 : -1)
      let data = {}
      data.component = components
      data.templateId = obj?.id
      data.templateName = obj?.template_name
      data.typeId = obj?.type_id
      data.stepId = profile.role_id === '1' ? 2 : 1
      data.id = null
      setListFormComponent([data, ...listFormComponent])
      handleClickCancel()
    } else {
      form.validateFields()
    }
    setIsLoading(false)
  }

  const saveForm = () => {
    if (form2.getFieldValue("name")) {
      ConfirmModalEditText(onSubmit, conditionSave());
    } else {
      form2.validateFields();
    }
  };

  const handleUpStep = (record) => {
    upStep(record)
    // ConfirmModalEditText(upStep(record), conditionUpStep());
  }
  const conditionSave = () => {
    return {
      title: "Confirm",
      content: "Are you sure you want to save ?",
    };
  };

  const conditionUpStep = () => {
    return {
      title: "Confirm",
      content: "Are you sure you want to Update Step ?",
    };
  };

  async function upStep(record) {
    setIsLoading(true);
    console.log('upStep', record)
    let data = { ...record }
    data.stepId = (record.stepId === '6' || record.stepId === '7' || record.stepId === '8' ? 4 : parseInt(record.stepId) + 1)
    let res = await UpdateFormAction(data);
    if (res.error === null) {
      SuccessModal("Success");
      handleListMaster()
    } else {
      ErrorModalMassageHtml(res.error.message);
    }
    setIsLoading(false);
  }


  const onSubmit = async () => {
    console.log('start onSubmit', form2.getFieldsValue(), listComponent)
    setIsLoading(true);
    let res = {};
    let data = listComponent;
    let components = listComponent?.component
    Object.keys(form2.getFieldsValue()).forEach(function (key) {
      let c = components.find(k => k.key === key)
      if (c) {
        c.value = form2.getFieldValue(key)
      } 
      
      if (key === 'OKRs_Status'){
        let value = form2.getFieldValue(key)
        if(value === 1){
          data.status = 1
          data.stepId = 5
        }else {
          data.status = null
          data.stepId = value
        }
      }
    });    
    data.name = form2.getFieldValue('name')
    data.component = components
    try {
      if (listComponent.id) {
        res = await UpdateFormAction(data);
      } else {
        res = await SaveFormAction(data);
      }
      if (res.error === null) {
        SuccessModal("Success");
        handleListMaster()
      } else {
        ErrorModalMassageHtml(res.error.message);
      }
    } catch (err) {
      console.error(err)
      ErrorModalMassageHtml(err);
    }
    handleClickCancel()
    setIsLoading(false);
  }

  const handleClickView = (record) => {
    console.log("handleClickEdit", record)
    setListComponent(record)
    setIsLoading(true);
    setShowConfigPage(true);
    setTemplate(record);
    setIsLoading(false);
  }

  const handleClickValidated = (record) => {
    console.log("handleClickValidated", record)
    let status = {...propsStatus}
    if(record.status){
      if(record.status === "1"){
        Object.assign(status,{value: 1})
      }else {
        Object.assign(status,{value: parseInt(record.stepId)})
      }
    }
    form2.setFieldsValue({ ['name']: record.name })
    setStep(record.stepId - 1)
    setListComponent(record)
    let l = record?.component?.filter(i => profile.role_id === '1' ? i.permission === 3 || i.permission === 4 : i.permission === parseInt(profile.role_id))
    setLayoutTemplate([...l, status])
    setIsModal2(true);
    setAddEditTitle(profile?.role?.role_name)
  }
  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data));
  }

  const setPage = () => {
    let list = []
    console.log('setPage', listFormComponent)
    if (listFormComponent) {
      listFormComponent?.map((obj) => {
        let components = obj?.component
        components?.sort((a, b) => (a.index > b.index) ? 1 : -1)
        let col = []
        let data = {}
        data.component = components
        data.templateId = obj?.templateId ?? obj?.template_id
        data.templateName = obj?.templateName
        data.typeId = obj?.typeId ?? obj?.type_id
        data.id = obj?.id
        data.stepId = obj?.stepId ?? obj?.step_id
        data.status = obj?.status
        data.name = obj?.name
        col.push({
          title: ' Report Name ',
          align: 'center',
          dataIndex: 'name',
        })
        col.push({
          title: ' Status ',
          align: 'center',
          dataIndex: 'id',
          render: (val) => {
            if (!val) {
              return {
                props: {
                  style: { color: 'red' }
                },
                children: <Text strong style={{ color: 'red' }}>unSeve</Text>
              };
            } else {
              return {
                props: {
                  style: { color: 'green' }
                },
                children: <Text strong style={{ color: 'green' }}>Seved</Text>
              };
            }
          }
        })
        components.map(component => {
          col.push({
            title: ' ' + component.label + ' ',
            align: 'center',
            dataIndex: component.key,
            render: (_, record) => {
              let c = record.component.find(k => k.key === component.key)
              return {
                props: {
                  style: { color: 'green' }
                },
                children: <Text strong style={{ color: 'black' }}>{c.value}</Text>
              };
            }
          })
        })
        col.push({
          title: 'Action',
          align: 'center',
          fixed: 'right',
          render: (_, record) =>
            <div className="text-center">
              {record?.stepId === '4' || record?.stepId === '5' ?
                <>
                  <Button
                    type="primary"
                    className={record?.stepId === '5' ? "appr-button" : "pre-button"}
                    onClick={() => {
                      handleClickView(record)
                    }
                    }
                  >
                    <Text className="big6-title">รายงาน</Text>
                    {/* <EditOutlined /> */}
                  </Button>
                  <Button
                    type="primary"
                    className={record?.status !== '1' ? "pre-button" : "nol-button"}
                    disabled={record?.id ? false : true}
                    onClick={() =>
                      handleClickValidated(record)
                    }
                  >
                    <Text className="big6-title">manage</Text>
                    {/* <EditOutlined /> */}
                  </Button>
                </>
                :
                <>
                  <Button
                    type="primary"
                    className="pre-button"
                    onClick={() => {
                      handleClickEdit(record)
                    }
                    }
                  >
                    <Text className="big6-title">manage</Text>
                    {/* <EditOutlined /> */}
                  </Button>
                  <Button
                    type="primary"
                    className={record?.id ? "pre-button" : "nol-button"}
                    disabled={record?.id ? false : true}
                    onClick={() =>
                      handleUpStep(record)
                    }
                  >
                    <Text className="big6-title">ส่งไปแบบรายงาน</Text>
                    {/* <EditOutlined /> */}
                  </Button>
                </>
              }
            </div>
        })
        let field = (
          <>
            <Table
              className='table-user custom-table-dashboard'
              rowKey={(record, index) => record.id}
              style={{ whiteSpace: 'pre' }}
              loading={isLoading}
              scroll={{ x: 'max-content' }}
              size="small"
              bordered
              dataSource={[data]}
              pagination={false}
              columns={col} />
          </>
        )
        list.push(field)
      })
    } else {
      list.push(
        <Table
          className='table-user custom-table-dashboard'
          rowKey={(record, index) => record.key}
          style={{ whiteSpace: 'pre' }}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          size="small"
          bordered
          dataSource={[]}
          pagination={false}
          pageSize={10}
          columns={columns} />
      )
    }
    setListTableForm(list)
  }
  return (
    <>
      {showConfigPage ? (
        <>
          <PageHeader
            style={{ padding: "0px" }}
            onBack={() => {
              setShowConfigPage(false);
              setTemplate({});
            }}
            title="Back"
          />
          <Row gutter={24} className="row-inquiry-customer">
            <FormReport form={form2} />
            <FormUpload form={form2} />
          </Row>
          {storeTemplate?.stepId !== '5' ?
            <Row gutter={24} className="row-inquiry-customer">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  className='btn-event btn-color-cancel'
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    handleClickCancel();
                  }}
                  danger
                >
                  ยกเลิก
                </Button>
                <Button
                  className='btn-event btn-color-ok'
                  type="primary"
                  danger
                  htmlType="submit"
                  onClick={saveForm}
                  loading={isLoading}
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
            : null}
        </>
      ) :
        <Card title={"Manage Report"} className="rounded" >
          <Row gutter={24}>
            <Col span={24} style={{ textAlign: "right" }} >
              <Button type="primary" shape="circle" size="large"
                onClick={newTemplate} className="ggar-button"
              >
                <PlusOutlined className="big3-title" />
              </Button>
            </Col >
            <Col span={24} style={{ textAlign: "center" }}>
              {listTableForm}
            </Col>
          </Row >
        </Card>
      }
      <div>
        <Modal
          className="card-m-tem"
          closable={true}
          title={addEditTitle}
          visible={isModal2}
          width={"50%"}
          centered={true}
          footer={null}
          onCancel={handleClickCancel}
        >
          <Form form={form2} {...layout} >
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingBottom: '15px' }}>
                <Steps current={step} percent={60}>
                  <Step title="Admin1 กรอกข้อมูล" />
                  <Step title="Admin2 กรอกข้อมูล" />
                  <Step title="ผู้ใช้งาน กรอกข้อมูล" />
                  <Step title="Validate" />
                </Steps>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label='Report Name'
                  name={"name"}
                  rules={[{ required: true, message: 'Report Name is required' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {listField}
            </Row>
            <Row gutter={24} className="row-inquiry-customer">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  className='btn-event btn-color-cancel'
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    handleClickCancel();
                  }}
                  danger
                >
                  ยกเลิก
                </Button>
                <Button
                  className='btn-event btn-color-ok'
                  type="primary"
                  danger
                  htmlType="submit"
                  onClick={saveForm}
                  loading={isLoading}
                >
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>

      <div>
        <Modal
          className="card-m-tem"
          closable={true}
          title={addEditTitle}
          visible={isModalAddEditVisible}
          width={"30%"}
          centered={true}
          footer={null}
          onCancel={handleClickCancel}
        >
          <Form form={form} {...layout}>
            <Row>
              <Col
                className="form-login form-user"
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
              >
                <Form.Item name={"template"}>
                  <Select
                    options={SetOptionsForSelect({
                      label: "template_name",
                      value: "id",
                      data: listTemplate,
                    })}
                    placeholder="-Template ที่พร้อมใช้งาน-"
                    size="middle"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className="row-inquiry-customer">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  className="btn-event btn-color-cancel"
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    handleClickCancel();
                  }}
                  danger
                >
                  ยกเลิก
                </Button>
                <Button
                  className="btn-event btn-color-ok"
                  type="primary"
                  danger
                  htmlType="submit"
                  onClick={onSubmitNewReport}
                  loading={isLoading}
                >
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
}
export default ManageTemplate;