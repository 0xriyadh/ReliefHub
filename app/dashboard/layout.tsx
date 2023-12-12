import { Metadata } from 'next';
import SideNavUserDashboard from '@/app/ui/userDashboard/sidenav';

export const metadata: Metadata = {
  title: 'Relief Hub: Admin Panel',
  description: 'Admin Panel for Relief Hub App',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNavUserDashboard />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
