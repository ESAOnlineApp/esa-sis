/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\user\register.jsx
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

/* Importing all the required libraries. */
import React, { useEffect, StrictMode, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
// import Layout from '../../components/Layout';

import { getError } from "../../utilities/error";
// import { toast } from 'react-toastify';

import { useRouter } from "next/router";
import axios from "axios";
// import selection_data from '../../utilities/selection_data';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import EmailAfterRegister from "../../utilities/emailing/emailAfterRegister";
import encrypt from "../../utilities/encrypt_decrypt/encryptText";
import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import SaveIndicator from "../../components/SaveIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import sendErrorToSlack from '../api/slack/sendErrorToSlack';
// import ErrorOccur from '../_error';

export default function LoginScreen() {
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { redirect } = router.query;
  const [isRegistering, setIsRegistering] = useState(false);
  const [majorlist, setmajorList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /* Checking if the user is logged in, if so, it will redirect to the home page. */
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/majoritems");
        const incomingeData = JSON.parse(decrypt(response.data.data));
        setmajorList(incomingeData.majors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  /* A hook that is used to handle form state. */
  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  let nomail = false;
  let ID, emailToken;
  // const { serverRuntimeConfig } = getConfig();
  // FIXME: attached image don't work in production version
  // // console.log(
  //   'Path=',
  //   path.join(serverRuntimeConfig.PROJECT_ROOT, './path/to/file.json').toString
  // );
  /**
   * It takes in a bunch of data, sends it to the server, and then sends an email to the user.
   * </code>
   */

  // FIXME: JABER Need a progress bar after "Register" clicked
  //
  const submitHandler = async ({
    fname,
    lname,
    email,
    major,
    password,
    mobileNumber,
  }) => {
    let writeToDberror = "";
    try {
      setErrorMessage("");
      setIsRegistering(true);
      const id_res = await axios.post("/api/user/generateID", {
        data: encrypt(JSON.stringify(major)),
      });
      const incomingID = JSON.parse(decrypt(id_res.data.data));
      ID = incomingID.ID;
      // // console.log('ID=', ID);
      /* Sending the data to the server.  */
      const payload = {
        ID,
        fname: fname.replace(/ /g, "-"),
        lname: lname.replace(/ /g, "-"),
        email,
        major,
        password,
        mobileNumber,
      };
      // Encrypt the data before sending in the body
      // end-to-end encryption for query parameters
      const encryptedBody = encrypt(JSON.stringify(payload));
      const res = await axios.post("/api/user/signup", { data: encryptedBody });
      const incomingReponse = JSON.parse(decrypt(res.data.data));
      emailToken = incomingReponse.emailToken;
      // // console.log('res==', res);
    } catch (err) {
      // // console.log('error==', err);
      err.message === "Request failed with status code 500"
        ? (writeToDberror = "Check Your Internet Connection")
        : (writeToDberror = "");

      setErrorMessage(`${getError(err)}; ${writeToDberror}`);

      if (writeToDberror === "") {
        const encryptedBody = encrypt(
          JSON.stringify({
            email: email,
            role: "1",
            info: "From register page,signup",
            error: `${getError(err)}`,
          })
        );
        await axios.post("/api/logger/sendErrorToLogger", {
          data: encryptedBody,
        });
        // await axios.post(
        //   'https://hooks.slack.com/services/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',

        //   {
        //     text: 'Hello, Slack!',
        //   }
        // );

        // sendErrorToSlack(getError(err));
      }

      nomail = true;
      setIsRegistering(false);
    }
    if (!nomail) {
      await EmailAfterRegister({
        emailToken,
        password,
        lname,
        fname,
        ID,
        email,
        router,
      });
    }
  };

  // try {
  return (
    /* A React feature that helps you identify components with unsafe lifecycles. */
    // </Layout>
    <StrictMode>
      <div>
        <form className="mx-auto max-w" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="mb-4 text-4xl">New User? Register</h1>
          <hr></hr>
          {errors && (
            <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-between items-center mt-5 mb-2">
            <label className=" w-48" htmlFor="fname">
              First Name
            </label>
            <a className="text-red-500 ml-2 font-bold">*</a>

            <input
              type="text"
              className="w-full ml-2 bg-transparent"
              id="fname"
              {...register("fname", {
                required: "Please Enter First Name",
              })}
            />
          </div>
          {errors.fname && (
            <div className="text-red-500 w-full md:ml-48 sm:ml-32 mb-4">
              {errors.fname.message}
            </div>
          )}

          <div className="flex justify-between items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="lname">
              Last Name
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold">*</a>
            <input
              type="text"
              className="w-full ml-2 mt-4 bg-transparent"
              id="lname"
              {...register("lname", {
                required: "Please Enter Last Name",
              })}
            />
          </div>
          {errors.lname && (
            <div className="text-red-500 w-full md:ml-48 sm:ml-32 mb-4">
              {errors.lname.message}
            </div>
          )}

          <div className="flex justify-between items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="email">
              Email
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold ">*</a>
            <input
              type="email"
              {...register("email", {
                required: "Please Enter Your Email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please Enter a Valid Email",
                },
              })}
              className="w-full ml-2 mt-4 bg-transparent"
              id="email"
            />
          </div>

          <div className="flex justify-between items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="major">
              Program
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold">*</a>
            <select
              className="w-full ml-2 mt-4 bg-transparent"
              id="major"
              {...register("major", {
                required: "Please Select Major",
              })}
            >
              {majorlist.map((major, index) => (
                <option className="text-black" key={index}>
                  {major.program}
                </option>
              ))}
            </select>
          </div>
          {errors.major && (
            <div className="text-red-500 text-sm w-full md:ml-48 sm:ml-32 mb-4">
              {errors.major.message}
            </div>
          )}

          <div className="flex justify-between relative items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="password">
              Password
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold">*</a>
            <input
              type={showPassword === false ? "password" : "text"}
              {...register("password", {
                required: "Please Enter Password",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
                  message:
                    "Password should be greater than 7, containing at 1 number and one special (non-alphanumeric) character",
                },
              })}
              className="w-full ml-2 mt-4 bg-transparent"
              id="password"
            />
            <div className="absolute top-6 right-5 cursor-pointer">
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
            <div className="text-red-500 md:ml-48 sm:ml-32 mb-4">
              {errors.password.message}
            </div>
          )}

          <div className="flex justify-between relative items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold">*</a>
            <input
              className="w-full ml-2 mt-4 bg-transparent"
              type={showConfirmPassword === false ? "password" : "text"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please Confirm Your Password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 7,
                  message: "Confirm Password is Less than 7 chars",
                },
              })}
            />
            <div className="absolute top-6 right-5 cursor-pointer">
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
            <div className="text-red-500 w-full md:ml-48 sm:ml-32 mb-4">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 w-full md:ml-48 sm:ml-32 mb-4">
                Password do not Match!
              </div>
            )}
          <div className="flex justify-between items-center mb-2">
            <label className=" w-48 mt-4" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <a className="text-red-500 ml-2 mt-4 font-bold">*</a>

            <Controller
              control={control}
              name="mobileNumber"
              id="mobileNumber"
              render={({ field: { onChange, ref, ...field } }) => (
                <PhoneInput
                  {...field}
                  inputExtraProps={{
                    ref,
                    required: true,
                  }}
                  className="w-full ml-2 mt-4 text-black bg-transparent"
                  country=""
                  excludeCountries={["il"]}
                  preferredCountries={["lb", "fr"]}
                  countryCodeEditable={true}
                  inputStyle={{
                    width: "200px",
                    height: "40px",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  onChange={onChange}
                  masks={{
                    lb: ".. ... ...",
                    fr: "... .. .. ..",
                  }}
                  // isValid={(value, country) => {
                  isValid={(value) => {
                    if (value.match(/^(\+\d{1,3}[- ]?)?\d{7,11}$/)) {
                      return true;
                    } else if (!value.match(/^(\+\d{1,3}[- ]?)?\d{7,11}$/)) {
                      {
                        register("mobileNumber", {
                          required: "Please Enter Your Mobile Number",
                        });
                      }
                      return false;
                    } else if (value.match(/12345/) || value.match(/00000/)) {
                      return "Invalid phone number";
                    } else if (value.match(/1234/) || value.match(/0000/)) {
                      return false;
                    } else {
                      return true;
                    }
                  }}
                />
              )}
            />
          </div>
          {errors.mobileNumber && (
            <div className="text-red-500 w-full md:ml-48 sm:ml-32">
              {errors.mobileNumber.message}
            </div>
          )}

          <div className="mb-4 mt-8 flex justify-center ">
            <button className="primary-button w-48 uppercase text-xl mx-32 hover:text-white hover:font-bold">
              {isRegistering ? (
                <div className="flex gap-2 justify-center text-white font-bold">
                  <SaveIndicator /> Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </StrictMode>
  );
  // } catch (error) {
  //   sendErrorToSlack(error);
  //   // console.log('error==', error);
  //   return (
  //     <>
  //       <ErrorOccur />
  //     </>
  //   );
  // }
}
