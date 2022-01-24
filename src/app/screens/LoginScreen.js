import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button, Space, Form } from 'antd';
import LoginForm from './component/login/LoginForm';

const HomepageScreen = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        let path = '/home';
        navigate(path);
    }
    return (
        <>
            <div className="site-card-border-less-wrapper" style={{ height: '100%', textAlign: 'center' }} >
                <Space direction="horizontal" style={{ height: '100%' }} align="center">
                    <Card style={{ width: 300 }}>
                        <p>images</p>
                    </Card>
                    <Card title="เข้าสู่ระบบ" style={{ width: 300, background: 'transparent' }} loading={isLoading}>
                        <Form form={form}  >
                            <LoginForm form={form} />
                            <Button
                                ghost
                                onClick={login}
                            >ยืนยัน
                            </Button>
                        </Form>
                    </Card>
                </Space>
            </div>
        </>

    )
}
export default HomepageScreen;