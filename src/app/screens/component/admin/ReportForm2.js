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
  propsIds,
  propsStatus,
  SaveFormAction,
  ListForm2Action,
  LIST_FROM_2,
  UpdateFormAction,
  ListFormTemplateAction,
  LIST_FROM_TEMPLATES,
} from "../../../redux/actions/FormAction";
import FormReport from "./FormReport";
import FormUpload from "./FormUpload";
import { StoreTemplateAction } from "../../../redux/actions/StoreSearchAction";
import { UpdateTempateAction } from "../../../redux/actions/TemplateAction";
import moment from "moment";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const temp_columns = [
  {
    title: <Text className="big6-title">รายการ</Text>,
    align: "center",
  },
];

const ReportForm2 = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [addEditTitle, setAddEditTitle] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const listTemplateMaster = useSelector(
    (state) => state?.main?.[LIST_FROM_TEMPLATES]
  );
  const listTemplateSpec = useSelector(
    (state) => state?.main?.[LIST_TEMPLATES]
  );
  const listForm = useSelector((state) => state?.main?.[LIST_FROM_2]);
  const [listTemplate, setListTemplate] = useState([]);
  const [listTempMaster, setListTempMaster] = useState([]);
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
  const [showViewPage, setShowViewPage] = useState(false);

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
    if (listTemplateSpec) {
      let list = listTemplateSpec.result?.filter(
        (l) => l.status === "1" && l.type_id === "3"
      );
      setListTempMaster(list);
    }
  }, [listTemplateSpec]);

  useEffect(() => {
    if (listTemplateMaster) {
      console.log("listTemplateMaster", listTemplateMaster);
      let list = listTemplateMaster.result;
      setListTemplate(list);
    }
  }, [listTemplateMaster]);

  useEffect(() => {
    if (listForm) {
      setListFormComponent(listForm.result);
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
    dispatch(
      await ListFormTemplateAction({
        roleId: p.role_id,
        typeId: 2,
        isParent: 1,
      })
    );
    dispatch(
      await ListForm2Action({ roleId: p.role_id, typeId: 2, isParent: 0 })
    );
    dispatch(await ListTemplateAction({}));
  }

  const handleClickCancel = () => {
    setIsModalAddEditVisible(false);
    setIsModal2(false);
    setIsModal3(false);
    form3.resetFields();
    form2.resetFields();
    form.resetFields();
    setShowConfigPage(false);
    setTemplate({});
  };

  const newTemplate = () => {
    setIsModalAddEditVisible(true);
    setAddEditTitle("เลือกใช้รายงาน");
  };

  const handleClickEdit = (record) => {
    console.log("handleClickEdit", record);
    setListComponent(record);
    setIsLoading(true);
    setShowConfigPage(true);
    setTemplate(record);
    setIsLoading(false);
  };

  const setLayoutTemplate = (listComponent) => {
    console.log("start setLayoutTemplate", listComponent);
    let listField = [];
    listComponent?.sort((a, b) => (a.index > b.index ? 1 : -1));
    listComponent?.map((currentItem) => {
      console.log("value", currentItem.value);
      let field = (
        <>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {currentItem.type === "title" ? (
              <Text
                style={currentItem.isSubTitle ? { paddingLeft: "50px" } : {}}
              >
                {currentItem?.label}
              </Text>
            ) : (
              <Form.Item
                className="template-text"
                labelAlign="left"
                labelWrap="true"
                layout={currentItem.labelPosition ?? "vertical"}
                label={currentItem.label}
                name={currentItem.key}
                rules={[
                  {
                    required: currentItem.required ? true : false,
                    message: "Please input " + currentItem?.label,
                  },
                ]}
              >
                {currentItem.type === "textArea" ? (
                  <Input.TextArea showCount maxLength={currentItem.maxLength} />
                ) : currentItem.type === "inputNumber" ? (
                  <InputNumber min={currentItem.min} max={currentItem.max} />
                ) : currentItem.type === "checkbox" ? (
                  <Checkbox.Group options={currentItem.options} />
                ) : currentItem.type === "select" ? (
                  <Select
                    mode={currentItem.mode}
                    placeholder="Please select"
                    style={{ width: "100%" }}
                    options={currentItem.options}
                  />
                ) : currentItem.type === "radio" ? (
                  <Radio.Group options={currentItem.options} />
                ) : currentItem.type === "day" ? (
                  <DatePicker />
                ) : currentItem.type === "date_time" ? (
                  <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />
                ) : currentItem.type === "range_date" ? (
                  <RangePicker />
                ) : (
                  <Input />
                )}
              </Form.Item>
            )}
          </Col>
        </>
      );
      if (currentItem.type === "day" || currentItem.type === "date_time") {
        form2.setFieldsValue({ [currentItem.key]: moment(currentItem.value) });
      } else {
        form2.setFieldsValue({ [currentItem.key]: currentItem.value });
      }
      listField.push(field);
    });
    setListField(listField);
  };

  const onSubmitNewReport = async () => {
    if (form.getFieldValue("template") && form.getFieldValue("name")) {
      ConfirmModalEditText(onSubmitNew, conditionSave());
    } else {
      form.validateFields();
    }
  };

  const onSubmitNew = async () => {
    console.log(
      "start onSubmitNew",
      form.getFieldValue("template"),
      form.getFieldValue("name")
    );
    setIsLoading(true);
    let obj = listTemplate.find(
      (template) => template.id === form.getFieldValue("template")
    );
    let data = obj;
    data.parentId = obj.id;
    data.name = form.getFieldValue("name");
    data.stepId = 1;
    data.templateId = obj?.templateId ?? obj?.template_id;
    data.typeId = obj?.typeId ?? obj?.type_id;
    data.status = 0;
    data.id = null;
    let res = {};
    try {
      res = await SaveFormAction(data);
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
    data.templateId = record?.templateId ?? record?.template_id;
    data.typeId = record?.typeId ?? record?.type_id;
    data.stepId = 4;
    let components = record?.component;
    let c = components.find((k) => k.key === "OKRs_Ids");
    if (!c) {
      c = propsIds;
      components.push(c);
    }
    let ids = padLeadingZeros(record?.id, 5);
    c.label = "เลขการรับเงิน : " + ids;
    c.value = ids;

    let res = await UpdateFormAction(data);
    if (res.error === null) {
      SuccessModal("Success");
      handleListMaster();
    } else {
      ErrorModalMassageHtml(res.error.message);
    }
    setIsLoading(false);
  }

  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  const onSubmit = async () => {
    console.log("start onSubmit", form2.getFieldsValue(), listComponent);
    setIsLoading(true);
    let res = {};
    let data = listComponent;
    data.templateId = listComponent?.templateId ?? listComponent?.template_id;
    data.templateName = listComponent?.templateName;
    data.typeId = listComponent?.typeId ?? listComponent?.type_id;
    data.id = listComponent?.id;
    data.stepId = listComponent?.stepId ?? listComponent?.step_id;
    data.name = listComponent?.name;
    data.status = 0;
    let components = listComponent?.component;
    Object.keys(form2.getFieldsValue()).forEach(function (key) {
      let c = components.find((k) => k.key === key);
      if (c) {
        c.value = form2.getFieldValue(key);
      }

      if (key === "OKRs_Status") {
        console.log("OKRs_Status", c);
        if (c === null || c === undefined) {
          console.log("add c");
          c = propsStatus;
          c.options = propsStatus.options.filter(
            (l) => l.value !== 6 && l.value !== 7
          );
          components.push(c);
        }
        let value = form2.getFieldValue(key);
        c.value = propsStatus.options.find((k) => k.value === value)?.label;
        if (value === 1) {
          data.status = 1;
          data.stepId = 5;
        } else if (value < 10) {
          data.status = 0;
          data.stepId = value;
        } else {
          data.status = 0;
          data.stepId = 4;
        }
      }
    });
    if (data.stepId === "1" || data.stepId === 1) {
      data.stepId = 3;
    }
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
        let colData = {
          no: i + 1,
          id: obj?.id,
          OKRs_Ids: "",
          OKRs_Date: "",
          OKRs_BookNumber: "",
          OKRs_Project: "",
          OKRs_Title: "",
          OKRs_Value: "",
          OKRs_Unit_Value: "",
          OKRs_Success: "",
          OKRs_Budget_2: "",
          OKRs_FinanceNumber: "",
          OKRs_Officer: "",
          OKRs_Status: "",
          record_data: obj,
        };

        components.map((component) => {
          if (component.key === "OKRs_Title") {
            colData.OKRs_Title = component.value;
          } else if (component.key === "OKRs_Ids") {
            colData.OKRs_Ids = component.value;
          } else if (component.key === "OKRs_Date") {
            colData.OKRs_Date = component.value;
          } else if (component.key === "OKRs_BookNumber") {
            colData.OKRs_BookNumber = component.value;
          } else if (component.key === "OKRs_Project") {
            colData.OKRs_Project = component.value;
          } else if (component.key === "OKRs_Project") {
            colData.OKRs_Project = component.value;
          } else if (component.key === "OKRs_Value") {
            colData.OKRs_Value = component.value;
          } else if (component.key === "OKRs_Unit_Value") {
            colData.OKRs_Unit_Value = component.value;
          } else if (component.key === "OKRs_Success") {
            colData.OKRs_Success = component.value;
          } else if (component.key === "OKRs_Budget_2") {
            colData.OKRs_Budget_2 = component.value;
          } else if (component.key === "OKRs_FinanceNumber") {
            colData.OKRs_FinanceNumber = component.value;
          } else if (component.key === "OKRs_Officer") {
            colData.OKRs_Officer = component.value;
          } else if (component.key === "OKRs_Status") {
            colData.OKRs_Status = component.value;
          }
        });

        list.push(colData);
      });
    } else {
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
      render: (val, record, index) => {
        return {
          children: (
            <Text strong style={{ color: !record?.id ? "red" : "black" }}>
              {val}
            </Text>
          ),
        };
      },
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
      render: (_, record) =>
        record?.OKRs_Date
          ? moment(record?.OKRs_Date).format("DD/MM/YYYY")
          : null,
    },
    {
      title: "เลขที่หนังสือรับ อว",
      dataIndex: "OKRs_BookNumber",
      key: "OKRs_BookNumber",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_BookNumber,
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
      render: (_, record) =>
        record?.OKRs_Value
          ? record?.OKRs_Value + " " + record?.OKRs_Unit_Value
          : "",
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
      dataIndex: "OKRs_FinanceNumber",
      key: "OKRs_FinanceNumber",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_FinanceNumber,
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
      title: "Step",
      dataIndex: "stepName",
      align: "left",
      width: 80,
      render: (_, record) => record?.record_data?.step_name,
    },
    {
      title: "Action",
      align: "center",
      fixed: "right",
      render: (record) => {
        return (
          <>
            {(profile?.role?.priority === "1" ||
              profile?.role?.priority === "2") &&
            (record?.record_data?.step_id === "4" ||
              record?.record_data?.step_id === "5") ? (
              <>
                <Button
                  type="primary"
                  className={
                    record?.record_data?.step_id === "5"
                      ? "appr-button"
                      : "pre-button"
                  }
                  onClick={() => {
                    handleClickView(record.record_data);
                  }}
                >
                  <Text className="big6-title">รายงาน</Text>
                </Button>
                <Button
                  type="primary"
                  className="pre-button"
                  onClick={() => handleClickValidated(record.record_data)}
                >
                  <Text className="big6-title">manage</Text>
                </Button>
              </>
            ) : (
              <div className="text-center">
                <Button
                  disabled={
                    record?.record_data?.step_id === "1" ||
                    record?.record_data?.step_id === "3" ||
                    record?.record_data?.step_id === "8"
                      ? false
                      : true
                  }
                  type="primary"
                  className="pre-button"
                  onClick={() => {
                    handleClickEdit(record.record_data);
                  }}
                >
                  <Text className="big6-title">รายงาน</Text>
                </Button>
                <Button
                  disabled={
                    record?.record_data?.step_id === "1" ||
                    record?.record_data?.step_id === "3" ||
                    record?.record_data?.step_id === "8"
                      ? false
                      : true
                  }
                  type="primary"
                  className={record?.id ? "pre-button" : "nol-button"}
                  onClick={() => handleUpStep(record.record_data)}
                >
                  <Text className="big6-title">ส่งไปแบบรายงาน</Text>
                </Button>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const handleClickView = (record) => {
    console.log("handleClickView", record);
    setListComponent(record);
    setIsLoading(true);
    setShowViewPage(true);
    setTemplate(record);
    setIsLoading(false);
  };

  const handleClickValidated = (record) => {
    console.log("handleClickValidated", record);
    let status = { ...propsStatus };
    status.options = propsStatus.options.filter(
      (l) => l.value !== 6 && l.value !== 7
    );
    if (record.status) {
      if (record.status === "1") {
        Object.assign(status, { value: 1 });
      } else {
        Object.assign(status, { value: parseInt(record.stepId) });
      }
    }
    form2.setFieldsValue({ ["name"]: record.name });
    setStep(record.stepId - 1);
    setListComponent(record);
    let l = record?.component?.filter((i) =>
      profile.role_id === "1"
        ? i.permission === 3 || i.permission === 4
        : i.permission === parseInt(profile.role_id)
    );
    setLayoutTemplate([...l, status]);
    setIsModal2(true);
    setAddEditTitle(profile?.role?.role_name);
  };

  const newSpecTemplate = () => {
    setIsModal3(true);
    setAddEditTitle("เลือกใช้ Template");
  };

  const onSubmitNewSpecReport = async () => {
    if (form3.getFieldValue("template") && form3.getFieldValue("name")) {
      ConfirmModalEditText(onSubmitNewSpec, conditionSave());
    } else {
      form3.validateFields();
    }
  };

  const onSubmitNewSpec = async () => {
    console.log(
      "start onSubmitNewSpec",
      form3.getFieldValue("template"),
      form3.getFieldValue("name")
    );
    setIsLoading(true);
    let obj = listTempMaster.find(
      (template) => template.id === form3.getFieldValue("template")
    );
    let data = {};
    data.name = form3.getFieldValue("name");
    data.stepId = 3;
    data.templateId = obj?.id;
    data.typeId = 2;
    data.status = 0;
    data.component = obj?.component;
    data.parentId = 0;
    data.id = null;
    let res = {};
    try {
      res = await SaveFormAction(data);
      if (res.error === null) {
        obj.isUsed = true;
        res = await UpdateTempateAction(obj);
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

  return (
    <>
      {showViewPage ? (
        <>
          <PageHeader
            style={{ padding: "0px" }}
            onBack={() => {
              setShowViewPage(false);
              setTemplate({});
            }}
            title="Back"
          />
          <Row gutter={24} className="row-inquiry-customer">
            <FormReport form={form2} />
          </Row>
        </>
      ) : showConfigPage ? (
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
        <Card title={"Report Form 2"} className="rounded">
          <Row gutter={24} className="row-inquiry-customer">
            {profile?.role?.priority === "1" ||
            profile?.role?.priority === "4" ? (
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  onClick={newTemplate}
                  className="ggar-button"
                >
                  รายงาน
                </Button>
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  onClick={newSpecTemplate}
                  className="ggar2-button"
                >
                  รายงานพิเศษ
                </Button>
              </Col>
            ) : null}
            <Col span={24} style={{ textAlign: "left", marginTop: 15 }}>
              <Table
                className="table-user custom-table-dashboard"
                rowKey={(record, index) => record.id}
                style={{ whiteSpace: "pre" }}
                loading={isLoading}
                scroll={{ x: "max-content" }}
                size="small"
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
                <Form.Item
                  name={"template"}
                  rules={[{ required: true, message: "Please Select!" }]}
                >
                  <Select
                    options={SetOptionsForSelect({
                      label: "name",
                      value: "id",
                      data: listTemplate,
                    })}
                    placeholder="-แบบรายงานที่พร้อมใช้งาน-"
                    size="middle"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col
                className="form-login form-user"
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
              >
                <Form.Item
                  name={"name"}
                  rules={[{ required: true, message: "Please Input!" }]}
                >
                  <Input placeholder="ชื่อรายงาน" />
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
          visible={isModal3}
          width={"30%"}
          centered={true}
          footer={null}
          onCancel={handleClickCancel}
        >
          <Form form={form3} {...layout}>
            <Row>
              <Col
                className="form-login form-user"
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
              >
                <Form.Item
                  name={"template"}
                  rules={[{ required: true, message: "Please Select!" }]}
                >
                  <Select
                    options={SetOptionsForSelect({
                      label: "template_name",
                      value: "id",
                      data: listTempMaster,
                    })}
                    placeholder="-Template ที่พร้อมใช้งาน-"
                    size="middle"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col
                className="form-login form-user"
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
              >
                <Form.Item
                  name={"name"}
                  rules={[{ required: true, message: "Please Input!" }]}
                >
                  <Input placeholder="ชื่อรายงาน" />
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
                  onClick={onSubmitNewSpecReport}
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
export default ReportForm2;
