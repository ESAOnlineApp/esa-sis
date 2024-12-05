/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\auth-error.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function AuthError() {
//   const router = useRouter();

//   useEffect(() => {
//     setTimeout(() => {
//       router.push('/');
//     }, 5000); // redirect to home page after 5 seconds
//   }, [router]);

//   return (
//     <div>
//       <h1>Authentication Error</h1>
//       <p>
//         There was an error with the authentication process. You will be
//         redirected to the home page in 5 seconds.
//       </p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { parse } from "querystring";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { SignOut } from "../components/SignOut";
import Head from "next/head";
import encrypt from "../utilities/encrypt_decrypt/encryptText";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AuthError(statusCode) {
  const [message, setmessage] = useState("");
  const { data: session } = useSession();
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  const sendwarn = async () => {
    const encryptedBody = encrypt(
      JSON.stringify({
        email: session?.user.email,
        role: session?.user.role,
        info: "From auth-error,Unhandled ERROR",
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

  useEffect(() => {
    const query = parse(window.location.search.slice(1));
    if (query.error) {
      console.error(query.error);
      setmessage(query.error);
    }
  }, []);

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
        <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
          {message}
        </div>
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
}

AuthError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : "";
  return statusCode;
};
