import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography, Table, Form, PageHeader, Radio, Space } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import ConfigTemplate from './ConfigTemplate'
import { tem1, tem2 } from '../../../../template-mock'

const { Text, Link } = Typography;
const SettingTemplate = ({ data }) => {
    const [dataSource, setDataSource] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [key, setKey] = useState([])
    const isCheck = (keychk) => key.includes(keychk);

    useEffect(() => {
        let d = []
        data?.component?.map(c => {
            let comp = { ...c }
            d.push(comp)
        })
        setDataSource(d)
    }, [data])

    const columns = [
        {
            title: 'ลำดับ',
            align: 'center',
            width: 50,
            render: (text, record, index) => index + 1 + '.'
        },
        {
            title: 'รายการ',
            dataIndex: 'label',
            align: 'left',
            width: 80,
            render: (_, record) => record?.label
        },
        {
            title: 'การกำหนดสิทธิ์',
            align: 'center',
            width: 400,
            render: (_, record) => {
                const a = isCheck(record.index + '_a');
                const b = isCheck(record.index + '_b');
                const c = isCheck(record.index + '_c');
                const d = isCheck(record.index + '_d');
                return (
                    <div className="text-center">
                        {/* <Radio.Group disabled={!isEdit}>
                        <Radio.Button value="1">แผนปฏิบัติการ</Radio.Button>
                    </Radio.Group>
                    <Radio.Group disabled={!isEdit}>
                        <Radio.Button value="1">แผนงบประมาณ</Radio.Button>
                    </Radio.Group>
                    <Radio.Group disabled={!isEdit}>
                        <Radio.Button value="1">แผนการเงิน</Radio.Button>
                    </Radio.Group>
                    <Radio.Group disabled={!isEdit}>
                        <Radio.Button value="1">ผู้ใช้งาน</Radio.Button>
                    </Radio.Group> */}
                        <Button disabled={!isEdit} className={a ? "pre-button" : "nol-button"} onClick={() => setKeyIsChk(record.index + '_a', a)}><Text className="big6-title">แผนปฏิบัติการ</Text></Button>
                        <Button disabled={!isEdit} className={b ? "pre-button" : "nol-button"} onClick={() => setKeyIsChk(record.index + '_b', b)}><Text className="big6-title">แผนงบประมาณ</Text></Button>
                        <Button disabled={!isEdit} className={c ? "pre-button" : "nol-button"} onClick={() => setKeyIsChk(record.index + '_c', c)}><Text className="big6-title">แผนการเงิน</Text></Button>
                        <Button disabled={!isEdit} className={d ? "pre-button" : "nol-button"} onClick={() => setKeyIsChk(record.index + '_d', d)}><Text className="big6-title">ผู้ใช้งาน</Text></Button>
                    </div>
                )
            }
        },
    ];

    const setKeyIsChk = (k, check) => {
        console.log('setKeyIsChk >> ', k, check)
        if (check) {
            let kList = key.filter(kc => kc !== k).map(kf => kf)
            setKey(kList)
            // setKey([])
        } else {
            setKey([...key, k])
            // setKey([k])

        }
    }

    // console.log('data , dataSource >> ', data, dataSource)
    return (
        <>
            <div className='container-user'>
                <Card title={"การกำหนดสิทธิ์ Role & Permission"} className="rounded  container-card" >
                    <Row gutter={24}>
                        <Col span={12} style={{ textAlign: "left" }}>
                            <Text strong>{data.type_name}</Text>
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                            {!isEdit ?
                                <Button
                                    className="pre-button"
                                    style={{ marginBottom: '10px' }}
                                    onClick={() => setIsEdit(true)}
                                >
                                    <Text className="big6-title">แก้ไข</Text>
                                </Button>
                                : (
                                    <>
                                        <Space>
                                            <Button
                                                className="nol-button"
                                                style={{ marginBottom: '10px' }}
                                                onClick={() => setIsEdit(false)}
                                            >
                                                <Text className="big6-title">ยกเลิก</Text>
                                            </Button>
                                            <Button
                                                className="pre-button"
                                                style={{ marginBottom: '10px' }}
                                            // onClick={() => setShowConfigPage(true)}
                                            >
                                                <Text className="big6-title">บันทึก</Text>
                                            </Button>
                                        </Space>
                                    </>
                                )
                            }
                        </Col>
                        <Col span={24} style={{ textAlign: "center" }}>
                            <Table
                                className='table-user'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                bordered={false}
                                dataSource={dataSource}
                                pagination={false}
                                columns={columns} />
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}
export default SettingTemplate;