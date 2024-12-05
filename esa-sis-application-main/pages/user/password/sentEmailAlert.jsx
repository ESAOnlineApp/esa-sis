/*
Created By: Mohammad Jaber
Page: validation page
Created At: 15/10/2022 
*/

import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import selection_data from '../../../utilities/selection_data';

const EmailSentAlert = () => {
  // Edited By:KANSO ADI 19-10-2022
  // Very important to prevent the routing if loged inn and the user pass the url of this page
  /* Checking if the user is logged in or not. If the user is logged in, it will redirect him to the
  home page. */
  // FIXME: Maybe route the user to the previous page instead of the home page, waiting to have more pages and expressive routing logic
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  return (
    <>
      <Head>
        <title>Email Sent</title>
      </Head>
      <div className=' flex-col m-auto  max-w-md flex-wrap content-center text-center'>
        <Image
          className='inline w-auto h-auto'
          src={appState.appVar.esa_logo}
          alt='logo'
          width={100}
          height={150}
        />
        <h1 className='mb-4 text-2xl font-bold'>
          Please Check Your Email To Reset Your Password!
        </h1>
      </div>
    </>
  );
};

export default EmailSentAlert;
