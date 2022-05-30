import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader, Modal, Steps, Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { EditOutlined, EyeOutlined, TableOutlined, PlusOutlined, FileSearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import { tem1, tem2 } from '../../../../template-mock'
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'
import SetOptionsForSelect, { SetOptionsForSelectSetLable } from '../../items/SetOptionsForSelect'
import { clearStorege, getStorage } from "../../state/localStorage";
import { ConfirmModalEditText, SuccessModal, ErrorModalMassageHtml, } from "../../items/Modal";
import { onFormSubmit, ListFormAction, LIST_FORM, UpdateFormAction, ListForm2Action, LIST_FROM_2 } from "../../../redux/actions/FormAction";
import { StoreTemplateAction, STORE_TEMPLATE, } from "../../../redux/actions/StoreSearchAction";
import { SetIsusedAction } from '../../../redux/actions/TemplateAction'
import { ListInstitutionsAction, LIST_INSTITUTIONS } from '../../../redux/actions/ListMasterAction'
import LayoutReport from './LayoutReport'

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;

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
  const listForm2 = useSelector(state => state?.main?.[LIST_FROM_2])
  const [listTemplate, setListTemplate] = useState([])
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [dataSource1, setDataSource1] = useState([])
  const [dataSource2, setDataSource2] = useState([])
  const [listField, setListField] = useState([]);
  const [profile, setProfile] = useState({})
  const [listComponent, setListComponent] = useState([]);
  const [step, setStep] = useState(0);
  const listInstitutions = useSelector(state => state?.main?.[LIST_INSTITUTIONS]);

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
      let list = listTemplateMaster.result?.filter(l => l.status === "1" && l.type_id !== "3");
      setListTemplate(list)
    }
  }, [listTemplateMaster])

  useEffect(() => {
    if (listForm) {
      let d1 = []
      let list = listForm.result?.filter(l => l.type_id === "1");
      list.map(f => {
        let obj = {}
        obj.component = f.component
        obj.templateId = f?.templateId ?? f?.template_id
        obj.templateName = f?.templateName ?? f?.template_name
        obj.stepName = f?.stepName ?? f?.step_name
        obj.typeId = f?.typeId ?? f?.type_id
        obj.id = f?.id
        obj.stepId = f?.stepId ?? f?.step_id
        obj.status = f?.status
        obj.name = f?.name
        obj.updatedBy = f?.updatedBy ?? f?.updated_by
        obj.formStatus = f?.form_status ?? f?.formStatus
        obj.groupId = f?.groupId ?? f?.group_id
        obj.groupTypeId = f?.groupTypeId ?? f?.group_type_id
        d1.push(obj)
      })
      setDataSource1(d1)
    }
  }, [listForm])

  useEffect(() => {
    if (listForm2) {
      let d2 = []
      let list = listForm2.result
      list.map(f => {
        let obj = {}
        obj.component = f.component
        obj.templateId = f?.templateId ?? f?.template_id
        obj.templateName = f?.templateName ?? f?.template_name
        obj.stepName = f?.stepName ?? f?.step_name
        obj.typeId = f?.typeId ?? f?.type_id
        obj.id = f?.id
        obj.stepId = f?.stepId ?? f?.step_id
        obj.status = f?.status
        obj.name = f?.name
        obj.updatedBy = f?.updatedBy ?? f?.updated_by
        obj.groupId = f?.groupId ?? f?.group_id
        obj.groupTypeId = f?.groupTypeId ?? f?.group_type_id
        d2.push(obj)
      })
      setDataSource2(d2)
    }
  }, [listForm2])

  async function handleListMaster() {
    let p = getStorage('profile')
    dispatch(await ListInstitutionsAction())
    dispatch(await ListTemplateAction({}))
    dispatch(await ListFormAction({ roleId: p.role_id, str: '', username: p.username }))
    dispatch(await ListForm2Action({ roleId: p.role_id, typeId: 2, isParent: 1 }))
  }

  const newTemplate = () => {
    setIsModalAddEditVisible(true);
    setAddEditTitle('เลือกใช้ Template')
  }

  const handleTable1Change = (pagination, filters, sorter) => {
    setCurrentPage1(pagination.current)
  };

  const handleTable2Change = (pagination, filters, sorter) => {
    setCurrentPage2(pagination.current)
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: 'id',
      align: "center",
      width: 60,
      render: (val, record, index) => {
        return {
          // props: {
          //   style: { color: 'red' }
          // },
          children: <Text strong style={{ color: (!val ? 'red' : 'black') }}>{((record.typeId === '1' ? currentPage1 : currentPage2) - 1) * 10 + index + 1}</Text>
        };
      }
    },
    {
      title: "ชื่อ Template",
      dataIndex: "templateName",
      align: "left",
      width: 180,
      render: (_, record) => record?.templateName,
    },
    {
      title: "ชื่อรายงาน",
      dataIndex: "name",
      align: "left",
      width: 180,
      render: (_, record) => record?.name,
    },
    {
      title: "Step",
      dataIndex: "stepName",
      align: "left",
      width: 100,
      render: (_, record) => record?.stepName,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      align: "left",
      width: 100,
      render: (_, record) => {
        // console.log('status', record)
        let v = record?.component?.find(i=> i.key === 'OKRs_Status')
        return (
          <>
            {!v ? null 
            : (v.value === 0 || v.value === 8 || v.value === 2 ?
              <Text strong style={{ color: 'red' }}>{_}</Text>
              :(v.value === 1 ?
                <Text strong style={{ color: 'green' }}>{_}</Text>
                :
                <Text strong style={{ color: '#edbf17' }}>{_}</Text>
              )
            )}
          </>
        )
      }
    },
    {
      title: "รายละเอียด",
      dataIndex: "component",
      align: "left",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      // render: (obj) => setTableContent(obj)
      render: (obj) => {
        let comp = obj?.filter(i => profile.role_id === '1' ? i.permission === 3 || i.permission === 4 : i.permission === parseInt(profile.role_id))
        let content = []
        comp.map(item => {
          // console.log('item', item.label, item.value)
          content.push(
            <>
              <Text>{item.label + " : "}</Text>
              {Array.isArray(item.value) ?
                <Text strong><TableOutlined /> </Text>
                :
                <Text strong>{(item.value ?? '-') + " "}</Text>
              }
            </>
          )
        })
        return {
          children: content
        }
      }
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (record) => {
        // console.log('profile', profile, record)
        let canEdit = (record?.stepId === '11' && profile?.role_id === '3') || (record?.stepId === '10' && profile?.role_id === '4') || (record?.stepId === '6' && profile?.role_id === '3') || (record?.stepId === '7' && profile?.role_id === '4') ? false : true
        // console.log('canEdit', canEdit)
        return (
          <>
            <Button
              disabled={!canEdit || (record?.typeId !== '2' && record?.id && record?.stepId !== '1' && record?.stepId !== '2' && record?.stepId !== '10' && record?.stepId !== '11' && record?.stepId !== '6' && record?.stepId !== '7') ? true : false}
              type="primary"
              className="pre-button"
              onClick={() => {
                handleClickEdit(record)
              }}
            >
              <Text className="big6-title">manage</Text>
            </Button>
            {record.typeId === '1' ?
              <Button
                disabled={!canEdit || (record?.stepId !== '1' && record?.stepId !== '2' && record?.stepId !== '10' && record?.stepId !== '11' && record?.stepId !== '6' && record?.stepId !== '7') || !record?.id ? true : false}
                type="primary"
                className={record?.id ? "pre-button" : "nol-button"}
                onClick={() =>
                  handleUpStep(record)
                }
              >
                <Text className="big6-title">ส่งไปแบบรายงาน</Text>
              </Button>
              : null}
          </>
        )
      },
    },
  ];

  const handleUpStep = (record) => {
    upStep(record)
    // ConfirmModalEditText(upStep(record), conditionUpStep());
  }

  async function upStep(record) {
    setIsLoading(true);
    console.log('upStep', record)
    let data = { ...record }
    if (record.stepId === '10' || record.stepId === '11') {
      if (!record.formStatus || record.formStatus === '0') {
        data.stepId = record.stepId === '10' ? 11 : 10
        data.status = 3
      } else {
        data.stepId = 3
      }
    } else {
      data.stepId = (record.stepId === '6' || record.stepId === '7' || record.stepId === '8' ? 4 : parseInt(record.stepId) + 1)
    }
    let res = await UpdateFormAction(data);
    if (res.error === null) {
      SuccessModal("Success");
      handleListMaster()
    } else {
      ErrorModalMassageHtml(res.error.message);
    }
    setIsLoading(false);
  } 

  const handleClickCancel = () => {
    setIsModalAddEditVisible(false);
    setIsModal2(false)
    form2.resetFields()
    form.resetFields()
  }

  const handleClickEdit = (record) => {
    console.log("handleClickEdit", profile.role_id, record)
    form2.setFieldsValue({ ['name']: record.name })
    form2.setFieldsValue({ ['group']: record.groupId })
    setStep(record.stepId === '6' || record.stepId === '7' || record.stepId === '8' ? 3 : record.stepId - 1)
    setListComponent(record)
    let l = record?.component?.filter(i => profile.role_id === '1' ? i.permission === 3 || i.permission === 4 : i.permission === parseInt(profile.role_id))
    console.log("handleClickEdit", l)
    setLayoutReport(l)
    setIsModal2(true);
    setAddEditTitle(profile?.role?.role_name)
  }

  const setLayoutReport = (listComponent) => {
    console.log('setLayoutReport', listComponent)
    setListField(<LayoutReport form={form2} store={listComponent} />)
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
      data.stepName = 'สร้างแบบรายงาน'
      data.id = null
      if (obj?.type_id === "1") {
        setDataSource1([data, ...dataSource1])
      } else if (obj?.type_id === "2") {
        setDataSource2([data, ...dataSource2])
      }
      handleClickCancel()
    } else {
      form.validateFields()
    }
    setIsLoading(false)
  }

  const saveForm = () => {
    if (form2.getFieldValue("name") && form2.getFieldValue("group")) {
      ConfirmModalEditText(onSubmit, conditionSave());
    } else {
      form2.validateFields();
    }
  };

  const conditionSave = () => {
    return {
      title: "Confirm",
      content: "Are you sure you want to save ?",
    };
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let res = {}
    try {
      res = await onFormSubmit(profile, form2, listComponent);
      if (res.error === null) {
        SuccessModal("Success");
        handleListMaster()
      } else {
        ErrorModalMassageHtml(res.error?.message);
      }
    } catch (err) {
      console.error(err)
      console.error(res)
      ErrorModalMassageHtml(err);
    }
    handleClickCancel()
    setIsLoading(false);
  }
  return (
    <>
      <Card title={"Manage Report"} className="rounded">
        <Row gutter={24} className="row-inquiry-customer">
          <Col span={12} style={{ marginTop: 10 }}>
            <Text strong style={{ color: 'rgba(0, 0, 0, 0.5)' }}>แบบรายงานที่ 1</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }} >
            <Button type="primary" shape="circle" size="large"
              onClick={newTemplate} className="ggar-button"
            >
              <PlusOutlined className="big3-title" />
            </Button>
          </Col >
          <Col span={24} style={{ textAlign: "left", marginTop: 10 }}>
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content", y: 250 }}
              size="small"
              bordered={false}
              dataSource={dataSource1}
              onChange={handleTable1Change}
              pagination={true}
              pageSize={10}
              columns={columns}
            />
          </Col>
          <Col span={24} style={{ textAlign: "left" }}>
            <Text strong style={{ color: 'rgba(0, 0, 0, 0.5)' }}>แบบรายงานที่ 2</Text>
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre", marginTop: 18 }}
              loading={isLoading}
              scroll={{ x: "max-content", y: 250 }}
              size="small"
              bordered={false}
              dataSource={dataSource2}
              onChange={handleTable2Change}
              pagination={true}
              pageSize={10}
              columns={columns}
            />
          </Col>
        </Row>
      </Card>

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
                  label='ชื่อรายงาน'
                  name={"name"}
                  rules={[{ required: true, message: 'ชื่อรายงาน is required' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label={"ผู้รับผิดชอบโครงการ"} name={"group"} rules={[{ required: true, message: 'ผู้รับผิดชอบโครงการ is required' }]}>
                  <Select
                    options={SetOptionsForSelect({
                      label: "groupname",
                      value: "groupid",
                      data: listInstitutions,
                    })}
                    placeholder="-Please select from dropdown-"
                    size="large"
                    style={{ width: "100%" }}
                  />
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
    </>
  );
}
export default ManageTemplate;