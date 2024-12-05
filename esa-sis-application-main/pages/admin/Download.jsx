// import ListUsersDetail from '../../components/Admin/ListUsersDetail';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { LowerButtons } from '../../components/Admin/LowerButtons';
import { appIsWaiting } from '../../redux/slices/appSlice';
// import { Home } from '../../components/GOToHome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DownloadCourseStudent from './DownloadCoursesStudent';
// import Link from 'next/link';
// import AccessDenied from '../../components/Dashboard/accessDenied/AccessDenied';

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appIsWaiting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: session } = useSession();
  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Download Board</title>
      </Head>
      {session?.user.role === '0' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Download</p>

          <div className="grid lg:grid-cols-1 gap-5 mb-5">
            <DownloadCourseStudent />
          </div>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Main.auth = true;
Main.adminOnly = true;
