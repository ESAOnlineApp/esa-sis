import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import Link from 'next/link';

export default function Report() {
  const { data: session } = useSession();
  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Report</title>
      </Head>

      {session?.user.role === '0' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Report</p>

          <div className="grid lg:grid-cols-1 gap-5 mb-5">Report</div>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Report.auth = true;
Report.adminOnly = true;
