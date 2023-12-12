import ProfileForm from '@/app/ui/userDashboard/profile-form';
import { auth } from '@/auth';
import { fetchUser } from '@/app/lib/data';

export default async function Page() {
  const { user }: any = await auth();
  const email = user?.email;
  const userFullData = await fetchUser(email);

  return (
    <main>
      <ProfileForm user={userFullData} />
    </main>
  );
}
