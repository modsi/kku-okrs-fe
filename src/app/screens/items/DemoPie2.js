import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie2 = () => {
  const data = [
    {
      type: 'Group 1',
      value: 27,
    },
    {
      type: 'Group 2',
      value: 25,
    },
    {
      type: 'Group 3',
      value: 18,
    },
    {
      type: 'Group 4',
      value: 15,
    },
    {
      type: 'Group 5',
      value: 10,
    },
    {
      type: 'Group 6',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'AntV\nG2Plot',
      },
    },
  };
  return <Pie {...config} />;
};

export default DemoPie2;