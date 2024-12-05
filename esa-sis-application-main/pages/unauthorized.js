/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\unauthorized.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    // <Layout title="Unauthorized Page">
    <>
      <Head>
        <title>Unauthorized URL</title>
      </Head>

      {message && (
        <div className="flex-col justify-center text-center">
          <h1 className="text-2xl mb-4 font-bold">Access Denied</h1>
          <p className="text-red-700 font-bold">{message} ...</p>
          <p className="text-red-700 font-bold">
            Click the button below to return back To Login Page.
          </p>
          <div className="flex justify-center mt-2">
            <Link href="/user/login">
              <div className="flex justify-center uppercase rounded-lg w-28 font-bold text-md p-1 bg-blue-500 text-white hover:bg-gray-400 hover:text-blue-800">
                Login
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
