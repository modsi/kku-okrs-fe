import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from "../../../utils/Elements";
import {
  FaIndent,
  FaAdn,
  FaAdversal,
  FaBuromobelexperte,
  FaCalendarDay,
  FaCalendarAlt,
  FaFileUpload,
  FaCalculator,
  FaCheckSquare,
  FaList,
  FaRecordVinyl,
  FaLink,
  FaMailBulk,
  FaPhoneAlt,
} from "react-icons/fa";
import moment from "moment";
import {
  StoreTemplateAction,
  STORE_TEMPLATE,
} from "../../../redux/actions/StoreSearchAction";
import {
  LIST_TYPE_TEPM,
  LIST_FIELD_TEPM,
  ListFieldMasterTemplateAction,
} from "../../../redux/actions/ListMasterAction";
import SetOptionsForSelect, {
  SetOptionsForSelectSetLable,
} from "../../items/SetOptionsForSelect";
import {
  ConfirmModalEditText,
  SuccessModal,
  ErrorModalMassageHtml,
} from "../../items/Modal";
import { SaveTempateAction } from "../../../redux/actions/TemplateAction";
import {
  LIST_TEMPLATES,
  ListTemplateAction,
} from "../../../redux/actions/TemplateAction";
import logo from "../../../../assets/images/favicon-96x96.png"

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const FormReport = ({ form }) => {
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


  async function setTemplate(data) {
    dispatch(await StoreTemplateAction(data));
  }

  const handleClickCancel = () => {
    setIsModalAddEditVisible(false);
  };

  useEffect(() => {
    handleClickCancel();
    setLayoutTemplate(storeTemplate)
  }, [storeTemplate]);

  const setLayoutTemplate = (store) => {
    console.log('start setLayoutTemplate', store)
    let listField = []
    let components = []
    if (store?.component) {
      components = [...store?.component]
      components.sort((a, b) => (a.index > b.index) ? 1 : -1)
    }
    components?.map((currentItem) => {
      let size = currentItem.size === 'long' ? 24 : 12
      const formItemLayout =
        currentItem.isSubTitle ? {
          labelCol: {
            span: 20,
          },
          wrapperCol: {
            span: 20,
          },
          style: { paddingLeft: '50px' }
        }
          : {
            labelCol: {
              span: 24,
            },
            wrapperCol: {
              span: 24,
            }
          };
      let field = (
        <>
          <Col xs={24} sm={24} md={size} lg={size} xl={size} style={{ textAlign: currentItem.align ?? "left", paddingRight: '20px' }}>

            {currentItem.type === 'table' ?
              <>
                <Text>{currentItem.label}</Text>
                {setTableContent(currentItem.columns, currentItem.rows)}
              </>
              : currentItem.type === 'title' ?
                (<Text style={currentItem.isSubTitle ? { paddingLeft: '50px' } : {}}>{currentItem?.label}</Text>)
                : (<Form.Item
                  className="template-text"
                  labelAlign='left'
                  labelWrap='true'
                  {...formItemLayout}
                  layout={currentItem.labelPosition ?? 'vertical'}
                  label={currentItem.label}
                  name={currentItem.key}
                // rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
                >
                  {currentItem.type === 'textArea' ?
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
                                (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)
                                : currentItem.type === 'range_date' ?
                                  (<RangePicker />)
                                  : currentItem.type === 'upload' ?
                                    (<Upload {...propsUpload}>
                                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>)
                                    // : currentItem.type === 'email' ?
                                    // (<Input placeholder="Please enter email." onChange={(e) => form.validateFields()} />)                                                                                        
                                    : (<Input />)
                  }
                </Form.Item>
                )}

          </Col>
        </>
      )
      listField.push(field)
    })
    setListField(listField)
  }

  const setTableContent = (options, row) => {
    let dataSource = []
    let columns = []
    options?.sort((a, b) => (a.index > b.index) ? 1 : -1)
    options.map((item, index) => {
      let col = {
        title: item.colLabel ?? 'column label',
        dataIndex: item.colKey ?? ("colKey" + item.index),
        key: item.colKey ?? ("colKey" + item.index),
      }
      columns.push(col);
    })

    for (let i = 0; i < row; i++) {
      let d = {}
      d.key = i
      d.index = i + 1
      columns.map((c) => {
        Object.assign(d, { [c.dataIndex]: null })
      });
      dataSource.push(d)
    }

    const EditableCell = ({
      dataIndex,
      index,
      record,
      ...restProps
    }) => {
      // console.log(dataIndex,record,index)
      return (
        <td {...restProps} style={{ padding: '2px' }}>
          <Form.Item
            name={dataIndex + '_' + record?.index}
            style={{ margin: 0, padding: 0 }}
          >
            <Input
              style={{ width: '100%', textAlign: "left" }}
              size="small"
            />

          </Form.Item>

        </td>
      );
    };


    const mergedColumns = columns.map(col => {
      return {
        ...col,
        onCell: (record, index) => ({
          record,
          index,
          dataIndex: col.dataIndex,
        }),
      };
    });

    return (
      <>
        <Table
          dataSource={dataSource}
          columns={mergedColumns}
          pagination={false}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
        />
      </>
    )
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