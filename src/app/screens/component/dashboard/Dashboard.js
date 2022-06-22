import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "antd";

import PieFull from "./_component/PieFull";
import Graph from "./_component/Graph";
import GraphGroup from "./_component/GraphGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  LIST_DASHBOARD,
  ListDashboardOneAction,
} from "../../../redux/actions/DashboardAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const storeListDashboard = useSelector(state => state?.main?.[LIST_DASHBOARD])
  const [storeListDashboard, setStoreListDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [listDashboard, setListDashboard] = useState([]);
  const [dataOKRs, setDataOKRs] = useState([]);
  const [dataPlan, setDataPlan] = useState([]);
  const [dataSuccess, setDataSuccess] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dataStrategic, setDataStrategic] = useState(null);
  const [dataPllar, setDataPllar] = useState(null);
  const [dataCenturySkill, setDataCenturySkill] = useState(null);
  const [dataSDG, setDataSDG] = useState(null);
  const [arrStrategic, setArrStrategic] = useState([]);

  useEffect(() => {
    handleListDashboard();
  }, []);

  useEffect(() => {
    if (storeListDashboard && storeListDashboard.data) {
      let data = [];
      if (storeListDashboard.data.OKRs)
        setDataOKRs(setData(storeListDashboard.data.OKRs));

      if (storeListDashboard.data.overall)
        setDataPlan(setData(storeListDashboard.data.overall));

      if (storeListDashboard.data.success)
        setDataSuccess(setData2(storeListDashboard.data.success));

      if (storeListDashboard.data.pic)
        setDataSource(storeListDashboard.data.pic);

      if (storeListDashboard.data.strategy) {
        let act = setData(storeListDashboard.data.strategy.Cals);
        setDataStrategic({
          act: act,
          dataGraph: storeListDashboard.data.strategy.Grap,
        });
        setArrStrategic(storeListDashboard.data.strategy.Grap);
      }

      if (storeListDashboard.data.pillar) {
        let act = setData(storeListDashboard.data.pillar.Cals);
        setDataPllar({
          act: act,
          dataGraph: storeListDashboard.data.pillar.Grap,
        });
      }

      if (storeListDashboard.data.centurySkill) {
        let act = setData(storeListDashboard.data.centurySkill.Cals);
        setDataCenturySkill({
          act: act,
          dataGraph: storeListDashboard.data.centurySkill.Grap,
        });
      }

      if (storeListDashboard.data.sdg) {
        let act = setData(storeListDashboard.data.sdg.Cals);
        setDataSDG({
          act: act,
          dataGraph: storeListDashboard.data.sdg.Grap,
        });
      }

      setFetchData(true);
    } else {
      setFetchData(false);
    }
  }, [storeListDashboard]);

  async function handleListDashboard() {
    dispatch(
      await ListDashboardOneAction().then((value) => {
        setStoreListDashboard(value.payload.list_dashboard);
      })
    );
  }

  function setData(list) {
    const data = [
      {
        type: "ดำเนินการแล้ว",
        value: list.completePercent,
      },
      {
        type: "ยังไม่ดำเนินการ",
        value: list.notCompletePercent,
      },
    ];
    return data;
  }

  function setData2(list) {
    const data = [
      {
        type: "สำเร็จ",
        value: list.completePercent,
      },
      {
        type: "ไม่สำเร็จ",
        value: list.notCompletePercent,
      },
    ];
    return data;
  }

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 30,
      fixed: "left",
      render: (_, record) => record?.id,
    },
    {
      title: " กลุ่มงาน",
      dataIndex: "groupNameTH",
      key: "groupNameTH",
      align: "left",
      width: 100,
      render: (_, record) => " " + record?.groupNameTH,
    },
    {
      title: "ดำเนินการแล้ว",
      dataIndex: "complete",
      key: "complete",
      align: "center",
      width: 80,
      render: (_, record) => record?.counts?.complete,
    },
    {
      title: "ยังไม่ดำเนินการ",
      dataIndex: "notComplete",
      key: "notComplete",
      align: "center",
      width: 80,
      render: (_, record) => record?.counts?.notComplete,
    },
    {
      title: "ร้อยละ",
      dataIndex: "completePercent",
      key: "completePercent",
      align: "center",
      fixed: "right",
      width: 80,
      render: (_, record) => record?.counts?.completePercent,
    },
  ];

  const dataCS = [
    {
      type: "ดำเนินการแล้ว",
      value: 70,
    },
    {
      type: "ยังไม่ดำเนินการ",
      value: 30,
    },
  ];

  return (
    <>
      {fetchData && (
        <div className="site-card-wrapper">
          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={24} sm={24} md={8} lg={8}>
              <PieFull
                title={"ผลการดำเนินงานตาม OKRs"}
                data={dataOKRs}
                // backgroundColor={"rgba(255, 164, 92, 0.25)"}
                dataColor={["#f6c863", "#ef5261"]}
                dataTextColor={["#f6c863", "#ef5261"]}
              />
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={8} lg={8} className="box-plan">
              <PieFull
                title={"ผลการดำเนินงานตามแผนปฏิบัติการ"}
                data={dataPlan}
                dataColor={["#6395f9", "#62daab"]}
                dataTextColor={["#6395f9", "#62daab"]}
                textInPlots={"#000"}
              />
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            {/* <Col xs={24} sm={24} md={7} lg={7} className="box-plan">
              <PieFull
                title={"ความสำเร็จของแผน"}
                data={dataSuccess}
                // width={250}
                // height={250}
                dataTextColor={["#A15219", "#45B649"]}
                innerRadius={0.6}
              />
            </Col> */}
          </Row>

          <Row style={{  }}>
          
            {arrStrategic && arrStrategic.length > 0 && (
              
                arrStrategic.map(el => {
                  return <>
                  <Col xs={24} sm={24} md={7} lg={7} className="box-plan" style={{marginBottom: 20}}>
                  <PieFull
                    title={"ความสำเร็จของ" + el.name}
                    data={el.data}
                    // width={250}
                    // height={250}
                    dataColor={["#6395f9", "#62daab"]}
                    dataTextColor={["#6395f9", "#62daab"]}
                    innerRadius={0.6}
                  />
                </Col>
                <Col
                  xs={0}
                  sm={0}
                  md={1}
                  lg={1}
                  style={{ maxWidth: "2%" }}
                ></Col></>
                })
              
            )}
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div style={{ paddingBottom: "20px" }}>
                <Graph
                  title={"สรุปจำนวนโครงการตามประเด็นยุทธศาสตร์คณะ"}
                  data={dataStrategic}
                  dataColor={"#fd8e61"}
                  dataTextColor={["#A15219", "#45B649"]}
                />
              </div>
              <div style={{ paddingBottom: "20px" }}>
                <GraphGroup
                  title={"สรุปจำนวนโครงการตามเสาหลักมหาวิทยาลัย"}
                  data={dataPllar}
                  dataColor={["#A15219", "#45B649"]}
                  dataTextColor={["#A15219", "#45B649"]}
                />
              </div>
              <div style={{ paddingBottom: "20px" }}>
                <GraphGroup
                  title={"สรุปจำนวนโครงการตาม SDGs"}
                  data={dataSDG}
                  dataColor={["#A15219", "#45B649"]}
                  dataTextColor={["#A15219", "#45B649"]}
                />
              </div>
              <div style={{ paddingBottom: "20px" }}>
                <Graph
                  title21={true}
                  data={dataCenturySkill}
                  dataColor={"#fd8e61"}
                  dataTextColor={["#A15219", "#45B649"]}
                />
              </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={7} lg={7}>
              <div style={{ paddingBottom: "20px" }}>
                <PieFull
                  title={"ความสำเร็จของแผน"}
                  data={dataSuccess}
                  width={250}
                  height={250}
                  dataColor={["#6395f9", "#62daab"]}
                  dataTextColor={["#6395f9", "#62daab"]}
                  innerRadius={0.6}
                />
              </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} style={{ maxWidth: "2%" }}></Col>
            <Col xs={24} sm={24} md={16} lg={16}>
              <div>
                <Card className="rounded ">
                  <div style={{ padding: "0px 15px 15px 15px" }}>
                    <span className="head-plots" style={{ margin: "10px 0px" }}>
                      ผลการดำเนินงานตามกลุ่มงาน
                    </span>
                  </div>

                  <Row gutter={24} className="row-inquiry-customer">
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Table
                        className="table-user custom-table-dashboard"
                        rowKey={(record, index) => record.key}
                        style={{ whiteSpace: "pre" }}
                        loading={isLoading}
                        scroll={{ x: "max-content" }}
                        size="small"
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default Dashboard;
