import './globals.css';
import { AuthProvider } from '@/app/_components/features/LoginForm/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
