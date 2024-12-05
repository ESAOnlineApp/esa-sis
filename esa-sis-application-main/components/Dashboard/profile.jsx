import React, { useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../../utilities/error";
import axios from "axios";
import Head from "next/head";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
// import uploadDocumentToCloud from '../../utilities/uploadToCloud/uploadDocumentToCloud';
import uploadDocReducer from "../../components/UploadDocuments/reducers/uploadDocReducer";
import DropZone from "../../components/UploadDocuments/DropZone";
import { ProfileModal } from "../../components/StudentInfoApplication/ModalDocument";
import { useDispatch, useSelector } from "react-redux";
import {
  profileUrlChanged,
  userNameChanged,
} from "../../redux/slices/userSlice";

export default function ProfileScreen() {
  // // console.log("-----------profileRole")
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { data: session, update } = useSession();
  const [profileUrl, setProfileUrl] = useState(null);
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [updateProfileButtonDisable, setupdateProfileButtonDisable] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openProfileModal = () => setShowProfileModal(true);
  const closeModal = () => {
    setShowProfileModal(false);
  };

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const userState = useSelector(
    (state) => state.persistedReducer.user_state.userState
  );

  //Profile
  const [uploadPhotoData, uploadPhotoDispatch] = useReducer(uploadDocReducer, {
    inDropZone: false,
    fileList: [],
    totalSize: 0,
  });

  const getEmail = async () => {
    if (session?.user.role == 1) {
      try {
        let res = await axios.post("/api/user/getStdEmailForEditProfile", {
          user_id: session?.user.userid,
        });
        setEmail(res.data.rows[0].email);
        setInitialEmail(res.data.rows[0].email);
      } catch (error) {
        return error
      }
    }
  };

  useEffect(() => {
    getEmail();
    setValue("fname", session.user.name.trim().split(/\s+/)[0]);
    setValue("lname", session.user.name.trim().split(/\s+/)[1]);
    // setEmail()
    setValue("password", null);
    setValue("confirmPassword", null);
    if (userState.user.appisSaved === false) {
      if (userState.user.profileUrl && userState.user.profileUrl !== " ")
        setProfileUrl(userState.user.profileUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // profile
  // useEffect(() => {

  //   if (uploadPhotoData.fileList.length !== 0) {
  //     setupdateProfileButtonDisable(true);
  //     const uploadProfiletUrl = async () => {
  //       const secure_url = await uploadDocumentToCloud(
  //         uploadPhotoData,
  //         session,
  //         true
  //       );

  //       if (secure_url) setProfileUrl(secure_url);
  //       if (typeof secure_url !== 'undefined') {
  //         dispatch(profileUrlChanged(secure_url));
  //       }
  //       setupdateProfileButtonDisable(false);
  //     };
  //     uploadProfiletUrl();
  //   }
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [uploadPhotoData]);

  useEffect(() => {
    if (uploadPhotoData.fileList.length !== 0) {
      setupdateProfileButtonDisable(true);
      const handleUpload = async () => {
        let secure_url = "undefined";
        try {
          const formData = new FormData();
          formData.append("myImage", uploadPhotoData.fileList[0]);
          // // console.log(uploadPhotoData.fileList[0])
          // // console.log(formData)
          const { data } = await axios.post("/api/uploads/profile", formData);
          secure_url = data.secure_url;
          // console.log('data.secure_url: ', data.secure_url);
          // console.log('secure_url: ', secure_url);

          if (secure_url) setProfileUrl(secure_url);
          if (typeof secure_url !== "undefined") {
            dispatch(profileUrlChanged(secure_url));
          }
          setupdateProfileButtonDisable(false);
        } catch (error) {
          // console.log(error.response?.data);
        }
      };
      handleUpload();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadPhotoData]);

  const submitHandler = async ({ fname, lname, password }) => {
    setMessage("");
    //  // console.log('password==>',password)
    try {
     
      const response = await axios.post("/api/user/updateProfile", {
        fname,
        lname,
        password,
        profileUrl: userState.user.profileUrl,
      });
     

      // // console.log(response.data)
      // // console.log('response.message=', response.data.message);
      if (response.data.message === "User Profile Updated") {
        dispatch(userNameChanged(fname + " " + lname));
      }
      setMessage("Profile Updated Successfully");
      await update({
        ...session,
        user: {
          name: `${fname} ${lname}`
        }
      })
      if (email != initialEmail) {
        let sendData = {
          email: email.trim(),
          user_id: session?.user.userid,
        };
        await axios.post(
          "/api/user/updateEmailForEditProfile",
          sendData
        );
      }
      if (password) {
        const result = await signIn("credentials", {
          redirect: false,
          userid: userState.user.userid,
          password,
        });

        // router.push(redirect || '/');

        if (result.error) {
          setMessage(result.error);
        }
      }

    } catch (err) {
      setMessage(getError(err));
      // console.log(err)
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - Profile</title>
      </Head>
      <form className="mx-auto md:w-1/2" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-center uppercase font-bold text-2xl text-primary">
          Update Your Profile
        </h1>
        {errors && (
          <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
            {message}
          </div>
        )}

        {/* UPLOAD PHOTO Section */}
        <h1 className="my-6 text-l shadow-sm font-bold text-primary">
          Upload Profile Photo
          {/* <span className="text-red-500 mx-1 font-bold">*</span> */}
        </h1>
        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone
          data={uploadPhotoData}
          dispatch={uploadPhotoDispatch}
          type={"photo"}
        />

        {profileUrl && profileUrl !== " " && (
          <div className="flex justify-center items-center">
            {!showProfileModal && (
              <a className="cursor-pointer" onClick={openProfileModal}>
                Preview Profile Photo
              </a>
            )}
            {showProfileModal && (
              <ProfileModal closeModal={closeModal} profileUrl={profileUrl} />
            )}
          </div>
        )}
        {session?.user.role == 1 && (
          <div className="mb-4">
            <label className="font-bold text-primary" htmlFor="fname">
              Email
            </label>
            <input
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            // disabled="true"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="font-bold text-primary" htmlFor="fname">
            First Name
          </label>
          <input
            type="text"
            className="w-full"
            id="fname"
            // disabled="true"
            autoFocus
            {...register("fname", {
              required: "Please enter first name",
            })}
          />
          {errors.fname && (
            <div className="text-red-500">{errors.fname.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="font-bold text-primary" htmlFor="lname">
            Last Name
          </label>
          <input
            type="text"
            className="w-full"
            id="lname"
            // disabled="true"
            // autoFocus
            {...register("lname", {
              required: "Please enter last name",
            })}
          />
          {errors.lname && (
            <div className="text-red-500">{errors.lname.message}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="font-bold text-primary" htmlFor="password">
            Password
          </label>
          <input
            className="w-full"
            id="password"
            type={showPassword === false ? "password" : "text"}
            autoComplete="off"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
                message:
                  "Password should be greater than 7, containing at 1 number and one special (non-alphanumeric) character",
              },
            })}
          />
          <div className="absolute top-8 right-5 cursor-pointer">
            {showPassword === false ? (
              <VisibilityOffIcon
                fontSize="small"
                onClick={showPasswordHandler}
              />
            ) : (
              <VisibilityIcon fontSize="small" onClick={showPasswordHandler} />
            )}
          </div>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="font-bold text-primary" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full"
            type={showConfirmPassword === false ? "password" : "text"}
            autoComplete="off"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 7,
                message: "Confirm Password is Less than 7 chars",
              },
            })}
          />
          <div className="absolute top-8 right-5 cursor-pointer">
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
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>
        <div className="mb-4 flex justify-center">
          <button
            className="primary-button uppercase text-white font-bold"
            disabled={updateProfileButtonDisable}
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}

ProfileScreen.auth = true;
ProfileScreen.adminOnly = true;
