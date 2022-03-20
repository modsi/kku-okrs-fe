import React, { useState } from 'react';
import { Card, Row, Col, Table } from 'antd';
import DemoColumn from '../../items/DemoColumn'
import DemoPie from '../../items/DemoPie'
import DemoPie2 from '../../items/DemoPie2'
import DemoColumn2 from '../../items/DemoColumn2'
import DemoBar from '../../items/DemoBar'

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dataSource = [];
    const columns = [
        {
            title: 'ลำดับ',
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

    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title={"ผลการดำเนินงานตาม OKRs"} className="rounded" >
                            <DemoColumn />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={"ผลการดำเนินงานตามแผนปฏิบัติการ"} className="rounded" >
                            <DemoPie />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={"ความสำเร็จของแผน"} className="rounded" >
                            <DemoPie2 />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col span={6}>
                        <Card title={"สรุปจำนวนโครงการตามประเด็นยุทธศาสตร์คณะ"} className="rounded" >
                            <DemoColumn2 />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"สรุปจำนวนโครงการตามเสาหลักมหาวิทยาลัย"} className="rounded" >
                            <DemoBar />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"สรุปจำนวนโครงการตาม SDGs"} className="rounded" >
                            <DemoColumn />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"สรุปจำนวนโครงการตาม 21 Century Skill"} className="rounded" >
                            <DemoColumn />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Card title={"ผลการดำเนินงานตามกลุ่มงาน"} className="rounded" >
                            <Row gutter={24} className="row-inquiry-customer">
                                <Col span={24} style={{ textAlign: "center" }}>
                                    <Table
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
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Dashboard;