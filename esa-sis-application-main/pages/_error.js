/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\_error.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
// import selection_data from '../utilities/selection_data';
import encrypt from "../utilities/encrypt_decrypt/encryptText";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { SignOut } from "../components/SignOut";
// import { getError } from '../utilities/error';
// import { NextErrorComponent } from 'next/error';
// import { NextErrorComponent } from 'next/dist/shared/lib/utils';

const ErrorOccur = (statusCode) => {
  const { data: session } = useSession();
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  const sendwarn = async () => {
    const encryptedBody = encrypt(
      JSON.stringify({
        email: session?.user.email,
        role: session?.user.role,
        info: "From _error,Unhandled ERROR",
        error: `${
          Object.keys(statusCode).length !== 0
            ? statusCode
            : "Undefined Error on client side"
        }`,
      })
    );
    await axios.post("/api/logger/sendWarnToLogger", {
      data: encryptedBody,
    });
  };

  useEffect(() => {
    sendwarn();
    // // console.log('statusCode=',statusCode);
    // // console.log('session?.user.email=',session?.user.email);
    // // console.log('session?.user.role=',session?.user.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session !== undefined && statusCode !== undefined]);

  return (
    <>
      <Head>
        <title>An Error Occurs</title>
      </Head>
      <div className="flex-col text-center">
        <h1 className="mb-4 text-3xl font-bold text-red-500">Error</h1>
        <h2 className="mb-4 text-xl font-bold">
          An Error Occurs, Message was sent to Technical Support
        </h2>
        <Image
          className="inline w-auto h-auto"
          src={appState.appVar.esa_logo}
          alt="logo"
          width={100}
          height={150}
        />
        {/* <h1>
          {statusCode!== undefined
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1> */}
        <Link href="/user/login" legacyBehavior>
          <p className="underline cursor-pointer hover:text-blue-800">
            Click Here To Return Back To Login Page
          </p>
        </Link>
        <SignOut />
      </div>
    </>
  );
};

ErrorOccur.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : "";
  return statusCode;
};
// export async function getStaticProps({ res, err }) {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { props: { statusCode } };
// }

export default ErrorOccur;
// export default NextErrorComponent(ErrorOccur);
