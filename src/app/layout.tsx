import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Container } from '@mui/material';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Container maxWidth='lg' className='py-4'>
          {children}
        </Container>
      </body>
    </html>
  );
}
