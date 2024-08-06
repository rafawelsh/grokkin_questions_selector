import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Grokkin Question Bank',
	description: 'Time to mock interview!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
