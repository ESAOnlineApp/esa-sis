import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetSchema } from "../../../Schemas";
import Head from "next/head";
import { useRouter } from "next/router";
import { getError } from "../../../utilities/error";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import EmailForResetPassword from "../../../utilities/emailing/emailForResetPassword";
// import selection_data from '../../../utilities/selection_data';


const ForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetSchema),
  });

  const submitHandler = async ({ email }) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/user/password/forgetpassword", {
        email,
      });
      const emailToken = res.data.emailToken;
      const ID = res.data.ID;
      const idForRes = res.data.email;
      await EmailForResetPassword({
        emailToken,
        ID,
        idForRes,
        router,
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(getError(err));
    }
  };

  const baseUrl = 'https://esasis.esa.edu.lb/';

  return (
    <>
      {typeof session?.user === "undefined" ? (
        <>
          <Head>
            <title> Reset Account</title>
          </Head>
          <div className="flex-col text-center">
            <a href={baseUrl}>
              <Image
                className="inline h-auto w-auto"
                src={appState.appVar.esa_logo}
                alt="logo"
                width={100}
                height={150}
              />
            </a>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mt-2 mb-5 mx-auto max-w-screen-md flex-col bg-blue-800  rounded-lg p-8 text-center text-white"
          >
            <h1 className="mb-4 text-3xl font-bold">
              Forget Your Account Password?
            </h1>
            <h1 className="mb-4 text-xl">Please Enter Your ID .</h1>
            {errors && (
              <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
                {errorMessage}
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Enter Your ID"
                className={
                  errors.email
                    ? "w-1/2 text-center text-xl text-black mb-3 mt-2 border-8 border-red-400"
                    : "w-1/2 text-center text-xl text-black mb-3 mt-2"
                }
                id="email"
                {...register("email", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 w-full font-bold">
                {errors.email.message}
              </span>
            )}
            <div className="mb-4 bt-4 mt-2">
              <button
                disabled={isLoading}
                className="bg-blue-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700"
              >
                Reset My Password
              </button>
            </div>
            {isLoading && <Loader />}
          </form>
        </>
      ) : (
        <> {/* FIXME: Jaber need circular progress */} </>
      )}
    </>
  );
};

export default ForgetPassword;
