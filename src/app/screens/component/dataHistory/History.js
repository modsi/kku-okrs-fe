import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Table,
  Button,
  PageHeader,
  Form,
  Row,
  Col,
  Input,
  Radio,
  Select,
  Typography,
  Switch,
} from "antd";
import { CheckOutlined, CloseOutlined, RedoOutlined } from "@ant-design/icons";
import {
  ListInstitutionsAction,
  ListRolesAction,
  LIST_INSTITUTIONS,
  LIST_ROLES,
  ListYearsAction,
  LIST_YEARS,
  LIST_STATUS,
  ListStatusAction,
} from "../../../redux/actions/ListMasterAction";
import SetOptionsForSelect, {
  SetOptionsForSelectSetLable,
} from "../../items/SetOptionsForSelect";
import CustomizeTable from "../../items/CustomizeTable";
import {
  ConfirmModalEditText,
  SuccessModal,
  ErrorModalMassageHtml,
} from "../../items/Modal";
import {
  SaveAccAction,
  listAccountAction,
  LLIST_ACCOUNT,
  UpdateAccAction,
} from "../../../redux/actions/UserAction";
import { historyList } from "../../../mock/data_history";
import { DATE_FULL, DATE_NORMAL } from "../../../utils/Elements";
import moment from "moment";
import { StoreTemplateAction } from "../../../redux/actions/StoreSearchAction";
import FormReport from "../admin/FormReport";
import FormUpload from "../admin/FormUpload";

import {
  propsIds,
  propsStatus,
  propsSuccess,
  SaveFormAction,
  ListFormAction,
  LIST_FORM,
  UpdateFormAction,
  LIST_HISTORY,
  ListHistoryAction,
} from "../../../redux/actions/FormAction";
import { clearStorege, getStorage, setStorage } from "../../state/localStorage";

const { Option } = Select;
const { Text, Link } = Typography;
const History = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const listInstitutions = useSelector(
    (state) => state?.main?.[LIST_INSTITUTIONS]
  );
  const dataSource = historyList;
  const listRoles = useSelector((state) => state?.main?.[LIST_ROLES]);
  const listYears = useSelector((state) => state?.main?.[LIST_YEARS]);
  const listStatus = useSelector((state) => state?.main?.[LIST_STATUS]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [addEditTitle, setAddEditTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(null);
  const [showGroup, setShowGroup] = useState(false);

  const listForm = useSelector((state) => state?.main?.[LIST_HISTORY]);
  const [listFormComponent, setListFormComponent] = useState([]);
  const [listTableForm, setListTableForm] = useState([]);
  const [years, setYears] = useState(null);
  const [group, setGroup] = useState(null);
  const [okrStatus, setOkrStatus] = useState(null);
  const [showViewPage, setShowViewPage] = useState(false);
  const [form2] = Form.useForm();

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 22 },
    layout: "vertical",
  };

  // useEffect(() => {
  //   console.log(dataSource);
  // }, [dataSource]);

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

  useEffect(() => {
    handleListMaster();
    listAccount({ str: "" });
  }, []);

  async function handleSearch() {
    dispatch(
      await ListHistoryAction({
        year: form.getFieldValue("year"),
        group_id: form.getFieldValue("group"),
        status: form.getFieldValue("status_okr"),
      })
    );
  }

  async function handleListMaster() {
    dispatch(await ListInstitutionsAction());
    dispatch(await ListRolesAction());
    dispatch(await ListYearsAction());
    dispatch(await ListStatusAction());
    dispatch(await ListHistoryAction());
  }

  async function listAccount(data) {
    dispatch(await listAccountAction(data));
  }

  const setPage = () => {
    let list = [];
    let index = 0;
    console.log("setPage", listFormComponent);
    if (listFormComponent) {
      listFormComponent?.map((obj, i) => {
        if (obj.type_id == 2 && obj.parent_id == 0) {
        } else {
          let components = obj?.component;
          components?.sort((a, b) => (a.index > b.index ? 1 : -1));
          let col = [];
          let colData = {
            no: i + 1,
            type_name: obj?.type_name,
            group_name: obj?.group_name,
            id: obj?.id,
            OKRs_Ids: "",
            OKRs_Date: "",
            OKRs_BookNumber: "",
            OKRs_Project: "",
            OKRs_Title: "",
            OKRs_Value: "",
            OKRs_Unit_Value: "",
            OKRs_Success: "",
            OKRs_Budget2: "",
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
            } else if (component.key === "OKRs_Budget2") {
              colData.OKRs_Budget2 = component.value;
            } else if (component.key === "OKRs_FinanceNumber") {
              colData.OKRs_FinanceNumber = component.value;
            } else if (component.key === "OKRs_Officer") {
              colData.OKRs_Officer = component.value;
            } else if (component.key === "OKRs_Status") {
              colData.OKRs_Status = component.value;
            }
          });

          list.push(colData);
        }
      });
    } else {
    }
    setListTableForm(list);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      align: "center",
      width: 50,
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "ประเภทรายงาน",
      dataIndex: "type_name",
      align: "left",
      width: 100,
      render: (_, record) => record?.type_name,
    },
    {
      title: "กลุ่มงาน",
      dataIndex: "group_name",
      align: "left",
      width: 100,
      render: (_, record) => record?.group_name,
    },
    {
      title: "เลขการรับเงิน",
      dataIndex: "OKRs_Ids",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Ids,
    },
    {
      title: "วันที่รับ",
      dataIndex: "OKRs_Date",
      align: "left",
      width: 80,
      render: (_, record) =>
        record?.OKRs_Date
          ? moment(record?.OKRs_Date).format("DD/MM/YYYY")
          : null,
    },
    {
      title: "เลขที่หนังสือ อว",
      dataIndex: "OKRs_BookNumber",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_BookNumber,
    },
    {
      title: "ชื่อโครงการ",
      dataIndex: "OKRs_Project",
      align: "left",
      width: 80,
      render: (_, record) => record?.OKRs_Project,
    },
    {
      title: "ชื่อตัวชี้วัด",
      dataIndex: "OKRs_Title",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Title,
    },
    {
      title: "เป้าหมาย",
      dataIndex: "OKRs_Value",
      align: "center",
      width: 80,
      render: (_, record) =>
        record?.OKRs_Value
          ? record?.OKRs_Value + " " + record?.OKRs_Unit_Value
          : "",
    },
    {
      title: "ความสำเร็จ",
      dataIndex: "OKRs_Success",
      align: "center",
      width: 80,
      // render: (_, record) => record?.OKRs_Success,
      render: (record) => (
        <div className="text-center">
          {record == "failed" ? (
            <CloseOutlined style={{ color: "red" }} />
          ) : (
            <CheckOutlined style={{ color: "green" }} />
          )}
        </div>
      ),
    },
    {
      title: "จำนวนเงินขออนุมัติ",
      dataIndex: "OKRs_Budget2",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Budget2,
    },
    {
      title: "เลขที่คุมยอด",
      dataIndex: "OKRs_FinanceNumber",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_FinanceNumber,
    },
    {
      title: "เจ้าของเรื่อง",
      dataIndex: "OKRs_Officer",
      align: "center",
      width: 80,
      render: (_, record) => record?.OKRs_Officer,
    },
    {
      title: "สถานะ",
      dataIndex: "OKRs_Status",
      align: "left",
      width: 80,
      render: (_, record) => {
        // console.log('status', record?.record_data)
        let r = record?.record_data
        let v = record?.record_data?.component?.find(i => i.key === 'OKRs_Status')
        return (
          <>
            {!r.status || !v ? null
              : (r.step_id === '8' || r.step_id === 8 || v.value === 0 || v.value === 8 || v.value === 2 ?
                <Text strong style={{ color: 'red' }}>{r.status}</Text>
                : (v.value === 1 ?
                  <Text strong style={{ color: 'green' }}>{r.status}</Text>
                  :
                  <Text strong style={{ color: '#edbf17' }}>{r.status}</Text>
                )
              )}
          </>
        )
      }
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (record) => (
        <div className="text-center">
          <Button
            type="link"
            className="text-danger btn-view"
            onClick={() => handleClickView(record?.record_data)}
          >
            <Text>view</Text>
            {/* <EditOutlined /> */}
          </Button>
        </div>
      ),
    },
  ];

  const handleClickView = (record) => {
    console.log("handleClickView record >> ", record);
    setIsLoading(true);
    setShowViewPage(true);
    setTemplate(record);
    setIsLoading(false);
  };

  const resetSearch = async () => {
    console.log("testestre");
    form.setFieldsValue({
      group: null,
      year: null,
      status_okr: null,
    });

    // setTimeout( async () => {
    await handleSearch();
    // }, 100);
  };  

  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data));
  }

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
            <FormReport form={form2} isView={true} />
            <FormUpload form={form2} />
          </Row>
        </>
      ) :
        <div className="container-user">
          <Card title={"Data History"} className="rounded container-card">
            <Form
              form={form}
              name="login"
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
            >
              <Row gutter={24} className="row-inquiry-customer">
                <Col span={24} style={{ textAlign: "left" }}>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <div style={{ float: "right" }}>
                        <Row>
                          <Col className="from-search">
                            <Form.Item
                              name={"group"}
                              rules={[
                                { required: true, message: "Role is required!" },
                              ]}
                            >
                              <Select
                                options={SetOptionsForSelect({
                                  label: "groupname",
                                  value: "groupid",
                                  data: listInstitutions,
                                })}
                                onChange={handleSearch}
                                placeholder="กลุ่มงาน"
                                size="middle"
                                style={{ width: "350px" }}
                              />
                            </Form.Item>
                          </Col>

                          <Col className="from-search">
                            <Form.Item
                              name={"year"}
                              rules={[
                                { required: true, message: "Role is required!" },
                              ]}
                            >
                              <Select
                                options={SetOptionsForSelect({
                                  label: "value",
                                  value: "value",
                                  data: listYears,
                                })}
                                onChange={handleSearch}
                                placeholder="ปีงบประมาณ"
                                size="middle"
                                style={{ width: "200px" }}
                              />
                            </Form.Item>
                          </Col>

                          <Col className="from-search">
                            <Form.Item
                              name={"status_okr"}
                              rules={[
                                { required: true, message: "Role is required!" },
                              ]}
                            >
                              <Select
                                options={SetOptionsForSelect({
                                  label: "label_value",
                                  value: "value",
                                  data: listStatus,
                                })}
                                onChange={handleSearch}
                                placeholder="สถานะ"
                                size="middle"
                                style={{ width: "200px" }}
                              />
                            </Form.Item>
                          </Col>
                          <Col className="from-search">
                            <Button onClick={resetSearch}>
                              <RedoOutlined />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <div style={{ textAlign: "center" }}>
                    {/* <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                bordered={false}
                                dataSource={dataSource?.result?.history}
                                onChange={handleTableChange}
                                pagination={true}
                                pageSize={10}
                                columns={columns} /> */}

                    <Table
                      className="table-user custom-table-dashboard"
                      rowKey={(record, index) => record.id}
                      style={{ whiteSpace: "pre" }}
                      loading={isLoading}
                      scroll={{ x: "max-content" }}
                      size="small"
                      dataSource={listTableForm}
                      pagination={true}
                      pageSize={10}
                      columns={columns}
                    />
                  </div>

                  {/* <div style={{}}>
                            Show 1 to 6 of 30 entries
                        </div> */}
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      }
    </>
  );
};
export default History;
