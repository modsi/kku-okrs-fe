import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageHeader,
  Modal,
  Steps,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Form,
  Input,
  Radio,
  Space,
  Image,
  InputNumber,
  Checkbox,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  PlusOutlined,
  FileSearchOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { tem1, tem2 } from "../../../../template-mock";
import {
  LIST_TEMPLATES,
  ListTemplateAction,
} from "../../../redux/actions/TemplateAction";
import SetOptionsForSelect, {
  SetOptionsForSelectSetLable,
} from "../../items/SetOptionsForSelect";
import { clearStorege, getStorage } from "../../state/localStorage";
import {
  ConfirmModalEditText,
  SuccessModal,
  ErrorModalMassageHtml,
} from "../../items/Modal";
import {
  SaveFormAction,
  ListFormAction,
  LIST_FORM,
  UpdateFormAction,
} from "../../../redux/actions/FormAction";
import FormReport from "./FormReport";
import FormUpload from "./FormUpload";
import { StoreTemplateAction } from "../../../redux/actions/StoreSearchAction";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const temp_columns = [
  {
    title: <Text className="big6-title">รายการ</Text>,
    align: "center",
  },
];

const ReportForm1 = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [addEditTitle, setAddEditTitle] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const listTemplateMaster = useSelector(
    (state) => state?.main?.[LIST_TEMPLATES]
  );
  const listForm = useSelector((state) => state?.main?.[LIST_FORM]);
  const [listTemplate, setListTemplate] = useState([]);
  const [columns, setColumns] = useState(temp_columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [listField, setListField] = useState([]);
  const [profile, setProfile] = useState({});
  const [listComponent, setListComponent] = useState([]);
  const [step, setStep] = useState(0);
  const [listFormComponent, setListFormComponent] = useState([]);
  const [listTableForm, setListTableForm] = useState([]);
  const [showConfigPage, setShowConfigPage] = useState(false);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    layout: "vertical",
  };

  useEffect(() => {
    let p = getStorage("profile");
    setProfile(p);
    handleListMaster();
  }, []);

  useEffect(() => {
    if (listTemplateMaster) {
      let list = listTemplateMaster.result?.filter((l) => l.status === "1");
      setListTemplate(list);
    }
  }, [listTemplateMaster]);

  useEffect(() => {
    if (listForm) {
      setListFormComponent(
        listForm.result?.filter(
          (l) => (l.step_id === "8" || l.step_id === "3") && l.type_id === "1"
        )
      );
    }
  }, [listForm]);

  useEffect(() => {
    if (listFormComponent) {
      setPage();
    }
  }, [listFormComponent]);

  async function handleListMaster() {
    let p = getStorage("profile");
    console.log(p);
    dispatch(await ListTemplateAction({}));
    dispatch(
      await ListFormAction({ roleId: p.role_id, str: "", username: p.username })
    );
  }

  const handleClickCancel = () => {
    setIsModalAddEditVisible(false);
    setIsModal2(false);
    form2.resetFields();
    setShowConfigPage(false);
    setTemplate({});
  };

  const newTemplate = () => {
    setIsModalAddEditVisible(true);
    setAddEditTitle("เลือกใช้ Template");
  };

  const handleClickEdit = (record) => {
    console.log("handleClickEdit", record);
    setListComponent(record);
    setIsLoading(true);
    setShowConfigPage(true);
    setTemplate(record);
    setIsLoading(false);
  };

  const onSubmitNewReport = async () => {
    setIsLoading(true);
    if (form.getFieldValue("template")) {
      let obj = listTemplate.find(
        (template) => template.id === form.getFieldValue("template")
      );
      let components = obj?.component;
      components?.sort((a, b) => (a.index > b.index ? 1 : -1));
      let data = {};
      data.component = components;
      data.templateId = obj?.id;
      data.templateName = obj?.template_name;
      data.typeId = obj?.type_id;
      data.stepId = profile.role_id === "1" ? 2 : 1;
      data.id = null;
      setListFormComponent([data, ...listFormComponent]);
      handleClickCancel();
    } else {
      form.validateFields();
    }
    setIsLoading(false);
  };

  const saveForm = () => {
    ConfirmModalEditText(onSubmit, conditionSave());
  };

  const handleUpStep = (record) => {
    upStep(record);
    // ConfirmModalEditText(upStep(record), conditionUpStep());
  };
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
    console.log("upStep", record);
    let data = { ...record };
    data.stepId =
      record.stepId === "6" || record.stepId === "7" || record.stepId === "8"
        ? 4
        : parseInt(record.stepId) + 1;
    let res = await UpdateFormAction(data);
    if (res.error === null) {
      SuccessModal("Success");
      handleListMaster();
    } else {
      ErrorModalMassageHtml(res.error.message);
    }
    setIsLoading(false);
  }

  const onSubmit = async () => {
    console.log("start onSubmit", form2.getFieldsValue(), listComponent);
    setIsLoading(true);
    let res = {};
    let data = listComponent;
    let components = listComponent?.component;
    Object.keys(form2.getFieldsValue()).forEach(function (key) {
      let c = components.find((k) => k.key === key);
      if (c) {
        c.value = form2.getFieldValue(key);
      }
    });
    data.name = form2.getFieldValue("name");
    data.component = components;
    try {
      if (listComponent.id) {
        res = await UpdateFormAction(data);
      } else {
        res = await SaveFormAction(data);
      }
      if (res.error === null) {
        SuccessModal("Success");
        handleListMaster();
      } else {
        ErrorModalMassageHtml(res.error.message);
      }
    } catch (err) {
      console.error(err);
      ErrorModalMassageHtml(err);
    }
    handleClickCancel();
    setIsLoading(false);
  };

  const setPage = () => {
    let list = [];
    console.log("setPage", listFormComponent);

    if (listFormComponent) {
      listFormComponent?.map((obj, i) => {
        let components = obj?.component;
        components?.sort((a, b) => (a.index > b.index ? 1 : -1));
        let col = [];
        let data = {};
        data.component = components;
        data.templateId = obj?.templateId ?? obj?.template_id;
        data.templateName = obj?.templateName;
        data.typeId = obj?.typeId ?? obj?.type_id;
        data.id = obj?.id;
        data.stepId = obj?.stepId ?? obj?.step_id;
        data.status = obj?.status;
        data.name = obj?.name;

        let colData = {
          'no': i+1,
          'id': obj?.id,
          'OKRs_Ids': '',
          'OKRs_Date': '',
          'OKRs_Book_Number': '',
          'OKRs_Project': '',
          'OKRs_Title': '',
          'OKRs_Value': '',
          'OKRs_Unit_Value': '',
          'OKRs_Success': '',
          'OKRs_Budget_2': '',
          'OKRs_Finance_Number': '',
          'OKRs_Officer': '',
          'OKRs_Status': '',
          'record_data': obj
        }

        components.map((component) => {
          if (component.key == 'OKRs_Ids') {
            colData.OKRs_Ids = component.value;
          } else if (component.key == 'OKRs_Date') {
            colData.OKRs_Date = component.value;
          } else if (component.key == 'OKRs_Book_Number') {
            colData.OKRs_Book_Number = component.value;
          } else if (component.key == 'OKRs_Project') {
            colData.OKRs_Project = component.value;
          } else if (component.key == 'OKRs_Title') {
            colData.OKRs_Title = component.value;
          } else if (component.key == 'OKRs_Value') {
            colData.OKRs_Value = component.value;
          } else if (component.key == 'OKRs_Unit_Value') {
            colData.OKRs_Unit_Value = component.value;
          } else if (component.key == 'OKRs_Success') {
            colData.OKRs_Success = component.value;
          } else if (component.key == 'OKRs_Budget_2') {
            colData.OKRs_Budget_2 = component.value;
          } else if (component.key == 'OKRs_Finance_Number') {
            colData.OKRs_Finance_Number = component.value;
          } else if (component.key == 'OKRs_Officer') {
            colData.OKRs_Officer = component.value;
          } else if (component.key == 'OKRs_Status') {
            colData.OKRs_Status = component.value;
          }
        });

        list.push(colData);





        ///code old ---------------------------

        // col.push({
        //   title: " Report Name ",
        //   align: "center",
        //   dataIndex: "name",
        // });
        // col.push({
        //   title: " Status ",
        //   align: "center",
        //   dataIndex: "id",
        //   render: (val) => {
        //     if (!val) {
        //       return {
        //         props: {
        //           style: { color: "red" },
        //         },
        //         children: (
        //           <Text strong style={{ color: "red" }}>
        //             unSeve
        //           </Text>
        //         ),
        //       };
        //     } else {
        //       return {
        //         props: {
        //           style: { color: "green" },
        //         },
        //         children: (
        //           <Text strong style={{ color: "green" }}>
        //             Seved
        //           </Text>
        //         ),
        //       };
        //     }
        //   },
        // });

        // // list column
        // components.map((component) => {
        //   col.push({
        //     title: " " + component.label + " ",
        //     align: "center",
        //     dataIndex: component.key,
        //     render: (_, record) => {
        //       let c = record.component.find((k) => k.key === component.key);
        //       return {
        //         props: {
        //           style: { color: "green" },
        //         },
        //         children: (
        //           <Text strong style={{ color: "black" }}>
        //             {c.value}:{c.key}
        //           </Text>
        //         ),
        //       };
        //     },
        //   });
        // });

        // col.push({
        //   title: "Action",
        //   align: "center",
        //   fixed: "right",
        //   render: (_, record) => (
        //     <div className="text-center">
        //       <Button
        //         type="primary"
        //         className="pre-button"
        //         onClick={() => {
        //           handleClickEdit(record);
        //         }}
        //       >
        //         <Text className="big6-title">รายงาน</Text>
        //         {/* <EditOutlined /> */}
        //       </Button>
        //       <Button
        //         type="primary"
        //         className={record?.id ? "pre-button" : "nol-button"}
        //         disabled={record?.id ? false : true}
        //         onClick={() => handleUpStep(record)}
        //       >
        //         <Text className="big6-title">ส่งไปแบบรายงาน</Text>
        //         {/* <EditOutlined /> */}
        //       </Button>
        //     </div>
        //   ),
        // });
        // let field = (
        //   <>
        //     <Table
        //       className="table-user custom-table-dashboard"
        //       rowKey={(record, index) => record.id}
        //       style={{ whiteSpace: "pre" }}
        //       loading={isLoading}
        //       scroll={{ x: "max-content" }}
        //       size="small"
        //       bordered
        //       dataSource={[data]}
        //       pagination={false}
        //       columns={col}
        //     />
        //   </>
        // );
        // list.push(field);
      });
    } else {
      // list.push(
      //   <Table
      //     className="table-user custom-table-dashboard"
      //     rowKey={(record, index) => record.key}
      //     style={{ whiteSpace: "pre" }}
      //     loading={isLoading}
      //     scroll={{ x: "max-content" }}
      //     size="small"
      //     bordered
      //     dataSource={[]}
      //     pagination={false}
      //     pageSize={10}
      //     columns={columns}
      //   />
      // );
    }
    setListTableForm(list);
  };

  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data));
  }


  const columnsTable = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 40,
      fixed: "center",
    },
    {
      title: "เลขการรับเงิน",
      dataIndex: "OKRs_Ids",
      key: "OKRs_Ids",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Ids,
    },
    {
      title: "วันที่รับ",
      dataIndex: "OKRs_Date",
      key: "OKRs_Date",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Date,
    },
    {
      title: "เลขที่หนังสือรับ อว",
      dataIndex: "OKRs_Book_Number",
      key: "OKRs_Book_Number",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Book_Number,
    },
    {
      title: "ชื่อโครงการ",
      dataIndex: "OKRs_Project",
      key: "OKRs_Project",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Project,
    },
    {
      title: "ชื่อตัวชี้วัด",
      dataIndex: "OKRs_Title",
      key: "OKRs_Title",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Title,
    },
    {
      title: "เป้าหมาย",
      dataIndex: "OKRs_Value",
      key: "OKRs_Value",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Value ? record?.OKRs_Value + ' ' + record?.OKRs_Unit_Value : '',
    },
    {
      title: "ความสำเร็จ",
      dataIndex: "OKRs_Success",
      key: "OKRs_Success",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Success,
    },
    {
      title: "จำนวนเงินขออนุมัติ",
      dataIndex: "OKRs_Budget_2",
      key: "OKRs_Budget_2",
      align: "right",
      width: 80,
      render: (_, record) => record?.OKRs_Budget_2,
    },
    {
      title: "เลขที่คุมยอด",
      dataIndex: "OKRs_Finance_Number",
      key: "OKRs_Finance_Number",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Finance_Number,
    },
    {
      title: "เจ้าของเรื่อง",
      dataIndex: "OKRs_Officer",
      key: "OKRs_Officer",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Officer,
    },
    {
      title: "สถานะ",
      dataIndex: "OKRs_Status",
      key: "OKRs_Status",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Status,
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <div className="text-center">
          <Button
            type="primary"
            className="pre-button"
            onClick={() => {
              handleClickEdit(record.record_data);
            }}
          >
            <Text className="big6-title">รายงาน</Text>
            {/* <EditOutlined /> */}
          </Button>
          <Button
            type="primary"
            className={record?.id ? "pre-button" : "nol-button"}
            disabled={record?.id ? false : true}
            onClick={() => handleUpStep(record.record_data)}
          >
            <Text className="big6-title">ส่งไปแบบรายงาน</Text>
            {/* <EditOutlined /> */}
          </Button>
        </div>
      ),
    }
  ];

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
                onClick={saveForm}
                loading={isLoading}
              >
                บันทึก
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Card title={"Report Form 1"} className="rounded">
          <Row gutter={24}>
            <Col span={24} style={{ textAlign: "center" }}>
              {/* {listTableForm} */}

              <Table
                className="table-user custom-table-dashboard"
                rowKey={(record, index) => record.id}
                style={{ whiteSpace: "pre" }}
                loading={isLoading}
                scroll={{ x: "max-content" }}
                size="small"
                bordered
                dataSource={listTableForm}
                pagination={false}
                columns={columnsTable}
              />


            </Col>
          </Row>
        </Card>
      )}
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
          <Form form={form2} {...layout}>
            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                style={{ paddingBottom: "15px" }}
              >
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
                  label="Report Name"
                  name={"name"}
                  rules={[
                    { required: true, message: "Report Name is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {listField}
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
};
export default ReportForm1;
