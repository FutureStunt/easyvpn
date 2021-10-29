import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Skeleton, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';


declare module 'axios' {
	interface AxiosInstance {
	  (config: AxiosRequestConfig): Promise<any>
	}
}

interface Item {
	key: string;
	Country: string;
	IPAddress: string;
	Port: number;
	Protocol: string;
	Added: string;
}

export default function ServerTable() {
	const [state, setstate] = React.useState([]);
	const [isloading, setloading] = React.useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		await axios({
			method: 'GET',
			url: 'http://127.0.0.1:8000/api/getservers',
		}).then(async (resp) => {
			setstate(
				resp.data.map((row: { country: string; ipaddress: string; port: string; protocol: string; added: string; }) => ({
				  Country: row.country,
				  IPAddress: row.ipaddress,
				  Port: row.port,
				  Protocol: row.protocol,
				  Added: row.added,
				}))
			);

			await new Promise(f => setTimeout(f, 200));

			setloading(false);
		}).catch(() => {
			message.error(`API Error`);
		});
	};

	const filterData = (state: any[]) => (formatter: (arg0: any) => any) => state.map( (item: any) => ({
		text: formatter(item),
		value: formatter(item)
	}));

	const unique = [...new Set(state.map((item: { Country: string; }) => item.Country))];

	const columns = [
		{
			title: 'Country',
			dataIndex: 'Country',
			key: 'Country',
			filters: filterData(unique)(i => i),
			onFilter: (value: any, record: any) => record.Country.indexOf(value) === 0,
		},
		{
			title: 'IP Address',
			dataIndex: 'IPAddress',
			key: 'IPAddress',
		},
		{
			title: 'Port',
			dataIndex: 'Port',
			key: 'Port',
		},
		{
			title: 'Protocol',
			dataIndex: 'Protocol',
			key: 'Protocol',
			filters: [
				{
					text: 'tcp',
					value: 'tcp',
				},
				{
					text: 'udp',
					value: 'udp',
				},
			],
			onFilter: (value: any, record: any) => record.Protocol.indexOf(value) === 0,
		},
		{
			title: 'Added',
			dataIndex: 'Added',
			sortDirections: ['ascend', 'descend', 'ascend'],
			defaultSortOrder: 'descend',
			key: 'Added',
			sorter: (a: any, b: any) => new Date(a.Added).getTime() - new Date(b.Added).getTime(),
		},
		{
		  title: 'Action',
		  key: 'action',
		  render: (record: Partial<Item> & { key: React.Key }) => (
			<Space size="middle">
				  <Button 
	
					type="primary" 
					icon={<DownloadOutlined />} 
					size={'middle'} 
					onClick={async () => {
						await axios({
							method: 'POST',
							url: 'http://localhost:8000/api/getprofile',
							data: {
								IPAddress: record.IPAddress,
								Port: "" + record.Port,
								Protocol: record.Protocol,
							},
							responseType: 'blob', // important
						}).then(async (resp) => {
							const url = window.URL.createObjectURL(new Blob([resp.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', `${record.IPAddress}_${record.Port}_${record.Protocol}.ovpn`); //or any other extension
							document.body.appendChild(link);
							link.click();
						}).catch(() => {
							message.error('Invalid VPN Server');
						});
					}}
				>
				  Download
				</Button>
			</Space>
		  ),
		},
	];

	return (
		<div style={{ padding: 24 }} >
			<Skeleton active loading={isloading} >
				<Table 
					columns={columns} 
					dataSource={state} 
					pagination={{ pageSize: 10 }}
				/>
			</Skeleton>
		</div>
	);
}