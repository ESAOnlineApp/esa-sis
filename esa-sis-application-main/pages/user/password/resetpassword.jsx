/*
Created By: Mohammad Jaber
Page: Reset Password Page
Created At: 17/10/2022 
*/

import React, { useEffect } from "react";
// import Link from 'next/link';
import Head from "next/head";
import Image from "next/image";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getError } from "../../../utilities/error";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailed,
  loginRequest,
  loginSuccess,
} from "../../../redux/slices/userSlice";
// import selection_data from '../../../utilities/selection_data';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Modal from '../../../components/Modal';
const ResetPassword = () => {
  // Edited By:KANSO ADI 19-10-2022
  // Very important to prevent the routing if loged inn and the user pass the url of this page
  /* Checking if the user is logged in or not. If the user is logged in, it will redirect him to the
  home page. */
  // FIXME: Maybe route the user to the previous page instead of the home page, waiting to have more pages and expressive routing logic
  // canceled as per owner request, don't generate a password and singin with it only take the user choose one
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [message, setMessage] = useState('');
  let generatedPassword = null;
  let userid = null;
  // canceled as per owner request, don't generate a password and singin with it only take the user choose one

  if (router.query.password) {
    generatedPassword = router.query.password;
  }
  // console.log('password')
  // console.log(generatedPassword)
  if (router.query.userid) {
    userid = router.query.userid;
  }
  // console.log('user')
  // console.log(userid)
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  // // console.log('Email=', router.query.email);
  // // console.log('Password=', router.query.password);

  // canceled as per owner request, don't generate a password and singin with it only take the user choose one
  useEffect(() => {
    if (!generatedPassword && !userid && session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect, generatedPassword, userid]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = async ({ password }) => {
    // // console.log('Reset Password Function ....');
    if (password) {
      try {
        await axios.post("/api/user/password/changepassword", {
          userid,
          password,
        });
        // console.log('Password Updated Successfully');
        dispatch(loginRequest());
        const result = await signIn("credentials", {
          redirect: false,
          userid,
          password,
        });
        setErrorMessage("Password Updated Successfully");
        router.push(redirect || "/");
        // if (result.error) {
        //   setErrorMessage(result.error);
        // }

        if (!result.error) {
          const userSession = await getSession();
          dispatch(
            loginSuccess({
              name: userSession.user.name,
              _id: userSession.user._id,
              major: userSession.user.major,
              status: userSession.user.status,
              appisSaved: userSession.user.appisSaved,
              application_Language: userSession.user.application_Language,
              profileUrl: userSession.user.profileUrl,
            })
          );
        } else {
          dispatch(loginFailed(result.error));
          setErrorMessage(result.error);
        }
      } catch (err) {
        setErrorMessage(getError(err));
      }
    } else {
      router.push(redirect || "/");
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head>
        <title>Reset Student Account</title>
      </Head>
      <div className=" flex-col m-auto  max-w-md flex-wrap content-center text-center">
        <Image
          className="inline w-auto h-auto"
          src={appState.appVar.esa_logo}
          alt="logo"
          width={100}
          height={150}
        />

        <h1 className="mb-4 text-3xl font-bold">Password Reset </h1>

        {errors && (
          <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
            {errorMessage}
          </div>
        )}

        {/* Was canceled as per owner request 24-11-2022 KANSO Adi */}
        <h2 className="mb-4 text-xl font-bold">
          The Password Was set To:
          <span className="font-bold text-red-700">{generatedPassword}</span>,
          Provide a new one if you want!
        </h2>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex justify-between relative items-center mb-2">
            <label className=" w-48" htmlFor="password">
              Password
            </label>
            {/* <a className="text-red-500 ml-2 font-bold">*</a> */}
            <input
              type={showPassword === false ? "password" : "text"}
              {...register("password", {
                // required: 'Please enter password',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
                  message:
                    "Password should be greater than 7, containing at 1 number and one special (non-alphanumeric) character",
                },
              })}
              className="w-full ml-2"
              id="password"
            ></input>
            <div className="absolute top-2 right-5 cursor-pointer">
              {showPassword === false ? (
                <VisibilityOffIcon
                  fontSize="small"
                  onClick={showPasswordHandler}
                />
              ) : (
                <VisibilityIcon
                  fontSize="small"
                  onClick={showPasswordHandler}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <div className="text-red-500 w-full ml-48 mb-4">
              {errors.password.message}
            </div>
          )}

          <div className="flex justify-between items-center relative mb-2">
            <label className=" w-48" htmlFor="confirmPassword">
              Confirm Password
            </label>
            {/* <a className="text-red-500 ml-2 font-bold">*</a> */}
            <input
              className="w-full ml-2"
              type={showConfirmPassword === false ? "password" : "text"}
              id="confirmPassword"
              {...register("confirmPassword", {
                // required: 'Please enter confirm password',
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 7,
                  message: "confirm password is less than 7 chars",
                },
              })}
            />
            <div className="absolute top-2 right-5 cursor-pointer">
              {showConfirmPassword === false ? (
                <VisibilityOffIcon
                  fontSize="small"
                  onClick={showConfirmPasswordHandler}
                />
              ) : (
                <VisibilityIcon
                  fontSize="small"
                  onClick={showConfirmPasswordHandler}
                />
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <div className="text-red-500 w-full ml-48 mb-4">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 w-full ml-48 mb-4">
                Password do not match!
              </div>
            )}

          <button className="bg-blue-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700">
            Set Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
ResetPassword.auth = true;
