/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\user\signin.jsx
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
// import Link from 'next/link';
// import Head from 'next/head';
// import Image from 'next/image';
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getError } from "../../utilities/error";
import { useDispatch } from "react-redux";
import {
  loginFailed,
  loginRequest,
  loginSuccess,
  isLogout,
} from "../../redux/slices/userSlice";
import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import ProgressIndicator from "../../components/progressIndicator";
import selection_data from "../../utilities/selection_data";

const PreSignIn = () => {
  // FIXME: Maybe route the user to the previous page instead of the home page, waiting to have more pages and expressive routing logic
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [sessionExist, setsessionExist] = useState(false);
  const [triggerSignIn, settriggerSignIn] = useState(false);

  const dispatch = useDispatch();
  let password = null;
  let email = null;

  const testSession = async () => {
    const userSession = await getSession();
    if (userSession?.user) {
      setisSignedIn(true);
      setsessionExist(true);
      // // console.log('userSession?.user=', userSession?.user);
    } else settriggerSignIn(true);
  };

  const signinHandler = async () => {
    // // console.log('inside signinHandler');
    try {
      dispatch(loginRequest());
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setisSignedIn(true);
      // // console.log('result inside signinHandler==',result);
      if (!result.error) {
        const userSession = await getSession();
        setsessionExist(true);
        // // console.log('userSession.user==',userSession.user);
        dispatch(
          loginSuccess({
            name: userSession.user.name,
            _id: userSession.user._id,
            major: userSession.user.major,
            status: userSession.user.status,
            appisSaved:
              typeof userSession.user.appisSaved !== "undefined"
                ? userSession.user.appisSaved
                : false,
            application_Language: userSession.user.application_Language,
            profileUrl: userSession.user.profileUrl,
          })
        );
        dispatch(isLogout(false));
      } else {
        dispatch(loginFailed(result.error));
        setMessage(result.error);
      }
    } catch (err) {
      setMessage(getError(err));
    }
  };

  if (router.query.query) {
    const encryptedQuery = router.query.query;
    // // console.log('encryptedQuery=', encryptedQuery);
    const query = JSON.parse(decrypt(encryptedQuery));
    // // console.log('query=', query);
    email = query.email;
    password = query.password;
    testSession();
    // // console.log('email=', email);
    // // console.log('password=', password);
  }

  // // console.log('Email=', email);
  // // console.log('Password=', password);

  useEffect(() => {
    // // console.log('useEffect Triggered....', ++countuseffect);
    if (!isSignedIn) {
      // // console.log('isSignedIn=',isSignedIn);
      signinHandler();
    }
    if (isSignedIn) {
      // if (isSignedIn && session?.user) {
      // // console.log('isSignedIn=',isSignedIn);
      router.push("/user/studentapplication/routetoapp");
    }
    if (!password && !email && session?.user) {
      // // console.log('!password && !email && session?.user');
      router.push(redirect || selection_data.where_going_after_signin);
    }
  }, [triggerSignIn, sessionExist]);

  return (
    <div className="grid h-screen place-items-center">
      <ProgressIndicator />
    </div>
  );
  // return <>{message}</>;
};

export default PreSignIn;
