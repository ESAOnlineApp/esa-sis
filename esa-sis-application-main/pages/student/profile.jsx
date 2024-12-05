import Head from 'next/head';
import ProfileScreen from '../../components/Dashboard/profile';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Profile() {

  const { data: session } = useSession();
  const router = useRouter()
  const redirect = () => { 
    router.push('/AccessDenied')
  }
  return (
    <>
      <Head>
        <title>SIS - Profile Page</title>
      </Head>

      { session?.user.role === '1' ? ( <><p className='text-gray-700 text-3xl pt-5 mb-10 font-bold text-primary'>
        Edit Profile
      </p>

      <div className='grid lg:grid-cols-1 gap-5 mb-5'>
        <ProfileScreen />
      </div>
      </> ) : redirect()}
    </>
  );
}
Profile.auth = true;
Profile.adminOnly = true;
