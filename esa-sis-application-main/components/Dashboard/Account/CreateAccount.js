/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components/Admin/Account/CreateAccount.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useSelector } from 'react-redux';
import { ProfileModal } from '../../StudentInfoApplication/ModalDocument';
import DropZone from '../../UploadDocuments/DropZone';
import uploadDocReducer from '../../UploadDocuments/reducers/uploadDocReducer';
import selection_data from '../../../utilities/selection_data';
import uploadDocumentToCloud from '../../../utilities/uploadToCloud/uploadDocumentToCloud';
import generatePasswod from '../../../utilities/generatePassword';
import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
import axios from 'axios';
import encrypt from '../../../utilities/encrypt_decrypt/encryptText';
import SaveIndicator from '../../SaveIndicator';
import EmailAfterCreateAccount from '../../../utilities/emailing/emailAfterCreateAccount';
import { getError } from '../../../utilities/error';
import { useRouter } from 'next/router';

const CreateAccount = () => {
  const role = selection_data.role;
  const { data: session } = useSession();
  const [profileUrl, setProfileUrl] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [majorlist, setmajorList] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const router = useRouter();

  const openProfileModal = () => setShowProfileModal(true);
  const closeModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/controller/majoritems');
        const incomingeData = JSON.parse(decrypt(response.data.data));
        setmajorList(incomingeData.majors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  let nomail = false;
  let ID;
  // let emailToken;

  const userState = useSelector(
    (state) => state.persistedReducer.user_state.userState
  );

  useEffect(() => {
    const passwordGenerator = () => {
      setValue('password', generatePasswod(8));
    };
    passwordGenerator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programOptions = majorlist.map((major) => ({
    label: major.program,
    value: major.program,
  }));

  const submitHandler = async ({
    role,
    fname,
    lname,
    email,
    major,
    mobileNumber,
    password,
  }) => {
    try {
      setErrorMessage('');
      setIsRegistering(true);
   
      const id_res = await axios.post('/api/user/generateID', {
        data: encrypt(JSON.stringify(major[0].label)),
      });
      const incomingID = JSON.parse(decrypt(id_res.data.data));
      ID = incomingID.ID;
    

      const payload = {
        ID,
        email,
        password,
        profileUrl,
        major: major[0].label,
        role,
        fname: fname.replace(/ /g, '-'),
        lname: lname.replace(/ /g, '-'),
        mobileNumber,
        selectedOptions: selectedOptions.slice(1).map((option) => option.label),
      };
   

      const encryptedBody = encrypt(JSON.stringify(payload));
      await axios.post('/api/admin/account', { data: encryptedBody });
      setMessage('Account created successfully');
      // const incomingReponse = JSON.parse(decrypt(res.data.data));
      // emailToken = incomingReponse.emailToken;
    } catch (err) {
      err.message === 'Request failed with status code 500';

      setErrorMessage(`${getError(err)}`);

      nomail = true;
      setIsRegistering(false);
    }
    if (!nomail) {
      await EmailAfterCreateAccount({
        lname,
        fname,
        ID,
        email,
        password,
      });
      setValue('role', '');
      setValue('fname', '');
      setValue('lname', '');
      setValue('email', '');
      uploadPhotoDispatch({
        type: 'REMOVE_ALL_FILE_FROM_LIST',
        uploadPhotoData,
      });
      setProfileUrl('');
      setValue('selectedOptions', (selectedOptions.length = 0));
      setValue('mobileNumber', '');
      setValue('password', generatePasswod(8));
      setIsRegistering(false);
      router.push('/admin/Account/CreateAccount');
    }
  };

  //Profile
  const [uploadPhotoData, uploadPhotoDispatch] = useReducer(uploadDocReducer, {
    inDropZone: false,
    fileList: [],
    totalSize: 0,
  });

  useEffect(() => {
    if (uploadPhotoData.fileList.length !== 0) {
      const uploadProfiletUrl = async () => {
        const secure_url = await uploadDocumentToCloud(
          uploadPhotoData,
          session,
          false
        );
        if (secure_url) setProfileUrl(secure_url);
      };
      uploadProfiletUrl();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadPhotoData]);

  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);

  return (
    <>
      <form className="mx-auto md:w-1/2" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-4">
          <div className="flex md:justify-center">
            <label className="w-32 mt-2">
              Role <a className="text-red-500 font-bold">*</a>
            </label>

            <select
              className={`md:w-full ${errors.role && 'border border-red-500'}`}
              id="role"
              name="role"
              {...register('role', {
                required: 'Select Role',
              })}
            >
              {/* {role.map((roles, index) => (
                <option key={index} value={index}>{roles}</option>
              ))} */}
              <option value=""></option>
              <option value="0">{role[1]}</option>
              <option value="2">{role[2]}</option>
              <option value="3">{role[3]}</option>
            </select>
          </div>
          {errors.role && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.role.message}
            </div>
          )}

          <div className="flex md:justify-center">
            <label className="w-32 mt-2">
              First Name <a className="text-red-500 font-bold">*</a>
            </label>
            <input
              type="text"
              className={`md:w-full ${errors.fname && 'border border-red-500'}`}
              name="fname"
              id="fname"
              {...register('fname', {
                required: 'Enter First Name',
              })}
            />
          </div>
          {errors.fname && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.fname.message}
            </div>
          )}

          <div className="flex md:justify-center">
            <label className="w-32 mt-2">
              Last Name <a className="text-red-500 font-bold">*</a>
            </label>
            <input
              type="text"
              className={`md:w-full ${errors.lname && 'border border-red-500'}`}
              name="lname"
              id="lname"
              {...register('lname', {
                required: 'Enter Last Name',
              })}
            />
          </div>
          {errors.lname && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.lname.message}
            </div>
          )}

          <div className="flex md:justify-center">
            <label className="w-32 mt-2">
              Email <a className="text-red-500 font-bold">*</a>
            </label>
            <input
              type="email"
              className={`md:w-full ${errors.email && 'border border-red-500'}`}
              name="email"
              id="email"
              {...register('email', {
                required: 'Enter User Account Email',
              })}
            />
          </div>
          {errors.email && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.email.message}
            </div>
          )}

          <label className="w-32 mt-2">Profile Photo</label>
          <DropZone
            data={uploadPhotoData}
            dispatch={uploadPhotoDispatch}
            type={'photo'}
          />
          {profileUrl && profileUrl !== ' ' && (
            <div className="flex md:justify-center items-center">
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

          <div className="flex md:justify-center">
            <label className="w-32 mt-2">
              Program <a className="text-red-500 font-bold">*</a>
            </label>
            <Controller
              control={control}
              name="major"
              render={({ field: { onChange, name, value } }) => (
                <Select
                  className={`md:w-full ${
                    errors.major && 'border border-red-500'
                  }`}
                  name={name}
                  isMulti
                  options={programOptions}
                  onChange={(options) => {
                    setSelectedOptions(options);
                    onChange(options);
                  }}
                  selected={value}
                />
              )}
              {...register('major', {
                required: 'Select 1 or more Program',
              })}
            />
          </div>
          {errors.major && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.major.message}
            </div>
          )}

          <div className="flex md:justify-center">
            <label className="w-34 mt-2">
              Mobile Number <a className="text-red-500 font-bold">*</a>
            </label>
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
                  className="w-full mr-2 mt-2"
                  country="lb"
                  excludeCountries={['il']}
                  preferredCountries={['lb', 'fr']}
                  countryCodeEditable={true}
                  inputStyle={{ width: '200px', height: '40px' }}
                  onChange={onChange}
                  disabled={
                    userState.user.status !== 'incomplete' ? true : false
                  }
                  masks={{
                    lb: '.. ... ...',
                    fr: '... .. .. ..',
                  }}
                  isValid={(value) => {
                    if (value.match(/^(\+\d{1,3}[- ]?)?\d{7,11}$/)) {
                      return true;
                    } else if (!value.match(/^(\+\d{1,3}[- ]?)?\d{7,11}$/)) {
                      {
                        register('mobileNumber', {
                          required: 'Please Enter Your Mobile Number',
                        });
                      }
                      return false;
                    } else if (value.match(/12345/) || value.match(/00000/)) {
                      return 'Invalid phone number';
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
            <div className="text-red-500 font-bold text-sm w-full md:ml-28 sm:ml-32 mb-4">
              {errors.mobileNumber.message}
            </div>
          )}

          <div className="flex md:justify-center">
            <label className="w-32 mt-2">Password</label>
            <input
              type="text"
              className="md:w-full"
              disabled={true}
              {...register('password')}
            />
          </div>
          <div className="text-center text-red-500 font-bold p-2">
            {message}
          </div>
          {errors && (
            <div className="text-center text-red-500 font-bold p-2">
              {errorMessage}
            </div>
          )}

          <div className="flex md:justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 p-2 rounded-lg"
              type="submit"
            >
              {isRegistering ? (
                <div className="flex gap-2 justify-center text-white font-bold">
                  <SaveIndicator /> Registering...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
CreateAccount.auth = true;
CreateAccount.adminOnly = true;
