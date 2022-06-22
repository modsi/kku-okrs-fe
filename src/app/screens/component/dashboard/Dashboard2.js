import React, { useEffect, useState } from "react";
import { Card, Col, Table, Row } from "antd";
import BorderWrap from "../../items/BorderWrap";

import PieFull from "./_component/PieFull";
import MultiPieFull from "./_component/MultiPieFull";
import RadarPlot from "./_component/RadarPlot";
import { useDispatch, useSelector } from "react-redux";
import {
  LIST_DASHBOARD,
  ListDashboardTwoAction,
} from "../../../redux/actions/DashboardAction";

const Dashboard2 = () => {
  const dispatch = useDispatch();
  // const storeListDashboard = useSelector(
  //   (state) => state?.main?.[LIST_DASHBOARD]
  // );
  const [storeListDashboard, setStoreListDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [dataSummary, setDataSummary] = useState([]);
  const [dataBudget, setDataBudget] = useState([]);
  const [dataSDGs, setDataSDGs] = useState([]);
  const [listSDGs, setListSDGs] = useState([]);
  const [centurySkill, setCenturySkill] = useState([]);
  const [listCenturySkill, setListCenturySkill] = useState([]);
  const [dataCS, setDataCS] = useState([]);
  const [dataStrategy, setDataStrategy] = useState([]);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [successPlans, setSuccessPlan] = useState([]);

  useEffect(() => {
    handleListDashboard();
  }, []);

  useEffect(() => {
    if (storeListDashboard && storeListDashboard.data) {
      // let data = [];
      if (storeListDashboard.data.successData)
        setDataSummary(storeListDashboard.data.successData);

      if (storeListDashboard.data.budget)
        setDataBudget(storeListDashboard.data.budget);

      if (storeListDashboard.data.strategy)
        setDataStrategy(storeListDashboard.data.strategy);

      if (storeListDashboard.data.sdgs)
        setDataSDGs(storeListDashboard.data.sdgs);

      if (storeListDashboard.data.sdgsData)
        setListSDGs(storeListDashboard.data.sdgsData);

      if (storeListDashboard.data.centurySkill)
        setCenturySkill(storeListDashboard.data.centurySkill);

      if (storeListDashboard.data.centurySkillData)
        setListCenturySkill(storeListDashboard.data.centurySkillData);

      if (storeListDashboard.data.successPlan)
        setSuccessPlan(storeListDashboard.data.successPlan);

      if (storeListDashboard.data.groupType1)
        setGroup1(storeListDashboard.data.groupType1);
      if (storeListDashboard.data.groupType2)
        setGroup2(storeListDashboard.data.groupType2);
      if (storeListDashboard.data.groupType3)
        setGroup3(storeListDashboard.data.groupType3);

      setFetchData(true);
    } else {
      setFetchData(false);
    }
  }, [storeListDashboard]);

  async function handleListDashboard() {
    dispatch(
      await ListDashboardTwoAction().then((value) => {
        setStoreListDashboard(value.payload.list_dashboard);
      })
    );
  }

  const formatCurrency = (values) => {
    // if (showFormatCurrency) {
      if (values && values != undefined && values != "" && values != null) {
        var cast = values.toString().split(".");
        var prefixSet = cast[1] !== undefined ? "." + cast[1] : "";
        var formattedString =
          cast[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + prefixSet;
        return formattedString;
      // }
    }

    return values;
  };

  const gridStyle = {
    width: "48%",
    textAlign: "center",
    margin: "1%",
  };

  const gridTableStyle = {
    width: "98%",
    textAlign: "center",
    margin: "1%",
  };

  const columns = [
    {
      title: "#",
      dataIndex: "running",
      key: "running",
      align: "center",
      width: 40,
      fixed: "left",
    },
    {
      title: "ประเด็นยุทธศาสตร์",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 80,
      render: (_, record) => record?.name,
    },
    {
      title: "ดำเนินการแล้ว",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
    },
    ,
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget_2",
      key: "budget_2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.budget_2),
    },
    {
      title: "งบประมาณคงเหลือ",
      dataIndex: "budget_3",
      key: "budget_3",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.budget_3),
    },
  ];

  const columns2 = [
    {
      title: "#",
      dataIndex: "running",
      key: "running",
      align: "center",
      width: 20,
      fixed: "left",
    },
    {
      title: "SDGs",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 80,
    },
    {
      title: "โครงการทั้งหมด",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
    },
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget_2",
      key: "budget_2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.budget_2),
    },
  ];

  const columns3 = [
    {
      title: "#",
      dataIndex: "running",
      key: "running",
      align: "center",
      width: 20,
      fixed: "left",
    },
    {
      title: "21st Century Skills",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 80,
    },
    {
      title: "โครงการทั้งหมด",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
    },
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget_2",
      key: "budget_2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.budget_2),
    },
  ];

  const columnsGroup1 = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 40,
      fixed: "left",
    },
    {
      title: "กลุ่มงาน",
      dataIndex: "groupNameTH",
      key: "groupNameTH",
      align: "left",
      width: 80,
    },
    {
      title: "ดำเนินการแล้ว",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
      render: (_, record) => record?.counts.complete,
    },
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget2",
      key: "budget2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.counts.budget2),
    },
  ];

  const columnsGroup2 = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 40,
      fixed: "left",
    },
    {
      title: "สาขาวิชา",
      dataIndex: "groupNameTH",
      key: "groupNameTH",
      align: "left",
      width: 80,
    },
    {
      title: "ดำเนินการแล้ว",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
      render: (_, record) => record?.counts.complete,
    },
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget2",
      key: "budget2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.counts.budget2),
    },
  ];

  const columnsGroup3 = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 40,
      fixed: "left",
    },
    {
      title: "ศูนย์",
      dataIndex: "groupNameTH",
      key: "groupNameTH",
      align: "left",
      width: 50,
    },
    {
      title: "ดำเนินการแล้ว",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
      render: (_, record) => record?.counts.complete,
    },
    {
      title: "งบประมาณที่ใช้",
      dataIndex: "budget2",
      key: "budget2",
      align: "center",
      fixed: "right",
      className: "column-money",
      width: 80,
      render: (_, record) => formatCurrency(record?.counts.budget2),
    },
  ];

  return (
    <>
      {fetchData && (
        <div className="container-dashboard2">
          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              ประเด็นยุทธศาสตร์คณะ (ภาพรวมคณะ)
            </span>
          </div>

          <Row>
          
            <Col xs={24} sm={24} md={16} lg={16}>
              <Card type="inner">
                <Table
                  className="table-user custom-table-dashboard fix-height radius"
                  rowKey={(record, index) => record.key}
                  style={{ whiteSpace: "pre" }}
                  loading={isLoading}
                  scroll={{ x: "max-content" }}
                  size="small"
                  dataSource={dataStrategy}
                  columns={columns}
                />
              </Card>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={7} lg={7}>
              <Row style={{ paddingBottom: "20px" }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <PieFull
                    title={"สรุปจำนวนโครงการที่ดำเนินการแล้ว"}
                    width={200}
                    height={200}
                    data={dataSummary}
                    dataColor={["#f6c863", "#ef5261"]}
                    dataTextColor={["#A15219", "#45B649"]}
                    text={true}
                    pie={false}
                    unit={""}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} className="box-plan" style={{marginTop: 20}}>
                  <PieFull
                    title={"สรุปงบประมาณ"}
                    data={dataBudget}
                    showFormatCurrency={true}
                    width={200}
                    height={200}
                    dataColor={["#ef5261", "#f6c863"]}
                    backgroundColor={
                      "linear-gradient(90deg, rgba(161, 255, 206, 0.25) 0.76%, rgba(250, 255, 209, 0.25) 100%)"
                    }
                    dataTextColor={["#ef5261", "#f6c863"]}
                    unit={"บาท"}
                  />
                </Col>
              </Row>
            </Col>
            
          </Row>

          <div style={{ padding: "5px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              SDGs (ภาพรวมคณะ)
            </span>
          </div>
          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <PieFull
                title={"สรุปจำนวนโครงการตาม SDGs"}
                // width={200}
                // height={200}
                data={dataSDGs}
                dataColor={["#f6c863", "#ef5261"]}
                dataTextColor={["#A15219", "#45B649"]}
                text={true}
                pie={false}
                unit={"รายการ"}
              />
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={13} lg={13} className="box-plan">
              <RadarPlot
                title={"สรุปงบประมาณ"}
                data={listSDGs}
                showFormatCurrency={true}
                // width={200}
                height={230}
                dataColor={["#4E5C8480", "#4E5C8480"]}
                backgroundColor={
                  "linear-gradient(90deg, rgba(255, 175, 189, 0.25) 0%, rgba(250, 255, 209, 0.25) 100%, rgba(255, 195, 160, 0.25) 100%)"
                }
                dataTextColor={["#4E5C8480", "#4E5C8480"]}
                unit={"บาท"}
              />
            </Col>
          </Row>
          <Card type="inner">
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              size="small"
              dataSource={listSDGs}
              columns={columns2}
            />
          </Card>
          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
            21<sup><strong>st</strong></sup> Century Skills (ภาพรวมคณะ){" "}
            </span>
          </div>
          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <PieFull
                title21={true}
                title={"สรุปจำนวนโครงการตาม 21st Century Skills"}
                width={200}
                height={200}
                data={centurySkill}
                dataColor={["#f6c863", "#ef5261"]}
                dataTextColor={["#A15219", "#45B649"]}
                text={true}
                pie={false}
                unit={"รายการ"}
              />
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={13} lg={13} className="box-plan">
              <RadarPlot
                title={"สรุปงบประมาณ"}
                data={listCenturySkill}
                showFormatCurrency={true}
                width={200}
                height={230}
                dataColor={["#4E5C8480", "#4E5C8480"]}
                backgroundColor={
                  "linear-gradient(90deg, rgba(117, 255, 220, 0.25) 0%, rgba(163, 216, 255, 0.25) 51.04%, rgba(248, 215, 251, 0.25) 100%)"
                }
                dataTextColor={["#4E5C8480", "#4E5C8480"]}
                unit={"บาท"}
              />
            </Col>
          </Row>
          <Card type="inner">
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              size="small"
              dataSource={listCenturySkill}
              columns={columns3}
            />
          </Card>

          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              ความสำเร็จของแผน
            </span>
          </div>
          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <MultiPieFull
                title={""}
                width={400}
                height={400}
                data1={successPlans.complete}
                data2={successPlans.notComplete}
                dataColor={["#f6c863", "#ef5261"]}
                dataTextColor={["#A15219", "#45B649"]}
                text={true}
                unit={"รายการ"}
              />
            </Col>
          </Row>

          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              ผลการดำเนินงานตามกลุ่มงาน{" "}
            </span>
          </div>
          <Card className="box-table" type="inner">
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              size="small"
              dataSource={group1}
              columns={columnsGroup1}
            />
          </Card>

          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              ผลการดำเนินงานตามสาขาวิชา{" "}
            </span>
          </div>
          <Card className="box-table" type="inner">
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              size="small"
              dataSource={group2}
              columns={columnsGroup2}
            />
          </Card>

          <div style={{ padding: "20px 15px 10px 15px" }}>
            <span className="head-plots" style={{ margin: "10px 0px" }}>
              ผลการดำเนินงานตามศูนย์{" "}
            </span>
          </div>
          <Card className="box-table" type="inner">
            <Table
              className="table-user custom-table-dashboard"
              rowKey={(record, index) => record.key}
              style={{ whiteSpace: "pre" }}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              size="small"
              dataSource={group3}
              columns={columnsGroup3}
            />
          </Card>
        </div>
      )}
    </>
  );
};
export default Dashboard2;
