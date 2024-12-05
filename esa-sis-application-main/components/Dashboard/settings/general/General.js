/*
 * Created By: Jaber Mohamad/Mohammad Yassine
 * Project: SIS Application
 * File: components/Admin/settings/general/General.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import axios from "axios";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import ButtomSettings from "./ButtomSettings";
import TopSettings from "./TopSettings";

export const GeneralSettings = () => {
  const {
    handleSubmit,
    register,
    // reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/settingdata");
        const incomingData = JSON.parse(decrypt(response.data.data));
        //// console.log(incomingData.setting[0].personalinfo_dob_min.split('T')[0])
        if (response.status === 200) {
          setValue("AutoSavingTime", incomingData.setting[0].auto_Save_Timing);
          setValue(
            "MaxCharacterCount",
            incomingData.setting[0].max_characters_count
          );
          setValue(
            "YearOfAquisitionLimit",
            incomingData.setting[0].Year_of_Acquisition_Limit
          );
          setValue(
            "DisapearingMessageTime",
            incomingData.setting[0].message_disapear_timing
          );
          setValue(
            "DOBMinDate",
            incomingData.setting[0].personalinfo_dob_min.split("T")[0]
          );
          setValue(
            "DOBMaxDate",
            incomingData.setting[0].personalinfo_dob_max.split("T")[0]
          );
          setValue(
            "SingleFileUploadSize",
            incomingData.setting[0].upload_file_single_size
          );
          setValue(
            "FileUploadTotalSize",
            incomingData.setting[0].upload_file_total_size
          );
          setValue(
            "LoggerExpiryDay",
            incomingData.setting[0].logger_expiry_day
          );
          setValue(
            "LoggerMaxFileSize",
            incomingData.setting[0].logger_max_file_size
          );
          //setValue('FileUploadDirectoryName',incomingData.setting[0].upload_file_directory_name)
          //setValue('CarouselList',incomingData.setting[0].carouselList)
          //setValue('ESALogo',incomingData.setting[0].esa_logo)
          //setValue('LoginBackground',incomingData.setting[0].login_bg)
          // setValue('MBARecommendationLetter',incomingData.setting[0].MBA_recommendation_letter)
          //setValue('EMBARecommendationLetter',incomingData.setting[0].EMBA_recommendation_letter)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetHandler = () => {};
  const submitHandler = async () => {
    const payload = {
      AutoSavingTime: getValues("AutoSavingTime"),
      MaxCharacterCount: getValues("MaxCharacterCount"),
      YearOfAquisitionLimit: getValues("YearOfAquisitionLimit"),
      DisapearingMessageTime: getValues("DisapearingMessageTime"),
      DOBMinDate: getValues("DOBMinDate"),
      DOBMaxDate: getValues("DOBMaxDate"),
      SingleFileUploadSize: getValues("SingleFileUploadSize"),
      FileUploadTotalSize: getValues("FileUploadTotalSize"),
      LoggerExpiryDay: getValues("LoggerExpiryDay"),
      LoggerMaxFileSize: getValues("LoggerMaxFileSize"),
    };
    const encryptedBody = encrypt(JSON.stringify(payload));
    try {
      const result = await axios.put(`/api/admin/setting/editsetting`, {
        data: encryptedBody,
      });
      if (result.status === 200) {
        null;
      }
      return result.data;
    } catch (error) {
      console.error(error);
      return {
        message: "Failed to Update Setting",
      };
    }
  };

  //const formData = getValues();
  //// console.log(formData);
  return (
    <>
      <form
        className="mx-auto w-[80%] p-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-4">
          <TopSettings
            register={register}
            errors={errors}
            resetHandler={resetHandler}
          />
          <ButtomSettings register={register} errors={errors} />

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 p-2 rounded-lg"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
