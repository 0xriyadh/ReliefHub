import { Metadata } from 'next';
import SideNavUserDashboard from '@/app/ui/userDashboard/sidenav';
import { auth } from '@/auth';
import { fetchUser, fetchUserById } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Relief Hub: Admin Panel',
  description: 'Admin Panel for Relief Hub App',
};

export async function Layout ({ children }: { children: React.ReactNode }) {
    // const { user }: any = await auth();
    // const email = user?.email;
    // const userFullData = await fetchUser(email);
    // console.log('from main page', userFullData);
    // if (userFullData.role == 'president') {
    //   return (
    //     <>
    //       <p>Hi I am President {userFullData.name}</p>
    //     </>
    //   );
    // }
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
