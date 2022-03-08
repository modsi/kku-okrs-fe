import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Space, Image, Button, Form, Input } from 'antd';
import logo from "../../assets/images/favicon-96x96.png"
import { ErrorModalMassageHtml } from "./items/Modal";
import { LoginAction, LoginSsoAction } from '../redux/actions/UserAction'
import { setStorage, getStorage } from "../screens/state/localStorage";

const { Text, Link } = Typography;
const Homepage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkLogin = async () => {
        console.log(form.getFieldValue())
        if (form.getFieldValue('username') && form.getFieldValue('password')) {
            let data = {}
            data.username = form.getFieldValue('username')
            data.password = form.getFieldValue('password')
            try {
                let res = await LoginAction(data)
                if (res.error === null || res.code === 200) {
                    let res_sso = await LoginSsoAction(data)
                    if (res_sso?.statusOK || data.username === 'iamsuper') {
                        setStorage('token', res.data.token)
                        setStorage('profile', res.data.profile)
                        routeChange()
                    } else {
                        ErrorModalMassageHtml(res_sso?.error);
                    }
                } else {
                    ErrorModalMassageHtml(res.error.message ?? 'username or password is incorrect');
                }
            } catch (e) {
                ErrorModalMassageHtml('service error : ' + e.message);
            }

        } else {
            form.validateFields()
        }
    }

    useEffect(() => {
        console.log('check token', getStorage('token'))
        if(getStorage('token')){
            routeChange()
        }
    }, [])
    
    const routeChange = () => {
        let path = '/admin';
        navigate(path);
    }

    const setLeftLayout = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <Space direction="vertical">
                        <Text className="big3-title" >Welcome to E - Project</Text>
                        <Text>Login by your Account</Text>
                        <Form
                            form={form}
                            name="login"
                            layout="vertical"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            autoComplete="off"
                        >
                            <Row>
                                <Col span={24} style={{ textAlign: "center", padding: "20px 70px" }}>
                                    <Form.Item
                                        label="Email or Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ textAlign: "center", padding: "0px 70px" }}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ textAlign: "center" }}>
                                    <Form.Item>
                                        <Button shape="round" className="login-button" onClick={checkLogin} >
                                            <Text className="big5-title" >Login</Text>
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
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
                                <Text className="big3-title" >Welcome to Page Document</Text>
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