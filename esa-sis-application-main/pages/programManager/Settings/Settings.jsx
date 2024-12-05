import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Main from '../../../components/Dashboard/settings/Main';
import AccessDenied from '../../../components/Dashboard/accessDenied/AccessDenied';

export default function Settings() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Dashboard - Settings</title>
      </Head>

      {session?.user.role === '2' ? (
        <>
          <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>
            Settings
          </p>

          <div className='grid lg:grid-cols-1 gap-5 mb-5'>
            <Main />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
Settings.auth = true;
Settings.adminOnly = true;
