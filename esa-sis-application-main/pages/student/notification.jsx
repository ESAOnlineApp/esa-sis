import { useSession } from 'next-auth/react';
import Head from 'next/head';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import NotifPage from '../../components/notifPage';
// import { useEffect, useState } from "react";
// import axios from "axios";

export default function notification() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const redirect = () => {
    router.push('/AccessDenied');
  };
  return (
    <>
      <Head>
        <title>SIS - notification</title>
      </Head>

      <>
        {session?.user.role === '1' ? (
          <div>
            <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
              Notification
            </p>
            <div>
              <NotifPage />
            </div>
          </div>
        ) : (
          redirect()
        )}
      </>
    </>
  );
}
notification.auth = true;
notification.adminOnly = true;
