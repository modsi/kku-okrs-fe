import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Space, Button } from 'antd';
import { Column } from '@ant-design/plots';

const Graph = (props) => {

  const {
    width = 300,
    height = 300,
    titleFirst = '',
    title = '',
    data = {dataGraph: [], act: []},
    dataColor = '#5B8FF9',
    showRefresh = false,
    dataTextColor = false,
    bachgroundColor = '#fff',
    textInPlots = '#fff'
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

  return (
    <Card className="rounded plots-grap" style={{ width: '100%', backgroundColor: bachgroundColor }}>
      {
        titleFirst != '' ? (
          <span className="head-plots">{titleFirst}</span>
        ) : (
          <span className="head-plots-second">{title}</span>
        )
      }
      <Row lg={24}>

        <Col xs={24} sm={24} md={8} lg={8} className="box-plols-detail">
          <div class="center-box">
            {
              data?.act.map((items, gIndex) => {
                return (
                  <div>
                    <span className="text-legend" style={{ color: !dataTextColor ? '#000' : dataTextColor[gIndex] }}>{items.type} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{items.value} &nbsp;&nbsp;%</span>
                  </div>
                )

              })
            }
          </div>

          {
            showRefresh && (
              <div class="end-box">
                <Button shape="round" className="g-button custom-button" >
                  Refresh
                </Button>
              </div>
            )
          }


        </Col>
        <Col xs={24} sm={24} md={16} lg={16} className="box-plols">
          <Column {...config} />
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