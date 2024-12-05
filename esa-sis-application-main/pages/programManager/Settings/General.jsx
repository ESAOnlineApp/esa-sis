import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { GeneralSettings } from '../../../components/Dashboard/settings/general/General';
import AccessDenied from '../../../components/Dashboard/accessDenied/AccessDenied';

export default function General() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Dashboard Settings - General</title>
      </Head>

      {session?.user.role === '2' ? (
        <>
          <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>
            General Settings
          </p>

          <div className='grid lg:grid-cols-1 gap-5 mb-5'>
            <GeneralSettings />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
General.auth = true;
General.adminOnly = true;
