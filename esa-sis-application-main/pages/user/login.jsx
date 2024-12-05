// import Link from 'next/link';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../utilities/error";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
// import selection_data from '../../utilities/selection_data';
import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import { useState } from "react";
import { useDispatch } from "react-redux";
import esaBuilding from "../../public/images/ESA3.jpg";
import esaLogo from "../../public/images/esa.png";
import {
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  isLogout,
} from "../../redux/slices/userSlice";
import encrypt from "../../utilities/encrypt_decrypt/encryptText";
import axios from "axios";
// import selection_data from '../../utilities/selection_data';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
// import Person2Icon from '@mui/icons-material/Person2';
// import LockIcon from '@mui/icons-material/Lock';
import Image from "next/image";
import { appSetting } from "../../redux/slices/appSlice";

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const [showPassword, setShowPassword] = useState(false);

  const [userInactive, setUserInactive] = useState("");

  const dispatch = useDispatch();

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const userState = useSelector(
    (state) => state.persistedReducer.user_state.userState
  );
  //  console.log('user' , userState)
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );

  // // console.log(errorMessage);

  // FIXME:Dear SIS team, please fix this useEffect to read SIS settings from the database

  useEffect(() => {
    // setErrorMessage('');
    // dispatch(appIsWaiting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/settingdata");
        // const response = await axios.get('/api/controller/settingdata');
        // // console.log("hon",response.data.data)
        if (response.status === 200) {
          const incomingData = JSON.parse(decrypt(response.data.data));
          // // console.log("pppppppp",incomingData.upload_file_single_size)

          dispatch(
            appSetting({
              esa_logo: incomingData.esa_logo,
              out_Save_Timing: incomingData.out_Save_timing,
              upload_file_single_size:
                incomingData.upload_file_single_size * 1024 * 1024,
              upload_file_total_size:
                incomingData.upload_file_total_size * 1024 * 1024,
              upload_file_directory_name:
                incomingData.upload_file_directory_name,
            })
          );
        } else {
          // console.log('error fetching data');
          // localStorage.clear();
          // sessionStorage.clear();
          // const encryptedBody = encrypt(
          //   JSON.stringify({
          //     email: '---',
          //     role: '---',
          //     info: 'From login page,appVar cant be readed from DB',
          //     error: `${response.status}`,
          //   })
          // );
          // await axios.put('/api/logger/sendErrorToLogger', {
          //   data: encryptedBody,
          // });
        }
      } catch (error) {
        console.error(error);
        // localStorage.clear();
        // sessionStorage.clear();
        // const encryptedBody = encrypt(
        //   JSON.stringify({
        //     email: '---',
        //     role: '---',
        //     info: 'From login page,appVar cant be fetched from DB; sessionStorage was cleared',
        //     error: `${error}`,
        //   })
        // );
        // await axios.put('/api/logger/sendErrorToLogger', {
        //   data: encryptedBody,
        // });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  useEffect(() => {
    // // console.log('this is session');
    // // console.log(session?.user.status);
    // console.log('session?.user  : ', session?.user)
    if (session?.user && !userState.user.isLogOut) {
      if (session?.user.role === "1") {
        router.push(redirect || "/student/main");
      } else if (
        session?.user.role === "2" &&
        session?.user.status == "active"
        && session?.user.hasMultiMajor === 'false'
      ) {
        router.push(redirect || "/programManager/students");
      } else if (
        session?.user.role === "2" &&
        session?.user.status == "active" &&
        session?.user.hasMultiMajor === 'true'
      ) {
        router.push(redirect || "/programManager/studentView");
      }
      else if (
        session?.user.role === "3" &&
        session?.user.status == "active" &&
        session?.user.hasMultiMajor === 'false'
      ) {
        router.push(redirect || "/programManager/students");
      }
      else if (
        session?.user.role === "3" &&
        session?.user.status == "active" &&
        session?.user.hasMultiMajor === 'true'
      ) {
        router.push(redirect || "/programManager/studentView");
      }
      else if (session?.user.role === "0") {
        router.push(redirect || "/admin/Accounts");
      } else if (session?.user.role === "4") {
        router.push(redirect || "/superAdmin/ResetPassword");
      } else if (
        session?.user.role === "2" &&
        session?.user.status == "inactive"
      ) {
        setUserInactive("Account Inactive");
      }
      else if (
        session?.user.role === "3" &&
        session?.user.status == "inactive"
      ) {
        setUserInactive("Account Inactive");
      }
    }
    // // console.log('userState.user.isLogOut==', userState.user.isLogOut);
    if (!session?.user && !userState.user.isLogOut) {
      dispatch(logoutSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, session, redirect, userState.user.isLogOut]);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submitHandler = async ({ userid, password }) => {
    try {
      setErrorMessage("");
      dispatch(loginRequest());
      // console.log('password' , password)
      // console.log('userid' , userid)
      const result = await signIn("credentials", {
        redirect: false,
        userid,
        password,
      });
      // temporary commented
      // console.log('the result : ', result)
      if (!result?.error) {
        const userSession = await getSession();
        // console.log('userSession : ', userSession)
        // // console.log('userSession==>', userSession);
        if (userSession) {
          dispatch(
            loginSuccess({
              name: userSession.user.name,
              email: userSession.user.email,
              role: userSession.user.role,
              userid: userSession.user.userid,
              profileUrl: userSession.user.image,
              appisSaved:
                typeof userSession.user.appisSaved !== "undefined"
                  ? userSession.user.appisSaved
                  : false,
            })
          );
          // // console.log(userSession);
          dispatch(isLogout(false));
        }
      } else {
        // // console.log(result.error);
        dispatch(loginFailed(result.error));
        // console.log('errormesage' , errorMessage)
        setErrorMessage(result.error);
      }
    } catch (err) {
      // console.log(err);
      setErrorMessage(getError(err));

      const encryptedBody = encrypt(
        JSON.stringify({
          userid: userid,
          role: "---",
          info: "From login page, unable to reach signIn",
          error: `${getError(err)}`,
        })
      );
      await axios.post("/api/logger/sendErrorToLogger", {
        data: encryptedBody,
      });
    }
  };

  return (
    <>
      <Head>
        <title>ESA SIS - Login</title>
        <link rel="icon" href="/public/index.ico" />
      </Head>
      <div className="bg-[#F7F7F7] h-screen">
        <div className="flex justify-center text-black">
          <div className="imageRes lg:visible invisible">
            <Image
              src={esaBuilding}
              alt="Esa-Building"
              width={456}
              height={690}
            />
          </div>
          <div className="bg-white pr-11 sm:pl-11 bg-white p-6 sm:p-11 w-full max-w-md lg:max-w-lg shadow-md rounded-md">
            <div className="log flex justify-center lg:justify-start items-center mb-6 ">
              <Image
                src={esaLogo}
                width={81}
                className="esaLogo"
                alt="Logo"
                height='100%'
              />
              <div className="leading-7 welcometoSis mt-4 ml-5">
                <p className="welcomeTo text-lg font-semibold">WELCOME TO</p>
                <span className="SIS text-xl font-bold">Student Information System (SIS)</span>
              </div>
            </div>
      
            <div className="text-center  text-[#3D709A] font-bold text-xl mb-4 mt-[7rem]">
              Login
            </div>
            <div className='formContent'>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                  {userInactive && (
                    <div className="text-red-500 error text-center w-full ml-2">
                      {userInactive}
                    </div>
                  )}
                  {errors.email && (
                    <div
                      data-testid="errorEmail"
                      className="text-red-500 error text-center w-full ml-2"
                    >
                      {errors.email.message}
                    </div>
                  )}
                  {!errors.email && errors.password && (
                    <div
                      data-testid="errorPassword"
                      className="text-red-500 error w-full text-center"
                    >
                      {errors.password.message}
                    </div>
                  )}
                  {errors && (
                    <div
                      data-testid="error"
                      className="text-red-500 error text-center w-full mt-4 mb-4"
                    >
                      {errorMessage}
                    </div>
                  )}
                  <div className="formDiv mt-9">
                    <label
                      className="text-[#707070] text-[18px]"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <br />
                    <input
                      className="bg-white inputT ml-2"
                      type="text"
                      data-testid="userid"
                      {...register("userid", {
                        required: "Please Enter username",
                      })}
                    />
                  </div>
                  <div className="formDiv mt-3">
                    <label
                      className="text-[#707070] text-[18px]"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <br />
                    <input
                      className="bg-white inputT focus:outline-none ml-2"
                      type={showPassword === false ? "password" : "text"}
                      data-testid="password"
                      {...register("password", {
                        required: "Please enter password",
                        minLength: {
                          value: 7,
                          message: "password is more than 6 chars",
                        },
                      })}
                    />
                    <div className="absolute passwordVisibility text-[#707070] cursor-pointer">
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
                  <Link href="/user/password/forgetpassword" legacyBehavior>
                    <p className="text-[10px] tracking-normal ml-11 text-[#707070] cursor-pointer mt-1 text-center ">
                      Forgot your Password?
                    </p>
                  </Link>
                </div>
                <div className="text-center ml-11 mt-11">
                  <button
                    className="text-white btn bg-[#3D709A] rounded-3xl p-3"
                    data-testid="btn"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
);
}

LoginScreen.getLayout = function (page) {
  return <>{page}</>;
};
