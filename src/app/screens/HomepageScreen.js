import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button, Space } from 'antd';

const HomepageScreen = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const routeChange = () => {
        let path = '/home';
        if (!isLoggedIn) {
            path = '/login';
        }
        navigate(path);
    }
    return (
        <div className="site-card-border-less-wrapper" style={{ height: '100%', textAlign: 'center'}}>
            <Space direction="vertical" style={{ height: '100%', paddingTop: '100px'  }} align="center">
                <Space direction="horizontal" style={{ height: '100%' }} align="center">
                    <Card title="Card title" style={{ width: 300 }}>
                        Card content
                    </Card>

                    <Card title="Card title" style={{ width: 300 }}>
                        Card content
                    </Card>

                    <Card title="Card title" style={{ width: 300 }}>
                        Card content
                    </Card>

                </Space>
                <div className="site-button-ghost-wrapper">
                    <Button
                        ghost
                        onClick={routeChange}
                    >เริ่มต้นใช้งาน
                    </Button>
                </div>
            </Space>
        </div>

    )
}
export default HomepageScreen;