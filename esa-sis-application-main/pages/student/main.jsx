// import ListUsersDetail from '../../components/Admin/ListUsersDetail';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import SearchCourse from '../../components/Dashboard/Courses/SearchCourse';
// import { LowerButtons } from '../../components/Admin/LowerButtons';
import { appIsWaiting } from '../../redux/slices/appSlice';
// import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import { Home } from '../../components/GOToHome';
// import https from 'https';
import StudentBlue from '../../components/Dashboard/DashboardComps/StudentBlueView/StudentBlue';
import StudentProfile from '../../components/StudentProfile';
// import Link from 'next/link';;
export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appIsWaiting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: session } = useSession();

  // // console.log(session?.user.status)

  const [limited, setlimited] = useState();
  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  };

  useEffect(() => {
    if (session?.user.status == 'limited1') {
      setlimited(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  return (
    <>
      <Head>
        <title>SIS - Main Board</title>
      </Head>
      {session?.user.role === '1' && limited ? (
        // <div className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
        // {/* if status is limited display studentBlue */}
        <>
          <StudentBlue />
        </>
      ) : // </div>
      session?.user.role === '1' && !limited ? (
        <>
          {/* <div className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
          if status is limited display studentBlue */}
          <p className="text-3xl pt-5 mb-10 font-bold text-primary">
            Main board
          </p>

          <StudentProfile />
          {/* </div> */}
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Main.auth = true;
Main.adminOnly = true;
