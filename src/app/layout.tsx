import type { Metadata } from 'next';
import './globals.css';
import { GlobalUI } from '../components/GlobalUI';

export const metadata: Metadata = {
  title: 'Grupo Zakher — Casa Estrella de San Pedro',
  description: 'A seven-bedroom colonial sanctuary in the heart of Cartagena de Indias, Colombia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}
