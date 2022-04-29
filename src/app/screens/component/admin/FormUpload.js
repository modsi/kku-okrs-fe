import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { clearStorege, getStorage } from "../../../screens/state/localStorage";
import moment from "moment";
import {
  StoreTemplateAction,
  STORE_TEMPLATE,
} from "../../../redux/actions/StoreSearchAction";
import { ExportFormCsvAction, ExportFormWordAction } from '../../../redux/actions/FormAction'


const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const FormUpload = ({ form }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigPage, setShowConfigPage] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [listField, setListField] = useState([]);
  const [addEditTitle, setAddEditTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storeTemplate = useSelector(
    (state) => state?.storeSearchReducer?.[STORE_TEMPLATE]
  );
  const [fieldContent, setFieldContent] = useState(null);
  const [templateId, setTemplateId] = useState(null);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 22 },
    layout: "Inline",
  };



  useEffect(() => {
    setLayoutTemplate(storeTemplate)
  }, [storeTemplate]);

  const setLayoutTemplate = (store) => {

  }

  const props = {
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

  const ExportReportCsv = async () => {
    dispatch(await ExportFormCsvAction(storeTemplate))
  }

  const ExportReportWord = async () => {
    dispatch(await ExportFormWordAction(storeTemplate))
  }

  return (
    <>
      <Card
        title={"การแนบไฟล์ และ ดาวน์โหลด"}
        className="rounded"
        loading={isLoading}
        style={{ width: '100%' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={10} style={{ textAlign: "left" }}>
            <Form {...layout} form={form}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* <form ref='uploadForm'
                id='uploadForm'
                action='http://localhost:8000/upload'
                method='post'
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
              </form> */}
            </Form>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Space direction="vertical">
              <Button type="primary" onClick={() => ExportReportCsv()} icon={<DownloadOutlined />} size="large" style={{ width: '300px' }}>
                Download CSV
              </Button>
              <Button type="primary" onClick={() => ExportReportWord()} icon={<DownloadOutlined />} size="large" style={{ width: '300px' }}>
                Download Word
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default FormUpload;