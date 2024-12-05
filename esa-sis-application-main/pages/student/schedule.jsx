import { useSession } from 'next-auth/react';
import Head from 'next/head';
import CourseSchedule from '../../components/Dashboard/Schedule/CourseSchedule';
import { useRouter } from 'next/router';

export default function Schedule() {
  const { data: session } = useSession();
  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  }

  return (
    <>
      <Head>
        <title>SIS - Schedule</title>
      </Head>

      {session?.user.role === '1' ? (
        // <>
        <div className="max-w-screen-md p-4">

          {/* <p className='text-gray-700 lg:text-3xl md:text-2xl sm:text-xl pt-5 mb-10 font-bold text-primary'> */}
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold text-primary">
            Schedule</p>

          {/* <div className='grid lg:grid-cols-1 sm:grid-cols-1 gap-5 mb-5'> */}
          <div>
            <CourseSchedule />
          </div>
        </div>
      ) : redirect()}
    </>
  );
}

Schedule.auth = true;
Schedule.adminOnly = true;
