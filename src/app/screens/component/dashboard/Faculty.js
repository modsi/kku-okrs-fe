import React, { useState } from 'react';
import { Card, Col, Table } from 'antd';
import BorderWrap from '../../items/BorderWrap'

const Faculty = () => {

    const [isLoading, setIsLoading] = useState(false);

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
            title: 'ลำดับ',
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
            title: 'ลำดับ',
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

    return (
        <>
            <Card title={"ภาพรวมคณะ"} >
                <Card type="inner" title="ประเด็นยุทธศาสตร์คณะ (ภาพรวมคณะ)" >
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid hoverable={false} style={gridTableStyle}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered
                            // dataSource={dataSource}
                            columns={columns} />
                    </Card.Grid>
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="SDGs (ภาพรวมคณะ)"
                >
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid hoverable={false} style={gridTableStyle}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered
                            // dataSource={dataSource}
                            columns={columns2} />
                    </Card.Grid>
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Century Skill (ภาพรวมคณะ)"
                >
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid hoverable={false} style={gridTableStyle}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered
                            // dataSource={dataSource}
                            columns={columns} />
                    </Card.Grid>
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="ผลการดำเนินงานตามกลุ่มงาน (ภาพรวมคณะ)"
                >
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid hoverable={false} style={gridTableStyle}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered
                            // dataSource={dataSource}
                            columns={columns} />
                    </Card.Grid>
                </Card>
            </Card>
        </>
    )
}
export default Faculty;