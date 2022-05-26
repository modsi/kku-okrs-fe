import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Row, Col, Space, Button } from "antd";
import { Pie, measureTextWidth } from "@ant-design/plots";
const PieFull = (props) => {
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
  } = props;

  const [showAll, setShowAll] = useState(false);
  const [countNum, setCountNum] = useState(0);

  useEffect(() => {
    sumCount();
    if (text && pie) setShowAll(true);
  }, [text, pie]);

  const sumCount = () => {
    let sum = 0;
    if (text && data && data.length > 0) {
      data.forEach((v) => {
        sum += parseInt(v.value);
      });
    }
    setCountNum(sum);
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
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    legend: false,
    color: dataColor,
    innerRadius: innerRadius,
    label: {
      type: "inner",
      offset: "-50%",
      autoRotate: false,
      content: ({ value }) => `${formatCurrency(value)} ${unit}`,
      style: {
        fontSize: 13,
        textAlign: "center",
        fill: textInPlots,
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    statistic: false,
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
        {pie && (
          <Col
            xs={24}
            sm={24}
            md={showAll ? 8 : 24}
            lg={showAll ? 8 : 24}
            className="box-plols"
            style={{ width: width, height: height }}
          >
            <Pie {...config} />
          </Col>
        )}

        {text && (
          <Col
            xs={24}
            sm={24}
            md={showAll ? 8 : 24}
            lg={showAll ? 8 : 24}
            className="box-plols"
            style={{ width: width, marginBottom: 20 }}
          >
            <div className="center-box" style={{marginTop: 10}}>
              <span className="text-plots">{countNum}</span>
              <br />
              <span className="unit-text-plots">{unit}</span>
            </div>
          </Col>
        )}

        <Col
          xs={24}
          sm={24}
          md={showAll ? 8 : helfData ? 24 : 24}
          lg={showAll ? 8 : helfData ? 24 : 24}
        >
          <Row
            xs={24}
            sm={24}
            md={24}
            lg={24}
            className={helfData ? "" : "center-box"}
            style={{ marginTop: helfData ? "20px" : "0px" }}
          >
            {data.map((items, gIndex) => {
              return (
                <>
                  <Col
                    xs={helfData ? 11 : 24}
                    sm={helfData ? 11 : 24}
                    md={helfData ? 11 : 24}
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
                            {formatCurrency(items.value)}
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
                      <Row>
                        <Col xs={12} style={{textAlign: 'left'}}>
                          <span
                            className="text-legend"
                            style={{
                              color: !dataTextColor
                                ? "#000"
                                : dataTextColor[gIndex],
                            }}
                          >
                            {items.type}
                          </span>
                        </Col>
                        <Col xs={12} style={{textAlign: 'right'}}>
                          <span
                            className="text-legend"
                            style={{
                              color: !dataTextColor
                                ? "#000"
                                : dataTextColor[gIndex],
                            }}
                          >
                            {formatCurrency(items.value)} &nbsp;&nbsp;{unit}
                          </span>
                        </Col>
                      </Row>
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
      </Row>
    </Card>
  );
};
export default PieFull;
