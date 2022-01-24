import React, { useState } from 'react';
import { setStorage, getStorage } from "../../screens/state/localStorage";
import { Layout, Image, Typography, Space } from 'antd';


const { Header, Footer } = Layout;
const { Title } = Typography;
const MainLayout = (WrappedComponent) => (props) => {
	// const [collapsed, setCollapsed] = useState(false);

	// if (props.location) {
	// 	const query = new URLSearchParams(props.location.search);
	// 	const token = query.get('token')
	// 	if (token) {
	// 		if (getStorage("token")) {
	// 			if (getStorage("token") != token) {
	// 				setStorage("token", token)
	// 			}
	// 		} else {
	// 			setStorage("token", token)
	// 		}
	// 	}
	// }



	return (
		<Layout>
			<Header>
				<Space size={12}>
					<Image
						width={200}
						src={"../src/assets/images/LogoKKU-thai.png"}						
					/><Title>OKRs</Title>
				</Space>
			</Header>
			<Layout style={{ minHeight: '90vh' }}>
				<WrappedComponent {...props} />
			</Layout>
			{/* <Footer style={{ textAlign: 'center', padding: '0' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
		</Layout>
	);
};

export default MainLayout;
