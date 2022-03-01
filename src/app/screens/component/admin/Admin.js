import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Table, Modal } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined, PlusOutlined, FileSearchOutlined, PlusCircleFilled } from "@ant-design/icons";

const { Text, Link } = Typography;
const Admin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [addEditTitle, setAddEditTitle] = useState('');

    const columns = [
        {
            title: <Text className="big6-title">รายการ</Text>,
            // dataIndex: 'no',
            align: 'center',
            // width: 50,
            // render: (text, record, index) => ((currentPage - 1) * 10) + index + 1
        }
    ];

    const handleClickCancel = () => {
        setIsModalAddEditVisible(false);
    }

    const newTemplate = () => {
        setIsModalAddEditVisible(true);
        setAddEditTitle('เลือกใช้ Template')
    }

    return (
        <>
            <Card title={"Manage Template"} className="rounded" >
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "right" }} >
                        <Button
                            type="link"
                            onClick={newTemplate}
                        >
                            <PlusCircleFilled className="big3-title" />
                        </Button>
                    </Col >
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Table
                            rowKey={(record, index) => record.key}
                            style={{ whiteSpace: 'pre' }}
                            loading={isLoading}
                            scroll={{ x: 'max-content' }}
                            size="small"
                            bordered={false}
                            // dataSource={dataSource}
                            // onChange={handleTableChange}
                            pagination={true}
                            pageSize={10}
                            columns={columns} />
                    </Col>
                </Row >
            </Card>

            <div>
                <Modal
                    closable={true}
                    title={addEditTitle}
                    visible={isModalAddEditVisible}
                    width={"30%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <>
                        
                    </>
                </Modal>
            </div>
        </>
    )
}
export default Admin;