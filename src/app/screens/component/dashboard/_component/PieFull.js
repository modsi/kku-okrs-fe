import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Space, Button } from 'antd';
import { Pie, measureTextWidth } from '@ant-design/plots';

const PieFull = (props) => {

  const {
    width = 300,
    height = 300,
    titleFirst = '',
    title = '',
    data = [],
    dataColor = false,
    showRefresh = false,
    dataTextColor = false,
    backgroundColor = '#fff',
    textInPlots = '#fff',
    innerRadius = false,
    unit = '%',
    text = false,
    pie = true
  } = props;

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (text && pie)
      setShowAll(true);

  }, [text, pie])


  const config = {
    width: width,
    height: height,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    legend: false,
    color: dataColor,
    innerRadius: innerRadius,
    label: {
      type: 'inner',
      offset: '-50%',
      autoRotate: false,
      content: ({ value }) => `${value} ${unit}`,
      style: {
        fontSize: 13,
        textAlign: 'center',
        fill: textInPlots
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    statistic: false,
  };
  return (
    <Card className="rounded plots-grap" style={{ width: '100%', background: `${backgroundColor}` }}>
      {
        titleFirst != '' ? (
          <span className="head-plots">{titleFirst}</span>
        ) : (
          <span className="head-plots-second">{title}</span>
        )
      }
      <Row lg={24} className="box-plols-detail">
        <Col xs={24} sm={24} md={showAll ? 8 : 12} lg={showAll ? 8 : 12}>
          <div className="center-box">
            {
              data.map((items, gIndex) => {
                return (
                  <div>
                    <span className="text-legend" style={{ color: !dataTextColor ? '#000' : dataTextColor[gIndex] }}>{items.type} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{items.value} &nbsp;&nbsp;{unit}</span>
                  </div>
                )

              })
            }
          </div>

          {
            showRefresh && (
              <div className="end-box">
                <Button shape="round" className="g-button custom-button" >
                  Refresh
                </Button>
              </div>
            )
          }


        </Col>

        {
          text && (
            <Col xs={24} sm={24} md={showAll ? 8 : 12} lg={showAll ? 8 : 12} className="box-plols" style={{ width: width, height: height }}>
              <div className="center-box">
                <span className='text-plots'>94</span><br />
                <span className='unit-text-plots'>{unit}</span>
              </div>

            </Col>
          )
        }

        {
          pie && (
            <Col xs={24} sm={24} md={showAll ? 8 : 12} lg={showAll ? 8 : 12} className="box-plols" style={{ width: width, height: height }}>
              <Pie {...config} />
            </Col>
          )
        }



        {
          showRefresh && (
            <div className="end-box-mobile">
              <Button shape="round" className="g-button custom-button" >
                Refresh
              </Button>
            </div>
          )
        }
      </Row>

    </Card>

  )
};
export default PieFull;