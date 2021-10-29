import '../styles/index.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import Head from 'next/head';

const Navbar = dynamic(() => import('../src/components/navbar'), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Navbar>
			<Head>
				<title>easyvpn</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</Navbar>
	);
}