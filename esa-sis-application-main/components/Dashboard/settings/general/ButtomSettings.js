/*
 * Created By: Jaber Mohamad/Mohammad Yassine
 * Project: SIS Application
 * File: components/Admin/settings/general/ButtomSettings.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";

const ButtomSettings = ({ register, errors }) => {
  // const [fileUploadDirectory, setFileUploadDirectory] = useState();
  const [carouselList, setCarouselList] = useState();
  const [ESALogo, setESALogo] = useState();
  const [loginBackground, setLoginBackground] = useState();
  const [MBARecommendationLetter, setMBARecommendationLetter] = useState();
  const [EMBARecommendationLetter, setEMBARecommendationLetter] = useState();
  const [upload_file_directory_name, setUpload_file_directory_name] =
    useState(0);
  // function fileUploadDirectoryChangeHandler(e) {
  //   setFileUploadDirectory(e.target.files[0]);
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/settingdata");
        const incomingData = JSON.parse(decrypt(response.data.data));
        //// console.log(incomingData.setting[0].personalinfo_dob_min.split('T')[0])
        if (response.status === 200) {
          //setCarouselList(incomingData.setting[0].carouselList)
          setESALogo(incomingData.setting[0].esa_logo);
          setLoginBackground(incomingData.setting[0].login_bg);
          setMBARecommendationLetter(
            incomingData.setting[0].MBA_recommendation_letter
          );
          setEMBARecommendationLetter(
            incomingData.setting[0].EMBA_recommendation_letter
          );
          setUpload_file_directory_name(
            incomingData.setting[0].upload_file_directory_name
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function carouselListChangeHandler(e) {
    setCarouselList(e.target.files);
  }

  const list = carouselList ? [...carouselList] : [];
  const data = new FormData();
  list.forEach((file, i) => {
    data.append(`file-${i}`, file, file.name);
  });

  const carouselFiles = list.map((file) => {
    return `${file.name}`;
  });
  function UploadDirectoryChangeHandler(e) {
    setUpload_file_directory_name(e.target.value);
  }

  function ESALogoChangeHandler(e) {
    setESALogo(e.target.files[0]);
  }

  function loginBackgroundChangeHandler(e) {
    setLoginBackground(e.target.files[0]);
  }

  function MBARecommendationLetterChangeHandler(e) {
    setMBARecommendationLetter(e.target.files[0]);
  }

  function EMBARecommendationLetterChangeHandler(e) {
    setEMBARecommendationLetter(e.target.files[0]);
  }
  //// console.log(ESALogo.split('/').pop());
  return (
    <>
      <div className="flex gap-4">
        <label className="w-[240px] mt-2">File Upload Directory Name</label>
        <input
          type="text"
          value={upload_file_directory_name}
          className={`md:w-[340px] ${
            errors.FileUploadDirectoryName && "border border-red-500"
          }`}
          {...register("FileUploadDirectoryName", {
            //required: 'Enter URL path for your Directory',
            onChange: (e) => {
              UploadDirectoryChangeHandler(e);
            },
          })}
        />
        <label></label>
      </div>
      {errors.FileUploadDirectoryName && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.FileUploadDirectoryName.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Carousel List</label>
        <input
          type="text"
          value={carouselFiles}
          className={`md:w-[385px] ${
            errors.CarouselList && "border border-red-500"
          }`}
          {...register("CarouselList", {
            //required: 'Upload files or enter Carousel path url',
          })}
        />
        <input
          className="mt-2"
          type="file"
          multiple
          accept="image/*"
          onChange={carouselListChangeHandler}
        ></input>
      </div>
      {errors.CarouselList && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.CarouselList.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">ESA Logo</label>
        <input
          type="text"
          value={ESALogo && ESALogo.length > 0 ? ESALogo.split("/").pop() : ""}
          className={`md:w-[385px] ${
            errors.ESALogo && "border border-red-500"
          }`}
          {...register("ESALogo", {
            //required: 'Upload file or enter Logo path url',
          })}
        />
        <input
          className="mt-2"
          type="file"
          accept="image/*"
          onChange={ESALogoChangeHandler}
        />
      </div>
      {errors.ESALogo && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.ESALogo.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Login Background</label>
        <input
          type="text"
          value={
            loginBackground && loginBackground.length > 0
              ? loginBackground.split("/").pop()
              : ""
          }
          className={`md:w-[385px] ${
            errors.LoginBackground && "border border-red-500"
          }`}
          {...register("LoginBackground", {
            //required: 'Upload file or enter Background path url',
          })}
        />
        <input
          className="mt-2"
          type="file"
          accept="image/*"
          onChange={loginBackgroundChangeHandler}
        />
      </div>
      {errors.LoginBackground && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.LoginBackground.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">MBA Recommendation Letter</label>
        <input
          type="text"
          value={
            MBARecommendationLetter && MBARecommendationLetter.length > 0
              ? MBARecommendationLetter.split("/").pop()
              : ""
          }
          className={`md:w-[385px] ${
            errors.MBARecommendationLetter && "border border-red-500"
          }`}
          {...register("MBARecommendationLetter", {
            // required: 'Upload file or enter path url',
          })}
        />
        <input
          className="mt-2"
          type="file"
          accept=".pdf"
          onChange={MBARecommendationLetterChangeHandler}
        />
      </div>
      {errors.MBARecommendationLetter && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.MBARecommendationLetter.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">EMBA Recommendation Letter</label>
        <input
          type="text"
          value={
            EMBARecommendationLetter && EMBARecommendationLetter.length > 0
              ? EMBARecommendationLetter.split("/").pop()
              : ""
          }
          className={`md:w-[385px] ${
            errors.EMBARecommendationLetter && "border border-red-500"
          }`}
          {...register("EMBARecommendationLetter", {
            // required: 'Upload file or enter path url',
          })}
        />
        <input
          className="mt-2"
          type="file"
          accept=".pdf"
          onChange={EMBARecommendationLetterChangeHandler}
        />
      </div>
      {errors.EMBARecommendationLetter && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-64 sm:ml-32 mb-4">
          {errors.EMBARecommendationLetter.message}
        </div>
      )}
    </>
  );
};

export default ButtomSettings;
