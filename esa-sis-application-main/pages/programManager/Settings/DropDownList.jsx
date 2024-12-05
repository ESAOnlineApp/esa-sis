import { useSession } from 'next-auth/react';
import Head from 'next/head';
import AccessDenied from '../../../components/Dashboard/accessDenied/AccessDenied';
import { DropDownList } from '../../../components/Dashboard/settings/dropDownList/DropDownList';

export default function DropDownListPage() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Dashboard Settings - DropDown Lists</title>
      </Head>
      {session?.user.role === '2' ? (
        <>
          <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>
            DropDown Lists
          </p>

          <div className='grid lg:grid-cols-1 gap-5 mb-5'>
            <DropDownList />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
DropDownListPage.auth = true;
DropDownListPage.adminOnly = true;
