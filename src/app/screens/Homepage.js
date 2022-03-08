import React, { useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Space, Image, Button, Form, Input } from 'antd';
import logo from "../../assets/images/favicon-96x96.png"
import { ErrorModalMassageHtml } from "./items/Modal";
import { LoginAction } from '../redux/actions/UserAction'
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
                if (res.error === null || res.code !== 200) {
                    setStorage('token', res.data.token)
                    routeChange()
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

    const routeChange = () => {
        let path = '/admin';
        navigate(path);
    }

    const setLeftLayout = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <Space direction="vertical" style={{marginTop: "20px"}} >
                        <Text className="big3-title" >Welcome to E - Project</Text>
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
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col className='form-login' span={24} style={{ textAlign: "center" }}>
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
                    <Row gutter={16} className="container-box">
                        <Col span={12} className="box">
                            <Card className="box-detail box-detail-color1" title="แผนยุทธศาสตร์" bordered={false}>
                                <Text className='box-detail-text'>คณะมนุษยศาสตร์และสังคมศาสตร์<br />
                                    รายละเอียดแผนยุทธศาสตร์ 4 ปี
                                    (พ.ศ. 2564 - 2567)</Text>
                            </Card>
                        </Col>
                        <Col span={12} className="box">
                            <Card className="box-detail box-detail-color2" title="แผนปฏิบัติการ" bordered={false}>
                                <Text className='box-detail-text'>รายละเอียดแผนปฏิบัติการ<br />
                                    ประจำปีงบ
                                    ประมาณ พ.ศ. 2564</Text>
                            </Card>
                        </Col>
                        <Col span={12} className="box">
                            <Card className="box-detail box-detail-color3" title="HUSO - OKRs" bordered={false}>
                                <Text className='box-detail-text'>รายละเอียดผลลัพธ์สำคัญ<br />
                                    HUSO - OKRs ประจำปีงบประมาณ
                                    พ.ศ. 2564</Text>
                            </Card>
                        </Col>
                        <Col span={12} className="box">
                            <Card className="box-detail box-detail-color4" title="ข้อตกลงการปฏิบัติงาน" bordered={false}>

                                <Text className='box-detail-text'>ข้อตกลงการปฏิบัติงานตามแผยปฏิบัติการคณะ ปีงบประมาณ พ.ศ. 2564</Text>
                            </Card>
                        </Col>
                    </Row>
                </>
            )
        }
    }

    return (
        <div className="grad1">
            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
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
                            <Col className='box-left' xs={24} sm={24} md={24} lg={12} style={{ textAlign: "center" }}>
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
                            <Col className='box-right' xs={24} sm={24} md={24} lg={12} style={{ textAlign: "left" }}>
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