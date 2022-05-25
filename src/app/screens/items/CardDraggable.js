import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Draggable from "react-draggable";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const CardDraggable = ({ currentItem, items, addItems }) => {

  const eventHandler = (e, data) => {
    console.log('Event Type', e.type);
    console.log({ e, data });
  }

  const propsUpload = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Draggable
      grid={[10, 10]} 
      axis='y'
      // bounds='parent'
      onMouseDown={eventHandler}
      onStart={eventHandler}
      onDrag={eventHandler}
      onStop={eventHandler}
    >
      <div className='card' key={currentItem.id}>
        <Row>
          <Col xs={24} sm={24} md={2} lg={2} xl={2} >
            <Button
              type="link"
              disabled={currentItem.required === 1 ? true : false}
              style={{ padding: '0px', color: currentItem.required === 1 ? 'gray' : 'red' }}
            // onClick={() =>
            //   remove(currentItem.index)
            // }
            >
              <DeleteFilled />
            </Button>
          </Col>
          <Col xs={24} sm={24} md={22} lg={22} xl={22} >
            <Form.Item
              className="template-text"
              // {...formItemLayout}
              layout={currentItem.labelPosition ?? 'vertical'}
              label={currentItem.label}
              name={currentItem.key}
              rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
            >
              {/* <Space direction="horizontal" style={{ width: '100%' }}> */}
              {currentItem.type === 'title' ?
                (<Text strong>{currentItem?.value}</Text>)
                : currentItem.type === 'textArea' ?
                  (<Input.TextArea showCount maxLength={currentItem.maxLength} />)
                  : currentItem.type === 'inputNumber' ?
                    (<InputNumber min={currentItem.min} max={currentItem.max} />)
                    : currentItem.type === 'checkbox' ?
                      (<Checkbox.Group options={currentItem.options} />)
                      : currentItem.type === 'select' ?
                        (<Select
                          mode={currentItem.mode}
                          placeholder="Please select"
                          style={{ width: '100%' }}
                          options={currentItem.options}
                        />)
                        : currentItem.type === 'radio' ?
                          (<Radio.Group
                            options={currentItem.options}
                          />)
                          : currentItem.type === 'day' ?
                            (<DatePicker />)
                            : currentItem.type === 'date_time' ?
                              (<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)
                              : currentItem.type === 'range_date' ?
                                (<RangePicker />)
                                : currentItem.type === 'upload' ?
                                  (<Upload {...propsUpload}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                  </Upload>)
                                  : (<Input />)
              }
              {/* </Space> */}
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Draggable>
  );
};

export default CardDraggable;