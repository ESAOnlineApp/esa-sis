/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\user\message\validation.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import selection_data from '../../../utilities/selection_data';
import { useSelector } from 'react-redux';

const ValidationPage = () => {
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
        <title>Validation Page</title>
      </Head>
      <div className=' flex-col m-auto  max-w-md flex-wrap content-center text-center'>
        <Image
          className='inline h-auto w-auto'
          src={appState.appVar.esa_logo}
          alt='logo'
          width={100}
          height={150}
        />
        <h1 className='mb-4 text-2xl font-bold'>
          A verification email has been sent to your email address.
        </h1>
        <h2 className='mb-2 text-xl'>
          In case you did not receive it, please contact us at:
        </h2>
        <h2 className='mb-5 text-xl font-bold underline text-blue-500'>
          itservicedesk@esa.edu.lb
        </h2>
        <h2 className='mb-4 text-xl font-bold text-red-500'>
          (Please make sure you check your Junk Folder).
        </h2>
        <Link href='/user/login' legacyBehavior>
          <p className='underline cursor-pointer hover:text-blue-800 hover:font-bold'>
            Click Here To Login / Register
          </p>
        </Link>
      </div>
    </>
  );
};
export default ValidationPage;
// ValidationPage.auth = true;
