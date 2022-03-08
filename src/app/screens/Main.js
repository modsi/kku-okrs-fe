import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Image, Row, Col, Typography, Space, Button } from 'antd';
import { FileTextOutlined, UserOutlined, FolderOpenOutlined, AuditOutlined, AppstoreOutlined, GroupOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from "../../assets/images/favicon-32x32.png"
import Admin from './component/admin/Admin';
import Dashboard from './component/dashboard/Dashboard';
import Institution from './component/dashboard/Institution';
import Course from './component/dashboard/Course';
import Faculty from './component/dashboard/Faculty';
import User from './component/setting/User';
import Template from './component/setting/Template';
import { clearStorege, getStorage } from "../screens/state/localStorage";
import { FaRegUserCircle } from "react-icons/fa";
import { ConfirmModalEditText } from "./items/Modal";

const { Text, Link } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Main = () => {
    const navigate = useNavigate();
    const [mycontent, setContent] = useState(<User />)
    const [profile, setProfile] = useState({})

    const routeChange = () => {
        clearStorege('token')
        let path = '/';
        navigate(path);
    }

    useEffect(() => {
        console.log('check token', getStorage('token'))
        if (!getStorage('token')) {
            routeChange()
        } else {
            setProfile(getStorage('profile'))
        }
    }, [])

    const onClickMenu = value => {
        // console.log(value);
        // if (value.key === '7') {
        //     setContent(<Admin />);
        // } else if (value.key === '1') {
        //     setContent(<Dashboard />);
        // } else if (value.key === '2') {
        //     setContent(<Faculty />);
        // } else  if (value.key === '4') {
        //     setContent(<Institution />);
        if (value.key === '3') {
            setContent(<Admin />);
        } else if (value.key === '6') {
            setContent(<User />);
        } else if (value.key === '7') {
            setContent(<Template />);
        }

    };

    const logout = () => {
        ConfirmModalEditText(routeChange, conditionLogout());
    }

    const conditionLogout = () => {
        return {
            title: "Confirm",
            content: "Are you sure to Logout ?"
        }
    }
    console.log('profile>>', profile)
    return (
        <Layout className="main-layout" style={{ minHeight: '100vh' }}>
            <Sider
                width="300"
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
            >
                <div className="logo">
                    <Space direction="horizontal">
                        <Image
                            src={logo}
                        />
                        <Space direction="vertical" style={{ padding: "5px", gap: "0px" }}>
                            <Text strong>E - Project</Text>
                            <Text className="small-text">Faculty of Humanities  and Social Sciences</Text>
                        </Space>
                    </Space>
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['6']} onClick={onClickMenu}>
                    <Menu.ItemGroup title='General'>
                        <Menu.Item key="1" icon={<AppstoreOutlined />}>
                            Dashboard 1 - แผนปฏิบัติการ
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreOutlined />}>
                            Dashboard 2 - ผลการดำเนินงานของคณะ
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AuditOutlined />}>
                            Manage Template
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FileTextOutlined />}>
                            Report Form 1
                        </Menu.Item>
                        <Menu.Item key="5" icon={<FileTextOutlined />}>
                            Report Form 2
                        </Menu.Item>
                        <Menu.Item key="8" icon={<FolderOpenOutlined />}>
                            Data History
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title='Management'>
                        <Menu.Item key="6" icon={<UserOutlined />}>
                            User
                        </Menu.Item>
                        <Menu.Item key="7" icon={<GroupOutlined />}>
                            Template
                        </Menu.Item>
                        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="5">Option 1</Menu.Item>
                            <Menu.Item key="6">Option 2</Menu.Item>
                            <Menu.Item key="7">Option 3</Menu.Item>
                            <Menu.Item key="8">Option 4</Menu.Item>
                        </SubMenu> */}
                    </Menu.ItemGroup>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ width: '100%', textAlign: 'right' }}>
                    <Space align="start">
                        <FaRegUserCircle style={{ color: 'orange', marginTop: '20px' }} />
                        <Text strong> {profile?.full_name}</Text>
                        <Text className="small-text"> : {profile?.role?.role_name} </Text>
                        <Button type="link" style={{ color: 'orange', marginTop: '15px' }} onClick={logout} ><LogoutOutlined /></Button>
                    </Space>
                </Header>
                <Content style={{ margin: '0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {mycontent}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>HUSO-KKU ©2022 Faculty of Humanities and Social Sciences</Footer>
            </Layout>
        </Layout>
    )
}
export default Main;