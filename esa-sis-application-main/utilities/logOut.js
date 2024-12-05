/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\logOut.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { logoutSuccess } from "../redux/slices/userSlice";

const LogOut = async (router) => {
  // const dispatch = useDispatch();
  // await signOut({ callbackUrl: '/user/login' });
  // console.log('router.locale before=', router.locale);
  if (router.locale === "fr") {
    await router.push(router.asPath, undefined, { locale: "en-US" });
    // console.log('router.locale after=', router.locale);
  }
  // FIXME: delete this two line router and signout() after fixing the forwardRef bug in dob datepicker
  await router.push("/");
  await signOut();
  // FIXME: un-comment after fixing the forwardRef bug in dob datepicker
  // await signOut({ redirect: true, callbackUrl: '/user/login' });
  // dispatch(logoutSuccess());
  return <></>;
};
export default LogOut;
