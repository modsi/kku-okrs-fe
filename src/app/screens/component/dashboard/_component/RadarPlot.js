import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Radar } from "@ant-design/plots";
import { Card, Row, Col, Space, Button } from "antd";

const RadarPlot = (props) => {
  const {
    width = 200,
    height = 200,
    titleFirst = "",
    title = "",
    data = [],
    dataColor = false,
    showRefresh = false,
    dataTextColor = false,
    backgroundColor = "#fff",
    textInPlots = "#fff",
    innerRadius = false,
    unit = "%",
    text = false,
    pie = true,
    brk = false,
    helfData = false,
    showFormatCurrency = false,
    gIndex = 0
  } = props;

  const [countNum, setCountNum] = useState(0);

  useEffect(() => {
    sumCount();
  }, []);

  const sumCount = () => {
    let sum = 0;
    if (data && data.length > 0) {
      data.forEach((v) => {
        sum += parseInt(v.budget_2);
      });
    }
    setCountNum(sum);
  };

  const config = {
    width: width,
    height: height,
    data: data.map((d) => ({ ...d, complete: d.complete })),
    xField: "name",
    yField: "complete",
    appendPadding: [0, 10, 0, 10],
    // meta: {
    //   star: {
    //     alias: 'star 数量',
    //     min: 0,
    //     nice: true,
    //     formatter: (v) => Number(v).toFixed(2),
    //   },
    // },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: "rgba(0, 0, 0, 0.04)",
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };
  // return <Radar {...config} />;

  const formatCurrency = (values) => {
    if (showFormatCurrency) {
      if (values && values != undefined && values != "" && values != null) {
        var cast = values.toString().split(".");
        var prefixSet = cast[1] !== undefined ? "." + cast[1] : "";
        var formattedString =
          cast[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + prefixSet;
        return formattedString;
      }
    }

    return values;
  };

  return (
    <Card
      className="rounded plots-grap"
      style={{
        width: "100%",
        background: `${backgroundColor}`,
        height: helfData ? "100%" : "auto",
      }}
    >
      {titleFirst != "" ? (
        <span className="head-plots">{titleFirst}</span>
      ) : (
        <span className="head-plots-second">{title}</span>
      )}
      <Row lg={24} className="box-plols-detail">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
        >
          <Row
            xs={24}
            sm={24}
            md={24}
            lg={24}
            className={helfData ? "" : "center-box"}
            style={{ marginTop: helfData ? "20px" : "0px" }}
          >
            <>
              <Col
                xs={23}
                sm={23}
                md={23}
              >
                <div style={{ marginLeft: "20px" }}>
                  <div>
                    <span
                      className="text-legend"
                      style={{
                        color: !dataTextColor
                          ? "#000"
                          : dataTextColor[gIndex],
                      }}
                    >
                      {'งบประมาณที่ใช้ไปแล้ว'}{""}
                    </span>
                  </div>
                  <div style={{ marginTop: "50px" }}>
                    <span
                      className="text-legend text-legend-big"
                      style={{
                        color: !dataTextColor
                          ? "#000"
                          : dataTextColor[gIndex],
                        paddingTop: "20px",
                      }}
                    >
                      {formatCurrency(countNum)}
                    </span>
                    <span
                      className="text-legend"
                      style={{
                        color: !dataTextColor
                          ? "#000"
                          : dataTextColor[gIndex],
                      }}
                    >
                      &nbsp;&nbsp;{""}
                    </span>
                  </div>
                </div>

              </Col>
              {/* {gIndex == 0 && (
                <Col
                  md={1}
                  style={{ borderLeft: "3px solid #4E5C8480" }}
                ></Col>
              )} */}
            </>
          </Row>

        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="box-plols"
          style={{ width: width, height: height,borderLeft: "1.5px solid #4E5C8480" }}
        >
          <Radar {...config} />
        </Col>

      </Row>
    </Card>
  );

};

export default RadarPlot;
