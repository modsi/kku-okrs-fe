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

    return (
        <div className="grad1" style={{ padding: "40px" }}>
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
                    <Card bordered={false} style={{ width: "100%", height: "100%", textAlign: "left", borderRadius: "10px" }}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: "center" }}>
                                <Image
                                    src={logo}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12}>
                                <Space direction="vertical">
                                    <Text className="big3-title" >Welcome to E - Project</Text>
                                    <Text>Login by your Account</Text>
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ padding: "10px" }}>
                                <Space direction="vertical">
                                    <Text className="big1-title" >Faculty of Humanities and Social Sciences</Text>
                                    <Text className="big2-title" >Khon Kaen University</Text>
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ padding: "10%" }}>

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
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: "center" }}>
                                <Button shape="round" className="g-button" >
                                    <Text className="big4-title" >Document</Text>
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12}>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Homepage;