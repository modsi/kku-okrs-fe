import React from 'react';
import { Column } from '@ant-design/plots';

const DemoColumn = () => {
  const data = [
    {
      type: '1-3A',
      value: 0.16,
    },
    {
      type: '4-10A',
      value: 0.125,
    },
    {
      type: '11-30A',
      value: 0.24,
    },
    {
      type: '31-60A',
      value: 0.19,
    },
    {
      type: '1-3B',
      value: 0.22,
    },
    {
      type: '3-10B',
      value: 0.05,
    },
    {
      type: '10-30B',
      value: 0.01,
    },
    {
      type: '30+B',
      value: 0.015,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type === '10-30B' || type === '30+B') {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;