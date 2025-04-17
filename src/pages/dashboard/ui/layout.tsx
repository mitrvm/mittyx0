import { Layout } from 'antd';
import { Sidebar } from '~widgets/sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Sidebar />
      {children}
    </Layout>
  );
}

export function DashboardLayoutSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Sidebar />
      {children}
    </Layout>
  );
}
