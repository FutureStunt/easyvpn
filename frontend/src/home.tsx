import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Col, message, Row, Skeleton, Statistic } from 'antd';
import { DesktopOutlined, FlagOutlined } from '@ant-design/icons';
import axios from 'axios';
import {
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	Cell,
  } from 'recharts';

type AnalyticsData = {
	servers: number;
	countries: number;
};

export default function HomeContent() {
	const [analytics, setanalytics] = React.useState<AnalyticsData | undefined>(undefined);
	const [charts, setcharts] = React.useState([]);
	const [isloading, setloading] = React.useState(true);

	useEffect(() => {
		getAnalytics();
		getCharts();
	}, []);

	const getAnalytics = async () => {
		await axios({
			method: 'GET',
			url: 'http://127.0.0.1:8000/api/getanalytics',
		}).then(async (resp) => {
			setanalytics(resp.data);

			await new Promise(f => setTimeout(f, 200));

			setloading(false);
		}).catch(() => {
			message.error(`API Error`);
		});
	};

	const getCharts = async () => {
		await axios({
			method: 'GET',
			url: 'http://127.0.0.1:8000/api/getcharts',
		}).then(async (resp) => {

			setcharts(resp.data)

			await new Promise(f => setTimeout(f, 200));

			setloading(false);
	  
		}).catch(() => {
			message.error(`API Error`);
		});
	};

	const barColors = ["#B5A524", "#62B60D", "#7BD07D", "#86C62F", "#5F11BD"]

	return (
		<div style={{ padding: 24 }} >
			<Skeleton active loading={isloading} >
				<Row gutter={16}>
					<Col span={12}>
						<Card>
							<Statistic 
								title="Total Servers" 
								value={analytics?.servers} 
								prefix={<DesktopOutlined />} 
							/>
						</Card>
					</Col>
					<Col span={12}>
						<Card>
							<Statistic 
								title="Total Countries" 
								value={analytics?.countries} 
								prefix={<FlagOutlined />} 
							/>
						</Card>
    				</Col>
    			</Row>
				<Card
      				style={{ marginTop: 16 }}
      				type="inner"
      				title="Countries with the most VPN Servers"
    			>
					<BarChart width={900} height={350} data={charts}>
  						<XAxis dataKey="country" />
  						<YAxis domain={[0, 500]}/>
  						<Tooltip cursor={false}/>
  						<Legend layout="vertical" verticalAlign="middle" align="right"  />
						<Bar 
							dataKey="servers" 
							fill="green" 
						>
	                    {
                        	charts.map((entry: string, index: number) => (
                            	<Cell key={`cell-${index}`} fill={barColors[index]} />
                        	))
                    	}
						</Bar>
					</BarChart>
    			</Card>
			</Skeleton>

    	</div>
    );
}