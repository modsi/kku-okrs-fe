import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Row } from 'antd';
import BorderWrap from '../../items/BorderWrap'

import PieFull from './_component/PieFull';
import { useDispatch, useSelector } from 'react-redux'
import { LIST_DASHBOARD, ListDashboardTwoAction } from '../../../redux/actions/DashboardAction'

const Course = () => {

    const dispatch = useDispatch()
    const storeListDashboard = useSelector(state => state?.main?.[LIST_DASHBOARD])
    const [isLoading, setIsLoading] = useState(false);
    const [fetchData, setFetchData] = useState(false);

    useEffect(() => {
        handleListDashboard();
    }, [])

    useEffect(() => {
        if (storeListDashboard && storeListDashboard.data) {
            // let data = [];
            // if (storeListDashboard.data.OKRs) setDataOKRs(setData(storeListDashboard.data.OKRs));

            // if (storeListDashboard.data.overall) setDataPlan(setData(storeListDashboard.data.overall));

            // if (storeListDashboard.data.success) setDataSuccess(setData(storeListDashboard.data.success));

            // if (storeListDashboard.data.pic) setDataSource(storeListDashboard.data.pic);

            setFetchData(true);
        } else {
            setFetchData(false);
        }
    }, [storeListDashboard])

    async function handleListDashboard() {
        dispatch(await ListDashboardTwoAction())
    }

    const gridStyle = {
        width: '48%',
        textAlign: 'center',
        margin: '1%',
    };

    const gridTableStyle = {
        width: '98%',
        textAlign: 'center',
        margin: '1%',
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 50,
            fixed: 'left',
        },
        {
            title: 'ประเด็นยุทธศาสตร์',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 80,
            render: (_, record) => record?.name + ' ' + record.lastName
        },
        {
            title: 'ดำเนินการแล้ว',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            width: 80,
        },
        {
            title: 'ยังไม่ดำเนินการ',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            width: 80,
        },
        {
            title: 'งบประมาณทั้งหมด',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            fixed: 'right',
            width: 80,
        }
        ,
        {
            title: 'งบประมาณที่ใช้',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            fixed: 'right',
            width: 80,
        }
        ,
        {
            title: 'งบประมาณคงเหลือ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            fixed: 'right',
            width: 80,
        }
    ];

    const columns2 = [
        {
            title: '#',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
            width: 50,
            fixed: 'left',
        },
        {
            title: 'SDGs',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 80,
            render: (_, record) => record?.name + ' ' + record.lastName
        },
        {
            title: 'โครงการทั้งหมด',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            width: 80,
        },
        {
            title: 'งบประมาณที่ใช้',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            fixed: 'right',
            width: 80,
        }
    ];

    const dataSummary = [
        {
            type: 'แบบรายงานที่ 1',
            value: 54
        },
        {
            type: 'แบบรายงานที่ 2',
            value: 40
        },
    ];

    const dataBudget = [
        {
            type: 'งบประมาณที่ใช้ไปแล้ว',
            value: 3203000
        },
        {
            type: 'งบประมาณคงเหลือ',
            value: 6207000
        },
    ];

    const dataSDGs = [
        {
            type: 'แบบรายงานที่ 1',
            value: 54
        },
        {
            type: 'แบบรายงานที่ 2',
            value: 40
        },
    ];

    const dataCS = [
        {
            type: 'แบบรายงานที่ 1',
            value: 54
        },
        {
            type: 'แบบรายงานที่ 2',
            value: 40
        },
    ];

    return (
        <>
            {
                fetchData && (
                    <div className='container-course'>
                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>ประเด็นยุทธศาสตร์คณะ (ภาพรวมคณะ)</span>
                        </div>

                        <Row style={{ paddingBottom: '20px' }}>
                            <Col xs={24} sm={24} md={10} lg={10}>
                                <PieFull title={'สรุปจำนวนโครงการที่ดำเนินการแล้ว'} width={200} height={200} data={dataSummary} dataColor={['#f6c863', '#ef5261']} dataTextColor={['#A15219', '#45B649']} text={true} pie={false} unit={'โครงการ'} />
                            </Col>
                            <Col xs={0} sm={0} md={1} lg={1} style={{maxWidth: '2%'}}></Col>
                            <Col xs={24} sm={24} md={13} lg={13} className="box-plan">
                                <PieFull title={'สรุปงบประมาณ'} data={dataBudget} width={200} height={200} dataColor={['#ef5261', '#f6c863']} backgroundColor={'linear-gradient(90deg, rgba(161, 255, 206, 0.25) 0.76%, rgba(250, 255, 209, 0.25) 100%)'} dataTextColor={['#ef5261', '#f6c863']} unit={'บาท'} />
                            </Col>
                        </Row>

                        <Card type="inner" >
                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns} />
                        </Card>
                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>SDGs (ภาพรวมคณะ)</span>
                        </div>
                        <Row style={{ paddingBottom: '20px' }}>
                            <Col xs={24} sm={24} md={10} lg={10}>
                                <PieFull title={'สรุปจำนวนโครงการตาม SDGs'} width={200} height={200} data={dataSDGs} dataColor={['#f6c863', '#ef5261']} dataTextColor={['#A15219', '#45B649']} text={true} pie={false} unit={'รายการ'} />
                            </Col>
                            <Col xs={0} sm={0} md={1} lg={1} style={{maxWidth: '2%'}}></Col>
                            <Col xs={24} sm={24} md={13} lg={13} className="box-plan">
                                <PieFull title={'สรุปงบประมาณ'} data={dataBudget} width={200} height={200} dataColor={['#ef5261', '#f6c863']} backgroundColor={'linear-gradient(90deg, rgba(255, 175, 189, 0.25) 0%, rgba(250, 255, 209, 0.25) 100%, rgba(255, 195, 160, 0.25) 100%)'} dataTextColor={['#ef5261', '#f6c863']} unit={'บาท'} />
                            </Col>
                        </Row>
                        <Card
                            type="inner"
                        >
                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns2} />
                        </Card>
                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>21<sup><strong>st</strong></sup> Century Skills (ภาพรวมคณะ) </span>
                        </div>
                        <Row style={{ paddingBottom: '20px' }}>
                            <Col xs={24} sm={24} md={10} lg={10}>
                                <PieFull title21={true} width={200} height={200} data={dataSDGs} dataColor={['#f6c863', '#ef5261']} dataTextColor={['#A15219', '#45B649']} text={true} pie={false} unit={'รายการ'} />
                            </Col>
                            <Col xs={0} sm={0} md={1} lg={1}></Col>
                            <Col xs={24} sm={24} md={13} lg={13} className="box-plan">
                                <PieFull title={'สรุปงบประมาณ'} data={dataCS} width={200} height={200} dataColor={['#ef5261', '#f6c863']} backgroundColor={'linear-gradient(90deg, rgba(117, 255, 220, 0.25) 0%, rgba(163, 216, 255, 0.25) 51.04%, rgba(248, 215, 251, 0.25) 100%)'} dataTextColor={['#ef5261', '#f6c863']} unit={'บาท'} />
                            </Col>
                        </Row>
                        <Card
                            type="inner"
                        >
                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns2} />
                        </Card>

                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>ความสำเร็จของแผน</span>
                        </div>
                        <Row style={{ paddingBottom: '20px' }}>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <PieFull title21={true} title={'สรุปจำนวนโครงการตาม 21st Century Skills'} width={200} height={200} data={dataSDGs} dataColor={['#f6c863', '#ef5261']} dataTextColor={['#A15219', '#45B649']} text={true} unit={'รายการ'} />
                            </Col>
                        </Row>

                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>ผลการดำเนินงานตามกลุ่มงาน  </span>
                        </div>
                        <Card
                            className='box-table'
                            type="inner"
                        >

                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns2} />
                        </Card>

                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>ผลการดำเนินงานตามสาขาวิชา  </span>
                        </div>
                        <Card
                            className='box-table'
                            type="inner"
                        >

                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns2} />
                        </Card>

                        <div style={{ padding: '20px 15px 10px 15px' }}>
                            <span className="head-plots" style={{ margin: "10px 0px" }}>ผลการดำเนินงานตามศูนย์ </span>
                        </div>
                        <Card
                            className='box-table'
                            type="inner"
                        >

                            <Table
                                className='table-user custom-table-dashboard'
                                rowKey={(record, index) => record.key}
                                style={{ whiteSpace: 'pre' }}
                                loading={isLoading}
                                scroll={{ x: 'max-content' }}
                                size="small"
                                // dataSource={dataSource}
                                columns={columns2} />
                        </Card>
                    </div>
                )
            }

        </>
    )
}
export default Course;