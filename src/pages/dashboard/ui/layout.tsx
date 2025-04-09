import { Layout } from 'antd';
import { Header } from '~widgets/header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const layoutStyle = {
    padding: 6,
  };
  return (
    <Layout style={layoutStyle}>
      <Header />
      {children}
    </Layout>
  );
}

export function DashboardLayoutSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutStyle = {
    padding: 6,
  };
  return (
    <Layout style={layoutStyle}>
      <Header />
      {children}
    </Layout>
  );
}
