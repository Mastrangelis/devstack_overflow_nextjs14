import ProfileForm from '@/components/forms/ProfileForm';
import { getUserById } from '@/lib/actions/user.actions';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <ProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;
