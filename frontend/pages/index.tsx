import { useRouter } from 'next/router';

function Index() {
	if (typeof window !== 'undefined') {
		const router = useRouter();
		router.push('/home');
	}
	return <></>;
}

export default Index;
