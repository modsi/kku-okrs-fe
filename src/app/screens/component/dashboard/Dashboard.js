import React, { useState } from 'react';
import { Card, Row, Col, Table } from 'antd';
import DemoColumn from '../../items/DemoColumn'
import DemoPie from '../../items/DemoPie'
import DemoPie2 from '../../items/DemoPie2'
import DemoColumn2 from '../../items/DemoColumn2'
import DemoBar from '../../items/DemoBar'

import PieFull from './_component/PieFull';
import Graph from './_component/Graph';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dataSource = [];
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
            title: 'กลุ่มงาน',
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
            title: 'ร้อยละ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            fixed: 'right',
            width: 80,
        }
    ];

    const dataOKRs = [
        {
            type: 'ดำเนินการแล้ว',
            value: 57
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 43
        },
    ];

    const dataPlan = [
        {
            type: 'ดำเนินการแล้ว',
            value: 70
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 30
        },
    ];

    const dataStrategic = [
        {
            type: 'ดำเนินการแล้ว',
            value: 70
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 30
        },
    ];

    const dataSDG = [
        {
            type: 'ดำเนินการแล้ว',
            value: 70
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 30
        },
    ];

    const dataCS = [
        {
            type: 'ดำเนินการแล้ว',
            value: 70
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 30
        },
    ];

    const dataSuccess = [
        {
            type: 'ดำเนินการแล้ว',
            value: 57
        },
        {
            type: 'ยังไม่ดำเนินการ',
            value: 43
        },
    ];



    return (
        <>
            <div className="site-card-wrapper">
                <Row style={{ paddingBottom: '20px' }}>
                    <Col xs={24} sm={24} md={14} lg={14}>
                        <PieFull titleFirst={'ผลการดำเนินงานตาม OKRs'} data={dataOKRs} backgroundColor={'rgba(255, 164, 92, 0.25)'} dataColor={['#f6c863', '#ef5261']} dataTextColor={['#A15219', '#45B649']} showRefresh={true} />
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1}></Col>
                    <Col xs={24} sm={24} md={9} lg={9} className="box-plan">
                        <PieFull title={'ผลการดำเนินงานตามแผนปฏิบัติการ'} data={dataPlan} dataColor={['#35cea1', '#dbffee']} dataTextColor={['#A15219', '#45B649']} textInPlots={'#000'} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <div style={{ paddingBottom: '20px' }}>
                            <Graph title={'สรุปจำนวนโครงการตามประเด็นยุทธศาสตร์คณะ'} width={200} height={200} data={dataStrategic} dataColor={'#fd8e61'} dataTextColor={['#45B649', '#45B649']} />
                        </div>
                        <div style={{ paddingBottom: '20px' }}>
                            <Graph title={'สรุปจำนวนโครงการตามเสาหลักมหาวิทยาลัย'} width={200} height={200} data={dataStrategic} dataColor={'#fd8e61'} dataTextColor={['#EC0E0E', '#EC0E0E']} />
                        </div>
                        <div style={{ paddingBottom: '20px' }}>
                            <PieFull title={'สรุปจำนวนโครงการตาม SDGs'} width={200} height={200} data={dataSDG} dataColor={['#caa5f1', '#a3a4a3']} dataTextColor={['#A15219', '#45B649']} textInPlots={'#000'} />
                        </div>
                        <div style={{ paddingBottom: '20px' }}>
                            <PieFull title={'สรุปจำนวนโครงการตาม 21 Century Skill'} width={200} height={200} data={dataCS} dataColor={['#a7ff83', '#086972']} dataTextColor={['#A15219', '#45B649']} />
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1}></Col>
                    <Col xs={24} sm={24} md={15} lg={15}>
                        <div style={{ paddingBottom: '20px' }}>
                            <PieFull title={'ความสำเร็จของแผน'} data={dataSuccess} width={250} height={250} dataTextColor={['#A15219', '#45B649']} innerRadius={0.60} />
                        </div>
                        <div>
                            <Card className="rounded " >
                                <div style={{padding: '0px 15px 15px 15px'}}>
                                    <span className="head-plots" style={{ margin: "10px 0px" }}>ผลการดำเนินงานตามกลุ่มงาน</span>
                                </div>

                                <Row gutter={24} className="row-inquiry-customer">
                                    <Col span={24} style={{ textAlign: "center" }}>
                                        <Table
                                            className='table-user custom-table-dashboard'
                                            rowKey={(record, index) => record.key}
                                            style={{ whiteSpace: 'pre' }}
                                            loading={isLoading}
                                            scroll={{ x: 'max-content' }}
                                            size="small"
                                            bordered
                                            dataSource={dataSource}
                                            columns={columns} />
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Dashboard;