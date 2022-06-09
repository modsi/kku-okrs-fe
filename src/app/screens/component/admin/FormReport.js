import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { STORE_TEMPLATE } from "../../../redux/actions/StoreSearchAction";
import { getStorage } from "../../state/localStorage";
import logo from "../../../../assets/images/favicon-96x96.png"
import moment from "moment";
import LayoutReport from './LayoutReport'

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const FormReport = ({ form, isView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigPage, setShowConfigPage] = useState(false);
  const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
  const [listField, setListField] = useState([]);
  const [addEditTitle, setAddEditTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storeTemplate = useSelector((state) => state?.storeSearchReducer?.[STORE_TEMPLATE]);
  const [fieldContent, setFieldContent] = useState(null);
  const [templateId, setTemplateId] = useState(null);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 22 },
    layout: "Inline",
  };

  useEffect(() => {
    if (storeTemplate) {
      setLayoutReport(storeTemplate)
    }
  }, [storeTemplate]);

  const setLayoutReport = (store) => {
    setListField(<LayoutReport form={form} store={store?.component?.filter(l => l.permission !== 2 && l.permission !== 0)} isView={isView} />)
  }

  return (
    <>
      <Card
        title={""}
        className="rounded"
        loading={isLoading}
        style={{ width: '100%' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form {...layout} form={form}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: "center" }}>
                  <Image
                    src={logo}
                    preview={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingBottom: '20px' }}>
                  <Text strong>{storeTemplate?.name}</Text>
                </Col>
              </Row>
              <Row>
                {listField}
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default FormReport;