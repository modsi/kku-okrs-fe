import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Admin from './component/admin/Admin';
import Dashboard from './component/dashboard/Dashboard';
import Institution from './component/dashboard/Institution';
import Course from './component/dashboard/Course';
import Faculty from './component/dashboard/Faculty';
import User from './component/setting/User';
import Template from './component/setting/Template';
import { Card, Menu, Layout } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const HomepageScreen = () => {
    const [mycontent, setContent] = useState(<Admin />)
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        onClickMenu({ key: '1' })
    }, [])

    const onClickMenu = value => {
        console.log(value);
        if (value.key === '7') {
            setContent(<Admin />);
        } else if (value.key === '1') {
            setContent(<Dashboard />);
        } else if (value.key === '2') {
            setContent(<Faculty />);
        } else if (value.key === '3') {
            setContent(<Course />);
        } else if (value.key === '4') {
            setContent(<Institution />);
        } else if (value.key === '5') {
            setContent(<User />);
        } else if (value.key === '6') {
            setContent(<Template />);
        }

    };
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
                <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline" style={{ flex: 'auto' }} >
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={onClickMenu}>
                        DASHBOARD (แผน)
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<PieChartOutlined />} title="DASHBOARD (การเงิน)">
                        <Menu.Item key="2" onClick={onClickMenu}>ภาพรวมคณะ</Menu.Item >
                        <Menu.Item key="3" onClick={onClickMenu}>หลักสูตร</Menu.Item>
                        <Menu.Item key="4" onClick={onClickMenu}>ศูนย์</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SettingOutlined />} title="SETTING">
                        <Menu.Item key="5" onClick={onClickMenu}>USER</Menu.Item>
                        <Menu.Item key="6" onClick={onClickMenu}>TEMPLATE</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="7" icon={<FileOutlined />} onClick={onClickMenu}>
                        Admin Manage
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content>{mycontent}</Content>
            </Layout>
        </>

    )
}
export default MainLayout(HomepageScreen);