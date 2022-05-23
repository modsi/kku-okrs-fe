import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, PageHeader, Radio, Space } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import ConfigTemplate from './ConfigTemplate'
import { tem1, tem2 } from '../../../../template-mock'
import { ListInstitutionsAction, ListRolesAction, LIST_INSTITUTIONS, LIST_ROLES } from '../../../redux/actions/ListMasterAction'
import { ConfirmModalEditText, SuccessModal, ErrorModalMassageHtml } from "../../items/Modal";
import { LIST_TEMPLATES, ListTemplateAction } from '../../../redux/actions/TemplateAction'
import { UpdateTempateAction } from '../../../redux/actions/TemplateAction'

const { Text, Link } = Typography;
const SettingTemplate = ({ data }) => {
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [key, setKey] = useState([])
    // const isCheck = (keychk) => key.includes(keychk);
    const listRoles = useSelector(state => state?.main?.[LIST_ROLES])
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleListMaster()
        setIsEdit(false)
    }, [])

    async function handleListMaster() {
        dispatch(await ListRolesAction())
    }

    useEffect(() => {
        let d = []
        let components = data?.component ?? []
        components.sort((a, b) => (a.index > b.index) ? 1 : -1)
        components.map(c => {
            let comp = { ...c }
            d.push(comp)
        })
        setDataSource(d)
    }, [data])

    useEffect(() => {
        if (listRoles) {
            let d = []
            let l = listRoles.filter(c=> c.id !== "6" && c.id !== "1" )
            l.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1)
            l.map(c => {
                let comp = { label: (c.id === "1" ? 'ระบบ' : c.role_name), value: parseInt(c.id) }
                if (c.id === "1") {
                    comp.disabled = true
                }
                d.push(comp)
            })
            setOptions(d)
        }
    }, [listRoles])

    const columns = [
      {
        title: "ลำดับ",
        align: "center",
        width: 50,
        render: (text, record, index) => index + 1 + ".",
      },
      {
        title: "รายการ",
        dataIndex: "label",
        align: "left",
        width: 50,
        render: (_, record) => record?.label,
      },
      {
        title: "การกำหนดสิทธิ์",
        align: "center",
        width: 400,
        render: (_, record) => {
          // console.log(record.permission)
          return (
            <div className="text-center template-style">
              <Radio.Group
                value={
                  record.permission === 0
                    ? 1
                    : record.permission
                    ? record.permission
                    : 5
                }
                disabled={!isEdit || record.permission === 0}
                options={options}
                onChange={(e) => updateData(e.target.value, record.key)}
                optionType="button"
                buttonStyle="solid"
              />
            </div>
          );
        },
      },
    ];

    const updateData = (value, key) => {
      console.log("updateData >> ", value, key);
      let d = [];
      let components = dataSource;
      components?.sort((a, b) => (a.index > b.index ? 1 : -1));
      components.map((c) => {
        let comp = { ...c };
        if (comp.key === key) {
          comp.permission = value;
        }
        d.push(comp);
      });
      setDataSource(d);
    };

    const setKeyIsChk = (k, check) => {
      console.log("setKeyIsChk >> ", k, check);
      if (check) {
        let kList = key.filter((kc) => kc !== k).map((kf) => kf);
        setKey(kList);
        // setKey([])
      } else {
        setKey([...key, k]);
        // setKey([k])
      }
    };

    async function saveData() {
      ConfirmModalEditText(onFinish, conditionSave());
    }

    const conditionSave = () => {
      return {
        title: "Confirm",
        content: "Are you sure you want to save ?",
      };
    };

    async function onFinish() {
      setIsLoading(true);
      let store = dataSource;
      data.component = store;
      console.log("onFinish >> data is ", data);
      let res = {};
      if (data.id) {
        data.status = 1;
        data.updated_datetime = moment().format(DATE_FULL);
        res = await UpdateTempateAction(data);
      }
      if (res?.error === null) {
        SuccessModal("Success");
        listTemplate({ str: "" });
      } else {
        ErrorModalMassageHtml(res.error.message);
      }
      setIsLoading(false);
    }

    async function listTemplate(data) {
      dispatch(await ListTemplateAction(data));
    }

    // console.log('data , dataSource >> ', data, dataSource)
    return (
      <>
        <div className="container-user">
          <Card
            title={"การกำหนดสิทธิ์ Role & Permission"}
            className="rounded container-card"
          >
            <Row gutter={24}>
              <Col span={12} style={{ textAlign: "left" }}>
                <Text strong>
                  {data.template_name + " (" + data.type_name + ")"}
                </Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                {!isEdit ? (
                  <Button
                    disabled={data.is_used === true ? true : false}
                    className="pre-button"
                    style={{ marginBottom: "10px" }}
                    onClick={() => setIsEdit(true)}
                  >
                    <Text className="big6-title">แก้ไข</Text>
                  </Button>
                ) : (
                  <>
                    <Space style={{ marginBottom: ".5rem" }}>
                      <Button
                        className="nol-button"
                        onClick={() => setIsEdit(false)}
                      >
                        <Text className="big6-title">ยกเลิก</Text>
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          background: "#389e0d",
                          borderColor: "#389e0d",
                          borderRadius: ".5rem",
                        }}
                        onClick={saveData}
                      >
                        <Text className="big6-title">บันทึก</Text>
                      </Button>
                    </Space>
                  </>
                )}
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <Table
                  className="table-user"
                  rowKey={(record, index) => record.key}
                  style={{ whiteSpace: "pre" }}
                  scroll={{ x: "max-content" }}
                  size="small"
                  bordered={false}
                  dataSource={dataSource}
                  loading={isLoading}
                  pagination={false}
                  columns={columns}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </>
    );
}
export default SettingTemplate;