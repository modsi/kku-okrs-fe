import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'Group A',
      value: 27,
    },
    {
      type: 'Group B',
      value: 25,
    },
    {
      type: 'Group C',
      value: 18,
    },
    {
      type: 'Group D',
      value: 15,
    },
    {
      type: 'Group E',
      value: 10,
    },
    {
      type: 'Group F',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
export default DemoPie;