import { auth } from '@/auth';
import { fetchUser, fetchUserById } from '@/app/lib/data';
import MemberProfileForm from '@/app/ui/members/member-profile-form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const userFullData = await fetchUserById(id);
  console.log('from memeberessafasfadsfd', userFullData);
  return (
    <main>
      <MemberProfileForm user={userFullData} />
    </main>
  );
}
