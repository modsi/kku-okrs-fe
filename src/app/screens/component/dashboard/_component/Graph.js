import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Space, Button } from 'antd';
import { Column } from '@ant-design/plots';

const Graph = (props) => {

  const {
    width = 200,
    height = 200,
    titleFirst = '',
    title = '',
    data = {dataGraph: [], act: []},
    dataColor = '#5B8FF9',
    showRefresh = false,
    dataTextColor = false,
    bachgroundColor = '#fff',
    textInPlots = '#fff',
    title21 = false
  } = props;

  const paletteSemanticRed = '#F4664A';
  const brandColor = dataColor;

  const config = {
    width: width,
    height: height,
    data: data?.dataGraph || [],
    xField: 'name',
    yField: 'value',
    seriesField: '',
    color: ({ name }) => {
      return brandColor;
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
        fontSize: 16
      },
      // content: (originData) => {
      //   const val = parseFloat(originData.value);

      //   if (val < 0.05) {
      //     return (val * 100).toFixed(1) + '%';
      //   }
      // },
      // offset: 10,
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    yAxis: false

  };

  console.log('test', title21   )

  return (
    <Card className="rounded plots-grap" style={{ width: '100%', backgroundColor: bachgroundColor }}>
      {
        titleFirst != '' ? (
          <span className="head-plots">{titleFirst}</span>
      ) : !title21 ? (
          <span className="head-plots-second">{title}</span>
        ) : (
          <span className="head-plots-second">{title21} สรุปจำนวนโครงการตาม 21<sup><strong>st</strong></sup> Century Skills</span>
        )
      }
      <Row lg={24}>

        <Col xs={24} sm={24} md={24} lg={24} className="box-plols">
          <Column {...config} />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} className="box-plols-detail">
          <div style={{textAlign: 'right', marginTop: 25, marginBottom: 5}}>
            {
              data?.act.map((items, gIndex) => {
                return (
                  <>
                    <span className="text-legend" style={{ color: !dataTextColor ? '#000' : dataTextColor[gIndex], paddingRight: 20 }}>{items.type} &nbsp;&nbsp;{items.value} &nbsp;%</span>
                  </>
                )

              })
            }
          </div>
        </Col>

        {
          showRefresh && (
            <div class="end-box-mobile">
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
export default Graph;