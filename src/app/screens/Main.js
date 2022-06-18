import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Menu, Image, Row, Col, Typography, Space, Button, Badge } from 'antd';
import { FileTextOutlined, UserOutlined, FolderOpenOutlined, AuditOutlined, AppstoreOutlined, GroupOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from "../../assets/images/favicon-32x32.png"
import Admin from './component/admin/ManageTemplate';
import Dashboard from './component/dashboard/Dashboard';
import Dashboard2 from './component/dashboard/Dashboard2';
import Institution from './component/dashboard/Institution';
import Course from './component/dashboard/Course';
import Faculty from './component/dashboard/Faculty';
import History from './component/dataHistory/History';
import User from './component/setting/User';
import Template from './component/setting/Template';
import ReportForm1 from './component/admin/ReportForm1'
import ReportForm2 from './component/admin/ReportForm2'
import { clearStorege, getStorage } from "../screens/state/localStorage";
import { FaRegUserCircle } from "react-icons/fa";
import { ConfirmModalEditText } from "./items/Modal";

import logoProfile from "../../assets/images/icon/pixlr-bg-result.png";
import logoLogOut from "../../assets/images/icon/log-out.png";

import { LIST_FROM_2, ListHistoryAction, SaveFormAction, ListFormAction, LIST_FORM, UpdateFormAction } from "../redux/actions/FormAction";
import { UpdateAccAction } from '../redux/actions/UserAction'

const { Text, Link } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Main = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [mycontent, setContent] = useState(null)
    const [profile, setProfile] = useState({})
    const [key, setKey] = useState(['6'])
    const listForm = useSelector(state => state?.main?.[LIST_FORM])
    const listForm2 = useSelector((state) => state?.main?.[LIST_FROM_2]);
    const [count2, setCount2] = useState(0)
    const [count31, setCount31] = useState(0)
    const [count32, setCount32] = useState(0)
    async function routeChange() {
        clearStorege('token')
        let path = '/';
        navigate(path);
    }

    useEffect(() => {
        console.log('listForm', listForm, listForm2)
        if (profile?.role?.priority === '1') {
            // let c = listForm?.result?.filter(l => l.step_id !== "3" && l.step_id !== "5" && l.step_id !== "8" && l.step_id !== "1")
            // setCount2(c?.length)
            setCount2(0)
            let c = listForm?.result?.filter(l => (l.step_id === "4" || l.step_id === "8" || l.step_id === "3") && l.type_id === '1')
            setCount31(c?.length)
            c = listForm2?.result?.filter(l => (l.step_id === "4" || l.step_id === "8" || l.step_id === "3") && l.type_id === '2')
            setCount32(c?.length)
        } else if (profile?.role?.priority === '2') {
            setCount2(0)
            let c = listForm?.result?.filter(l => (l.step_id === "4") && l.type_id === '1')
            setCount31(c?.length)
            c = listForm2?.result?.filter(l => (l.step_id === "4") && l.type_id === '2')
            setCount32(c?.length)
        } else if (profile?.role?.priority === '3') {
            let c
            if (profile?.role_id === '3') {
                c = listForm?.result?.filter(l => l.step_id === "7" || (l.step_id === "10" && l.form_status === "3"))
            } else if (profile?.role_id === '4') {
                c = listForm?.result?.filter(l => l.step_id === "6" || (l.step_id === "11" && l.form_status === "3"))
            }
            setCount2(c?.length)
            setCount31(0)
            setCount32(0)
        } else if (profile?.role?.priority === '4') {
            setCount2(0)
            let c = listForm?.result?.filter(l => (l.step_id === "3" || l.step_id === "8") && l.type_id === "1")
            setCount31(c?.length)
            let v = listForm2?.result?.filter(l => (l.step_id === "3" || l.step_id === "8") && l.type_id === "2")
            setCount32(v?.length)
        }

    }, [listForm, profile, listForm2])

    useEffect(() => {
        checkToken()
        if (!getStorage('profile') || !getStorage('token')) {
            routeChange()
        } else {
            let p = getStorage('profile')
            setProfile(p)
            handleListMaster()
            if (p?.role?.priority === '1') {
                setKey(['7']);
                setContent(<Template />);
            } else {
                setKey(['1']);
                setContent(<Dashboard />);
            }
        }
    }, [])

    async function checkToken() {
        try {
            if (getStorage('profile')) {
                // let res = await UpdateAccAction(getStorage('profile'))
                dispatch(await ListHistoryAction());
            } else {
                routeChange()
            }
        } catch (e) {
            routeChange()
        }
    }

    async function handleListMaster() {
        let p = getStorage('profile')
        dispatch(await ListFormAction({ userId: p.id, roleId: p.role_id, str: '', username: p.username }))
    }

    const onClickMenu = value => {
        // console.log(value);
        setKey([value.key])
        if (value.key === '1') {
            setContent(<Dashboard />);
        } else if (value.key === '2-1') {
            setContent(<Dashboard2 />);
        } else if (value.key === '2-2') {
            setContent(<Faculty title={'ผลการดำเนินงานกองบริหารงานคณะ'} subTitle={''} pic={1} />);
        } else if (value.key === '2-3') {
            setContent(<Faculty title={'ผลการดำเนินงานสาขาวิชา'} subTitle={'(หลักสูตร)'} pic={2} />);
        } else if (value.key === '2-4') {
            setContent(<Faculty title={'ผลการดำเนินงานศูนย์บริการวิชาการ'} subTitle={''} pic={3} />);
        } else if (value.key === '4') {
            setContent(<ReportForm1 />);
        } else if (value.key === '5') {
            setContent(<ReportForm2 />);
        } else if (value.key === '3') {
            setContent(<Admin />);
        } else if (value.key === '6') {
            setContent(<User />);
        } else if (value.key === '7') {
            setContent(<Template />);
        } else if (value.key === '8') {
            setContent(<History />);
        }

    };

    const logout = async () => {
        ConfirmModalEditText(routeChange, conditionLogout());
    }

    const conditionLogout = () => {
        return {
            title: "Confirm",
            content: "Are you sure to Logout ?"
        }
    }
    // console.log('count>>', count2, count31, count32)
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
                    <Space direction="horizontal" style={{ marginTop: '10px' }}>
                        &nbsp;
                        <Image
                            src={logo}
                            style={{ width: '40px' }}
                        />
                        <Space direction="vertical" style={{ padding: "0px", gap: "2px" }}>
                            <Text strong>e - Project</Text>
                            <Text className="small-text" style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.5)' }}>Faculty of Humanities  and Social Sciences</Text>
                        </Space>
                    </Space>
                </div>
                <Menu theme="light" mode="inline" selectedKeys={key} onClick={onClickMenu}>
                    <Menu.ItemGroup title='General'>
                        <Menu.Item key="1" icon={<AppstoreOutlined />} >
                            Dashboard 1 - แผนปฏิบัติการ
                        </Menu.Item>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Dashboard 2 - ผลการดำเนินงานของคณะ">
                            <Menu.Item key="2-1">ภาพรวมคณะ</Menu.Item>
                            <Menu.Item key="2-2">กองบริการงานคณะ</Menu.Item>
                            <Menu.Item key="2-3">สาขาวิชา</Menu.Item>
                            <Menu.Item key="2-4">ศูนย์</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<AuditOutlined />} hidden={profile?.role?.priority !== '3' && profile?.role?.priority !== '1'}>
                            <Badge count={count2} offset={[20, 5]} >
                                Manage Report
                            </Badge>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FileTextOutlined />} hidden={profile?.role?.priority === '3' || profile?.role?.priority === '5'}>
                            <Badge count={count31} offset={[20, 5]} >
                                แบบรายงานกองบริการงานคณะ (ตามแบบปฏิบัติการ) / ศูนย์
                            </Badge>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<FileTextOutlined />} hidden={profile?.role?.priority === '3' || profile?.role?.priority === '5'}>
                            <Badge count={count32} offset={[20, 5]} >
                                แบบรายงานสาขาวิชา / หลักสูตร
                            </Badge>
                        </Menu.Item>

                        <Menu.Item key="8" icon={<FolderOpenOutlined />} hidden={profile?.role?.priority === '5'}>
                            Data History
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title='Management' hidden={profile?.role?.priority !== '1'}>
                        <Menu.Item key="6" icon={<UserOutlined />}>
                            User
                        </Menu.Item>
                        <Menu.Item key="7" icon={<GroupOutlined />}>
                            Template
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background custom-layout-header">
                    <Space align="start" style={{ backgroundColor: '#F3F6F9', borderRadius: '10px', marginRight: '25px' }}>
                        {/* <FaRegUserCircle style={{ color: 'orange', marginTop: '20px' }} /> */}
                        <Image src={logoProfile} className="custom-image-profile" preview={false} />
                        <Space direction="vertical" style={{ padding: "0px", gap: "0px" }}>
                            <Text strong style={{ color: 'rgba(0, 0, 0, 0.5)' }}> {profile?.full_name}</Text>
                            <Text className="small-text" style={{ textAlign: 'left', color: 'rgba(0, 0, 0, 0.5)' }}> {profile?.role?.role_name} </Text>
                        </Space>

                        <Button type="link" style={{ color: 'orange', marginTop: '10px' }} onClick={logout} >
                            {/* <LogoutOutlined /> */}
                            <Image src={logoLogOut} className="custom-image-logout" preview={false} />
                        </Button>
                    </Space>
                </Header>
                <Content style={{ margin: '0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {mycontent}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>HUSO-KKU ©2022 Faculty of Humanities and Social Sciences</Footer>
            </Layout>
        </Layout>
    )
}
export default Main;