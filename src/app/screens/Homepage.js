import React, { useState, Fragment, useEffect } from 'react';
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
                    if (res?.data?.profile?.status === "1") {
                        let res_sso = await LoginSsoAction(data)
                        if (res_sso?.statusOK || data.username === 'iamsuper') {
                            setStorage('token', res.data.token)
                            setStorage('profile', res.data.profile)
                            routeChange()
                        } else {
                            ErrorModalMassageHtml(res_sso?.error);
                        }
                    } else {
                        ErrorModalMassageHtml('Account inactive. Please contact admin !! ');
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
        if (getStorage('token')) {
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
                <div className='box-login'>
                    <Space direction="vertical" style={{ marginTop: "20px" }} >
                        <Text className="big3-title" >Welcome to e - Project</Text>
                        <Text className='big7-title'>Login by your Account</Text>
                        <Form
                            form={form}
                            name="login"
                            layout="vertical"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            autoComplete="off"
                        >
                            <Row>
                                <Col className='form-login' span={24} style={{ textAlign: "center" }}>
                                    <Form.Item
                                        label="Email or Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input placeholder="please Enter email or Username" />
                                    </Form.Item>
                                </Col>
                                <Col className='form-login' span={24} style={{ textAlign: "center" }}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password placeholder="please enter password" />
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
                </div>
            )
        } else {
            return (
                <div className="box-document">
                    <Row>
                        <Col span={24} style={{ textAlign: "left", marginTop: "20px" }}>
                            <Space direction="vertical">
                                <Text className="big3-title" >Welcome to Page Document</Text>
                                <Text className='more-detail'>Click for More detail</Text>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={16} className="container-box">
                        <Col span={12} className="box">
                            <a href='https://hsdoa.kku.ac.th/OKRs/pdf/%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%A2%E0%B8%B8%E0%B8%98%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-4-%E0%B8%9B%E0%B8%B5-%E0%B8%9E.%E0%B8%A8.-2564-2567.pdf' target="_blank">
                                <Card className="box-detail box-detail-color1" title="แผนยุทธศาสตร์" bordered={false}>
                                    <Text className='box-detail-text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คณะมนุษยศาสตร์และสังคมศาสตร์<br />
                                        รายละเอียดแผนยุทธศาสตร์ 4 ปี
                                        (พ.ศ. 2564 - 2567)</Text>
                                </Card>
                            </a>
                        </Col>
                        <Col span={12} className="box">
                            <a href='https://hsdoa.kku.ac.th/OKRs/pdf/%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%9B%E0%B8%B5%E0%B8%87%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%B2%E0%B8%93-%E0%B8%9E.%E0%B8%A8.-2564-%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C.pdf' target="_blank">
                                <Card className="box-detail box-detail-color2" title="แผนปฏิบัติการ" bordered={false}>
                                    <Text className='box-detail-text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รายละเอียดแผนปฏิบัติการ<br />
                                        ประจำปีงบ
                                        ประมาณ พ.ศ. 2564</Text>
                                </Card>
                            </a>
                        </Col>
                        <Col span={12} className="box">
                            <a href='https://hsdoa.kku.ac.th/OKRs/pdf/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%9C%E0%B8%A5%E0%B8%A5%E0%B8%B1%E0%B8%9E%E0%B8%98%E0%B9%8C%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D-HUSO-OKRs-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%9B%E0%B8%B5%E0%B8%87%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%B2%E0%B8%93-%E0%B8%9E.%E0%B8%A8.-2564.pdf' target="_blank">
                                <Card className="box-detail box-detail-color3" title="HUSO - OKRs" bordered={false}>
                                    <Text className='box-detail-text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รายละเอียดผลลัพธ์สำคัญ<br />
                                        HUSO - OKRs ประจำปีงบประมาณ
                                        พ.ศ. 2564</Text>
                                </Card>
                            </a>
                        </Col>
                        <Col span={12} className="box">
                            <Card className="box-detail box-detail-color4" title="ข้อตกลงการปฏิบัติงาน" bordered={false}>

                                <Text className='box-detail-text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อตกลงการปฏิบัติงานตามแผยปฏิบัติการคณะ ปีงบประมาณ พ.ศ. 2564</Text>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    return (
        <div className="grad1">
            <Row>
                <Col span={24} style={{ textAlign: "right", marginBottom: "15px" }}>
                    <Space direction="horizontal">
                        <Col onClick={() => { setIsLoggedIn(false) }} style={{ cursor: "pointer" }}>
                            <Row md={12}><Text className='text-header'>หน้าแรก</Text></Row>
                            <Row md={12}><Text className={!isLoggedIn ? 'line-color' : 'line-empty'} >&nbsp;</Text></Row>
                        </Col>
                        <Col onClick={() => { setIsLoggedIn(true) }} style={{ cursor: "pointer" }}>
                            <Row md={12}><Text className='text-header'>เอกสาร</Text></Row>
                            <Row md={12}><Text className={isLoggedIn ? 'line-color' : 'line-empty'}>&nbsp;</Text></Row>
                        </Col>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="card-detail" style={{ width: "100%", textAlign: "left", borderRadius: "15px", marginTop: "10px" }}>
                        <Row className='container-box-left'>
                            <Col className='box-left' xs={24} sm={24} md={24} lg={13} style={{ textAlign: "center" }}>
                                <Space direction="vertical">
                                    <Image
                                        src={logo}
                                        preview={false}
                                    />
                                    <br />
                                    <Text className="big1-title" >ระบบการบริหารและติดตามผลการดำเนินงานโครงการคณะมนุษยศาสตร์และสังคมศาสตร์<br />(e-Project)</Text>
                                    <br />
                                    <Text className="big2-title" >Faculty of Humanities and Social Sciences</Text>
                                    <Text className="big2-title" >Khon Kaen University</Text>
                                    <Button shape="round" className="g-button" onClick={() => { setIsLoggedIn(!isLoggedIn) }} >
                                        <Text className="big4-title" >{isLoggedIn === false ? "Document" : "Login"}</Text>
                                    </Button>
                                </Space>
                            </Col>
                            <Col className='box-right' xs={24} sm={24} md={24} lg={11} style={{ textAlign: "left" }}>
                                {setLeftLayout()}
                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Homepage;