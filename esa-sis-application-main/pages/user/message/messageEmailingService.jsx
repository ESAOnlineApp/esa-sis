/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\user\message\messageEmailingService.jsx
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import selection_data from '../../../utilities/selection_data';
import { useSelector } from "react-redux";

// import { getError } from '../../../utilities/error';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

const MessageEmailingService = () => {
  // FIXME: Maybe route the user to the previous page instead of the home page, waiting to have more pages and expressive routing logic
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  // const [messagetext, setMessage] = useState('');
  let title = null;
  let message = null;
  let instructions = null;
  let serviceEmail = null;
  let email = null;
  let clarification = null;
  let isSignedIn = false;
  // let countsign = 0;
  if (router.query.message) {
    title = router.query.title;
    message = router.query.message;
    serviceEmail = router.query.email;
    instructions = router.query.instructions;
    clarification = router.query.clarification;
  }
  if (router.query.email) {
    email = router.query.email;
  }

  // // console.log('Email=', router.query.email);
  // // console.log('message=', router.query.message);

  useEffect(() => {
    if (!message && !email && session?.user) {
      router.push(redirect || "/");
    }
  }, [email, isSignedIn, message, redirect, router, session]);

  return (
    <>
      <Head>
        <title>Invalid Emailing Service</title>
      </Head>
      <div className=" flex-col m-auto  max-w-md flex-wrap content-center text-center">
        <Image
          className="inline w-auto h-auto"
          src={appState.appVar.esa_logo}
          alt="logo"
          width={100}
          height={150}
        />
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <h1 className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
          {message}
        </h1>
        <h2 className="mb-2 text-l">{instructions}</h2>
        <h2 className="mb-5 text-l font-bold underline text-blue-500">
          {serviceEmail}
        </h2>
        <h2 className="mb-2 text-l font-bold">{clarification}</h2>
        {!session?.user && (
          <Link href="/user/login" legacyBehavior>
            <button className="bg-blue-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700">
              Login / Register
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default MessageEmailingService;
// MessageEmailingService.auth = true;
