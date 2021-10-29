import React from 'react';
import Link from 'next/link'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
	DesktopOutlined,
	HomeOutlined
} from '@ant-design/icons';
import Cookies from 'js-cookie'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { NextRouter } from 'next/dist/client/router';

const { Sider } = Layout;

interface Router extends NextRouter {
	path: string;
	breadcrumbName: string;
}

interface Props extends WithRouterProps {
	router: Router;
}


const Navbar = (props: React.PropsWithChildren<Props>) => {
	const [collapsed, setCollapse] = React.useState((Cookies.get("navbarcollapsed") == "true" ? true : false));

	const onCollapse = () => {
		setCollapse(!collapsed);
		Cookies.set('navbarcollapsed', (!collapsed ? 'true' : 'false'))
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo">
					{/* <img src="logo"></img> */}
				</div>

				<Menu 
					theme="dark" 
					defaultSelectedKeys={['/']}
					selectedKeys={[location.pathname]}
					mode="inline"
				>
				<Menu.Item key="/home" icon={<HomeOutlined />}>
					<Link href="/home" shallow={true}>
						Home
					</Link>
				</Menu.Item>
				<Menu.Item key="/servers" icon={<DesktopOutlined />}>
					<Link href="/servers" shallow={true}>
						VPN Servers
					</Link>
				</Menu.Item>
				</Menu>
			</Sider>
			<Layout style={{ padding: '0 16px 16px', backgroundColor: '#2e2f32' }}>
				{props.children}
      		</Layout>
		</Layout>
	);
}

export default withRouter(Navbar);