import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Space, Image, Button, Form, Input } from 'antd';
import logo from "../../assets/images/favicon-96x96.png"

const { Text, Link } = Typography;
const Homepage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const routeChange = () => {
        let path = '/admin';
        navigate(path);
    }

    function callback(key) {
        console.log(key);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setLeftLayout = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <Space direction="vertical">
                        <Text className="big3-title" >Welcome to E - Project</Text>
                        <Text>Login by your Account</Text>
                        <Form
                            name="login"
                            layout="vertical"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email or Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button shape="round" className="login-button" onClick={routeChange} >
                                    <Text className="big5-title" >Login</Text>
                                </Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </>
            )
        } else {
            return (
                <>
                    <Row>
                        <Col span={24} style={{ textAlign: "left" }}>
                            <Space direction="vertical">
                                <Text className="big3-title" >Welcome to page Document</Text>
                                <Text>Click for more detail</Text>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="แผนยุทธศาสตร์" bordered={false}>
                                คณะมนุษยศาสตร์และสังคมศาสตร์
                                รายละเอียดแผนยุทธศาสตร์ 4 ปี
                                (พ.ศ. 2564 - 2567)
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="แผนปฏิบัติการ" bordered={false}>
                                รายละเอียดแผนปฏิบัติการ
                                ประจำปีงบ
                                ประมาณ พ.ศ. 2564
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="HUSO - OKRs" bordered={false}>
                                รายละเอียดผลลัพธ์สำคัญ
                                HUSO - OKRs ประจำปีงบประมาณ
                                พ.ศ. 2564
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="ข้อตกลงการปฏิบัติงาน" bordered={false}>

                                ข้อตกลงการปฏิบัติงานตามแผยปฏิบัติการคณะ ปีงบประมาณ พ.ศ. 2564
                            </Card>
                        </Col>
                    </Row>
                </>
            )
        }
    }

    return (
        <div className="grad1" style={{ padding: "40px 130px" }}>
            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Space direction="horizontal">
                        <Text underline>หน้าแรก</Text>
                        <Text underline>เอกสาร</Text>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card bordered={false} style={{ width: "100%", textAlign: "left", borderRadius: "10px" }}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: "center" }}>
                                <Space direction="vertical">
                                    <Image
                                        src={logo}
                                        preview={false}
                                    />
                                    <br />
                                    <Text className="big1-title" >ระบบการบริหารและติดตามผลการดำเนินงาน<br />โครงการคณะมนุษยศาสตร์และสังคมศาสตร์<br />(e-Project)</Text>
                                    <br />
                                    <Text className="big2-title" >Faculty of Humanities and Social Sciences</Text>
                                    <Text className="big2-title" >Khon Kaen University</Text>
                                    <Button shape="round" className="g-button" onClick={() => { setIsLoggedIn(!isLoggedIn) }} >
                                        <Text className="big4-title" >{isLoggedIn === false ? "Document" : "Login"}</Text>
                                    </Button>
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: "left" }}>
                                {setLeftLayout()}
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Homepage;