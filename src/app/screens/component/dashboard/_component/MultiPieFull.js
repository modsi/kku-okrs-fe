import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Row, Col, Space, Button } from "antd";
import { Pie, measureTextWidth } from "@ant-design/plots";
const MultiPieFull = (props) => {
  const {
    width = 200,
    height = 200,
    titleFirst = "",
    title = "",
    data1 = [],
    data2 = [],
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
  } = props;

  const [showAll, setShowAll] = useState(false);
  const [countNum1, setCountNum1] = useState(0);
  const [countNum2, setCountNum2] = useState(0);
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    let sum1 = sumCount1(data1);
    let sum2 = sumCount2(data2);
    setDataShow([
      {
        type: "รายงานที่สำเร็จ",
        value: sum1,
      },
      {
        type: "รายงานที่ไม่สำเร็จ",
        value: sum2,
      },
    ]);
    if (text && pie) setShowAll(true);
  }, [text, pie]);

  const sumCount1 = (data) => {
    let sum = 0;
    if (text && data && data.length > 0) {
      data.forEach((v) => {
        sum += parseInt(v.value);
      });
    }
    setCountNum1(sum);
    return sum;
  };

  const sumCount2 = (data) => {
    let sum = 0;
    if (text && data && data.length > 0) {
      data.forEach((v) => {
        sum += parseInt(v.value);
      });
    }
    setCountNum2(sum);
    return sum;
  };

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

  const config = {
    width: width,
    height: height,
    appendPadding: 10,
    data: dataShow,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    legend: false,
    // color: dataColor,
    innerRadius: innerRadius,
    label: false,
    // label: {
    //   type: "inner",
    //   offset: "-50%",
    //   autoRotate: false,
    //   content: ({ value }) => `${formatCurrency(value)} ${unit}`,
    //   style: {
    //     fontSize: 16,
    //     textAlign: "center",
    //     fill: textInPlots,
    //   },
    // },
    interactions: [
      // {
      //   type: "element-active",
      // },
    ],
    statistic: false,
  };
  return (
    <Card
      className="rounded plots-grap"
      style={{
        width: "100%",
        background: `${backgroundColor}`,
        // height: helfData ? "100%" : "auto",
      }}
    >
      {titleFirst != "" ? (
        <span className="head-plots">{titleFirst}</span>
      ) : (
        <span className="head-plots-second">{title}</span>
      )}

      <Row xs={24} lg={24}>
        <Col xs={0} lg={8}></Col>
        <Col xs={24} lg={8}>
          {pie && (
            <Col
              xs={24}
              sm={24}
              md={showAll ? 24 : 24}
              lg={showAll ? 24 : 24}
              className="box-plols"
              style={{ width: width, height: height }}
            >
              <Pie {...config} />
            </Col>
          )}
        </Col>
        <Col xs={0} lg={8}></Col>

        <Col xs={24} lg={24}>
          <Row>
            <Col xs={12}>
              <Row lg={24} className="box-plols-detail">
                <Col
                  xs={24}
                  sm={24}
                  md={showAll ? 12 : helfData ? 24 : 12}
                  lg={showAll ? 12 : helfData ? 24 : 12}
                >
                  <span className="fontTitleSub">รายงานที่สำเร็จ</span>
                  <Row
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    className={helfData ? "" : "center-box"}
                    style={{ marginTop: helfData ? "20px" : "0px" }}
                  >
                    {data1.map((items, gIndex) => {
                      return (
                        <>
                          <Col
                            xs={helfData ? 12 : 24}
                            sm={helfData ? 12 : 24}
                            md={helfData ? 12 : 24}
                          >
                            {brk ? (
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
                                    {items.type}{" "}
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
                                    {items.value}
                                  </span>
                                  <span
                                    className="text-legend"
                                    style={{
                                      color: !dataTextColor
                                        ? "#000"
                                        : dataTextColor[gIndex],
                                    }}
                                  >
                                    &nbsp;&nbsp;{unit}{" "}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span
                                className="text-legend"
                                style={{
                                  color: !dataTextColor
                                    ? "#000"
                                    : dataTextColor[gIndex],
                                }}
                              >
                                {items.type}{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {formatCurrency(items.value)} &nbsp;&nbsp;{unit}
                              </span>
                            )}
                          </Col>
                          {gIndex == 0 && (
                            <Col
                              md={1}
                              style={{ borderLeft: "3px solid #4E5C8480" }}
                            ></Col>
                          )}
                        </>
                      );
                    })}
                  </Row>
                </Col>

                {text && (
                  <Col
                    xs={24}
                    sm={24}
                    md={showAll ? 12 : 24}
                    lg={showAll ? 12 : 24}
                    className="box-plols"
                  >
                    <div className="center-box">
                      <span className="text-plots">{countNum1}</span>
                      <br />
                      <span className="unit-text-plots">{unit}</span>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
            <Col xs={12} style={{ borderLeft: "1px solid #4E5C8480" }}>
              <Row lg={24} className="box-plols-detail">
                <Col
                  xs={24}
                  sm={24}
                  md={showAll ? 12 : helfData ? 24 : 12}
                  lg={showAll ? 12 : helfData ? 24 : 12}
                >
                  <span className="fontTitleSub">รายงานที่ไม่สำเร็จ</span>
                  <Row
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    className={helfData ? "" : "center-box"}
                    style={{ marginTop: helfData ? "20px" : "0px" }}
                  >
                    {data2.map((items, gIndex) => {
                      return (
                        <>
                          <Col
                            xs={helfData ? 12 : 24}
                            sm={helfData ? 12 : 24}
                            md={helfData ? 12 : 24}
                          >
                            {brk ? (
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
                                    {items.type}{" "}
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
                                    {items.value}
                                  </span>
                                  <span
                                    className="text-legend"
                                    style={{
                                      color: !dataTextColor
                                        ? "#000"
                                        : dataTextColor[gIndex],
                                    }}
                                  >
                                    &nbsp;&nbsp;{unit}{" "}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span
                                className="text-legend"
                                style={{
                                  color: !dataTextColor
                                    ? "#000"
                                    : dataTextColor[gIndex],
                                }}
                              >
                                {items.type}{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {formatCurrency(items.value)} &nbsp;&nbsp;{unit}
                              </span>
                            )}
                          </Col>
                          {gIndex == 0 && (
                            <Col
                              md={1}
                              style={{ borderLeft: "3px solid #4E5C8480" }}
                            ></Col>
                          )}
                        </>
                      );
                    })}
                  </Row>
                </Col>

                {text && (
                  <Col
                    xs={24}
                    sm={24}
                    md={showAll ? 12 : 24}
                    lg={showAll ? 12 : 24}
                    className="box-plols"
                  >
                    <div className="center-box">
                      <span className="text-plots">{countNum2}</span>
                      <br />
                      <span className="unit-text-plots">{unit}</span>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
export default MultiPieFull;
