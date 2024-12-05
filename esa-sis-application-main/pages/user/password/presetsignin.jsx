/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\user\password\presetsignin.jsx
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
// import { getError } from "../../../utilities/error";
import { useDispatch } from "react-redux";
import {
  isLogout,
  loginFailed,
  loginRequest,
  loginSuccess,
} from "../../../redux/slices/userSlice";
import ProgressIndicator from "../../../components/progressIndicator";
import selection_data from "../../../utilities/selection_data";
import decrypt from "../../../utilities/encrypt_decrypt/decryptText";
// import selection_data from '../../../utilities/selection_data';

const PreSignIn = () => {
  // console.log('presigin')
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  // const [message, setMessage] = useState("");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [sessionExist, setsessionExist] = useState(false);
  const [triggerSignIn, settriggerSignIn] = useState(false);
  // console.log(message);
  const dispatch = useDispatch();
  let password = null;
  let userid = null;
  // let isSignedIn = false;
  // let countsign = 0;
  // if (router.query.password) {
  //   password = router.query.password;
  // }
  // if (router.query.email) {
  //   email = router.query.email;
  // }
  const testSession = async () => {
    const userSession = await getSession();
    if (userSession?.user) {
      setisSignedIn(true);
      setsessionExist(true);
      // // console.log('userSession?.user=', userSession?.user);
    } else settriggerSignIn(true);
  };

  if (router.query.query) {
    const encryptedQuery = router.query.query;
    // // console.log('encryptedQuery=', encryptedQuery);
    const query = JSON.parse(decrypt(encryptedQuery));
    // // console.log('query=', query);
    userid = query.userid;
    password = query.password;
    testSession();
    // // console.log('email=', email);
    // // console.log('password=', password);
  }
  // // console.log('Email=', router.query.email);
  // // console.log('Password=', router.query.password);

  // useEffect(() => {
  //   // // console.log('useEffect Triggered....', ++countuseffect);
  //   if (!isSignedIn) {
  //     signinHandler();
  //   }
  //   if (password && email && session?.user) {
  //     router.push(
  //       redirect ||
  //         `/user/password/resetpassword?email=${email}&password=${password}`
  //     );
  //   }
  //   if (!password && !email && session?.user) {
  //     router.push(redirect || '/');
  //   }
  //   // if (!password && !email && typeof session?.user === 'undefined') {
  //   //   router.push(redirect || selection_data.where_going_on_hacking_by_URL);
  //   // }
  // }, [email, isSignedIn, password, redirect, router, session]);

  const signinHandler = async () => {
    // // console.log('inside signinHandler');
    try {
      dispatch(loginRequest());
      const result = await signIn("credentials", {
        redirect: false,
        userid,
        password,
      });
      setisSignedIn(true);
      // console.log('result inside signinHandler==',result);
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
        // setMessage(result.error);
        // console.log('error from else')
      }
    } catch (err) {
      return err
      // setMessage(getError(err));
      // console.log(err)
      // console.log('error from catch')
    }
  };

  useEffect(() => {
    // // console.log('useEffect Triggered....', ++countuseffect);
    if (!isSignedIn) {
      // // console.log('isSignedIn=',isSignedIn);
      signinHandler();
    }
    if (isSignedIn) {
      // if (isSignedIn && session?.user) {
      // // console.log('isSignedIn=',isSignedIn);
      // router.push('/user/studentapplication/routetoapp');
      router.push(
        redirect ||
          `/user/password/resetpassword?userid=${userid}&password=${password}`
      );
    }
    if (!password && !userid && session?.user) {
      // // console.log('!password && !email && session?.user');
      router.push(redirect || selection_data.where_going_after_signin);
    }
  }, [triggerSignIn, sessionExist]);

  // const signinHandler = async () => {
  //   isSignedIn = true;
  //   try {
  //     dispatch(loginRequest());
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       email,
  //       password,
  //     });
  //     // if (result.error) {
  //     //   setMessage(result.error);
  //     // }
  //     if (!result.error) {
  //       const userSession = await getSession();
  //       dispatch(
  //         loginSuccess({
  //           name: userSession.user.name,
  //           _id: userSession.user._id,
  //           major: userSession.user.major,
  //           status: userSession.user.status,
  //           appisSaved:
  //             typeof userSession.user.appisSaved !== 'undefined'
  //               ? userSession.user.appisSaved
  //               : false,
  //           application_Language: userSession.user.application_Language,
  //           profileUrl: userSession.user.profileUrl,
  //         })
  //       );
  //     } else {
  //       dispatch(loginFailed(result.error));
  //       setMessage(result.error);
  //     }
  //   } catch (err) {
  //     setMessage(getError(err));
  //   }
  // };

  // const signinHandler = async () => {
  //   isSignedIn = true;
  //   // // console.log('Sign In ...for:', ++countsign, 'Time(s)');
  //   try {
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       email,
  //       password,
  //     });
  //     // // console.log('Log In Results==', result, 'Is SIGNED IN=', isSignedIn);
  //     if (result.error) {
  //       setMessage(result.error);
  //     }
  //   } catch (err) {
  //     setMessage(getError(err));
  //   }
  //   // // console.log('Logged In user is:', session?.user);
  // };
  return (
    <>
      <div className="grid h-screen place-items-center">
        <ProgressIndicator />
      </div>
    </>
  );
};

export default PreSignIn;
