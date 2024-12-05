/*
 * Created By: Mohammad Jaber
 * Project: SIS Application
 * File: pages\404.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
/*
Created At: 15/10/2022 
*/

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
// import selection_data from '../utilities/selection_data';
import { useSelector } from 'react-redux';

const PageNotFound = () => {
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );

  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className='flex-col text-center'>
        <h1 className='mb-4 text-3xl font-bold text-red-500'>Error 404</h1>
        <h2 className='mb-4 text-xl font-bold'>
          This Page Could Not Be Found.
        </h2>
        <Image
          className='inline w-auto h-auto'
          src={appState.appVar.esa_logo}
          alt='logo'
          width={100}
          height={150}
        />
        <Link href='/' legacyBehavior>
          <p className='underline cursor-pointer hover:text-blue-800'>
            Click Here To Return Back To Home Page
          </p>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
