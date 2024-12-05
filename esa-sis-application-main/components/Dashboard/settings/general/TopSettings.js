/*
 * Created By: Jaber Mohamad/Mohammmad Yassine
 * Project: SIS Application
 * File: components/Admin/settings/general/TopSettings.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";

const TopSettings = ({ register, errors, resetHandler }) => {
  const [auto_Save_Timing, setAuto_Save_Timing] = useState(0);
  const [max_characters_count, setMax_Characters_Count] = useState(0);
  const [Year_of_Acquisition_Limit, setYear_of_Acquisition_Limit] = useState(0);
  const [message_disapear_timing, setMessage_disapear_timing] = useState(0);
  const [personalinfo_dob_min, setPersonalinfo_dob_min] = useState(0);
  const [personalinfo_dob_max, setPersonalinfo_dob_max] = useState(0);
  const [upload_file_single_size, setUpload_file_single_size] = useState(0);
  const [upload_file_total_size, setUpload_file_total_size] = useState(0);
  const [logger_expiry_day, setLogger_expiry_day] = useState(0);
  const [logger_max_file_size, setLogger_max_file_size] = useState(0);
  const [refresh, setRefresh] = useState(false);
  //const [upload_file_directory_name,setUpload_file_directory_name]=useState(0)
  //const [carouselList,setCarouselList]=useState([])
  //const [esa_logo,setEsa_logo]=useState('')
  //const [login_bg,setLogin_bg]=useState('')
  //const [MBA_recommendation_letter,setMBA_recommendation_letter]=useState('')
  //const [EMBA_recommendation_letter,setEMBA_recommendation_letter]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/settingdata");
        const incomingData = JSON.parse(decrypt(response.data.data));
        //// console.log(incomingData.setting[0].personalinfo_dob_min.split('T')[0])
        if (response.status === 200) {
          setAuto_Save_Timing(incomingData.setting[0].auto_Save_Timing);
          setMax_Characters_Count(incomingData.setting[0].max_characters_count);
          setYear_of_Acquisition_Limit(
            incomingData.setting[0].Year_of_Acquisition_Limit
          );
          setMessage_disapear_timing(
            incomingData.setting[0].message_disapear_timing
          );
          setPersonalinfo_dob_min(
            incomingData.setting[0].personalinfo_dob_min.split("T")[0]
          );
          setPersonalinfo_dob_max(
            incomingData.setting[0].personalinfo_dob_max.split("T")[0]
          );
          setUpload_file_single_size(
            incomingData.setting[0].upload_file_single_size
          );
          setUpload_file_total_size(
            incomingData.setting[0].upload_file_total_size
          );
          setLogger_expiry_day(incomingData.setting[0].logger_expiry_day);
          setLogger_max_file_size(incomingData.setting[0].logger_max_file_size);
          //setUpload_file_directory_name(incomingData.setting[0].upload_file_directory_name)
          //setCarouselList(incomingData.setting[0].carouselList)
          //setEsa_logo(incomingData.setting[0].esa_logo)
          //setLogin_bg(incomingData.setting[0].login_bg)
          // setMBA_recommendation_letter(incomingData.setting[0].MBA_recommendation_letter)
          //setEMBA_recommendation_letter(incomingData.setting[0].EMBA_recommendation_letter)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);
  resetHandler = async () => {
    try {
      const response = await axios.put(`/api/admin/setting/reset`, {});
      if (response.status === 200) {
        setRefresh(!refresh);
        return response.data;
      }
    } catch (error) {
      console.error(error);

      return {
        message: "Failed to Reset table",
      };
    }
  };
  const handleChange = (name, value) => {
    //// console.log("handleChange called with", name, value);
    switch (name) {
      case "AutoSavingTime":
        setAuto_Save_Timing(value);
        break;
      case "DisapearingMessageTime":
        setMessage_disapear_timing(value);
        break;
      case "DOBMinDate":
        setPersonalinfo_dob_min(value);
        break;
      case "DOBMaxDate":
        setPersonalinfo_dob_max(value);
        break;
      case "YearOfAquisitionLimit":
        setYear_of_Acquisition_Limit(value);
        break;
      case "SingleFileUploadSize":
        setUpload_file_single_size(value);
        break;
      case "FileUploadTotalSize":
        setUpload_file_total_size(value);
        break;
      case "MaxCharacterCount":
        setMax_Characters_Count(value);
        break;
      case "LoggerExpiryDay":
        setLogger_expiry_day(value);
        break;
      case "LoggerMaxFileSize":
        setLogger_max_file_size(value);
        break;

      default:
        break;
    }
  };

  // Helping tips messages
  const autoSavingTimeHelp = "Set Application Auto Saving Timer.";
  const disapearingMessageTimeHelp = "Set messages Disapearing Timer.";
  const DOBMinDateHelp =
    "Set Applicant Minimun Date of Birth DOB MIN < DOB MAX.";
  const DOBMaxDateHelp =
    "Set Applicant Maximum Date of Birth DOB MAX > DOB MIN.";
  const YearOfAquisitionLimitHelp =
    "Specify Aquisition Years from Current year to 15 or 20 years ago.";
  const SingleFileUploadSizeHelp =
    "Set the max size for a single file upload in MB.";
  const FileUploadTotalSizeHelp =
    "Set the max size for all the uploaded files in MB. Must be > than or = to Single File Upload Size.";
  const MaxCharacterCountHelp =
    "Set the Max Characters for questions in MBA & EMBA Forms.";
  const LoggerExpiryDayHelp = "Set max days for log files to be deleted.";
  const LoggerMaxFileSizeHelp = "Set max log file capacity.";

  return (
    <>
      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Auto Saving Time</label>
        <input
          type="number"
          value={auto_Save_Timing}
          className={`md:w-[500px] ${
            errors.AutoSavingTime && "border border-red-500"
          }`}
          {...register("AutoSavingTime", {
            onChange: (e) => {
              handleChange("AutoSavingTime", e.target.value);
            },
            //required: 'Set Auto Saving Time',
          })}
        />
        <label className="mt-2">
          minutes
          <Tooltip
            className="ml-[24px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={autoSavingTimeHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.AutoSavingTime && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.AutoSavingTime.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Disapearing Message Time</label>
        <input
          type="number"
          value={message_disapear_timing}
          className={`md:w-[500px] ${
            errors.DisapearingMessageTime && "border border-red-500"
          }`}
          {...register("DisapearingMessageTime", {
            onChange: (e) => {
              handleChange("DisapearingMessageTime", e.target.value);
            },
            //required: 'Set Disapearing Message Time',
          })}
        />
        <label className="mt-2">
          seconds
          <Tooltip
            className="ml-[24px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={disapearingMessageTimeHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.DisapearingMessageTime && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.DisapearingMessageTime.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">DOB Min Date</label>
        <input
          type="date"
          value={personalinfo_dob_min}
          className={`w-[500px] max-[767px]:w-[250px] ${
            errors.DOBMinDate && "border border-red-500"
          }`}
          {...register("DOBMinDate", {
            onChange: (e) => {
              handleChange("DOBMinDate", e.target.value);
            },
            // required: 'Enter Min DOB Date',
          })}
        />
        <label className="mt-2">
          <Tooltip
            className="ml-[80px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={DOBMinDateHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.DOBMinDate && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.DOBMinDate.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">DOB Max Date</label>
        <input
          type="date"
          value={personalinfo_dob_max}
          className={`w-[500px] max-[767px]:w-[250px] ${
            errors.DOBMaxDate && "border border-red-500"
          }`}
          {...register("DOBMaxDate", {
            onChange: (e) => {
              handleChange("DOBMaxDate", e.target.value);
            },
            //required: 'Enter Max DOB Date',
          })}
        />
        <label className="mt-2">
          <Tooltip
            className="ml-[80px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={DOBMaxDateHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.DOBMaxDate && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.DOBMaxDate.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Year Of Aquisition Limit</label>
        <input
          value={Year_of_Acquisition_Limit}
          type="number"
          className={`md:w-[500px] ${
            errors.YearOfAquisitionLimit && "border border-red-500"
          }`}
          {...register("YearOfAquisitionLimit", {
            onChange: (e) => {
              handleChange("YearOfAquisitionLimit", e.target.value);
            },
            //required: 'Enter Year of Aquisition',
          })}
        />
        <label className="mt-2">
          years
          <Tooltip
            className="ml-[45px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={YearOfAquisitionLimitHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.YearOfAquisitionLimit && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.YearOfAquisitionLimit.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Single File Upload Size</label>
        <input
          value={upload_file_single_size}
          type="number"
          className={`md:w-[500px] ${
            errors.SingleFileUploadSize && "border border-red-500"
          }`}
          {...register("SingleFileUploadSize", {
            onChange: (e) => {
              handleChange("SingleFileUploadSize", e.target.value);
            },
            //required: 'Enter Single File Upload Size',
          })}
        />
        <label className="mt-2">
          MB
          <Tooltip
            className="ml-14"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={SingleFileUploadSizeHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.SingleFileUploadSize && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.SingleFileUploadSize.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">File Upload Total Size</label>
        <input
          value={upload_file_total_size}
          type="number"
          className={`md:w-[500px] ${
            errors.FileUploadTotalSize && "border border-red-500"
          }`}
          {...register("FileUploadTotalSize", {
            onChange: (e) => {
              handleChange("SingleFileUploadSize", e.target.value);
            },
            //required: 'Enter Upload Total Size',
          })}
        />
        <label className="mt-2">
          MB
          <Tooltip
            className="ml-14"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={FileUploadTotalSizeHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.FileUploadTotalSize && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.FileUploadTotalSize.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Max Character Count</label>
        <input
          type="number"
          value={max_characters_count}
          className={`md:w-[500px] ${
            errors.MaxCharacterCount && "border border-red-500"
          }`}
          {...register("MaxCharacterCount", {
            onChange: (e) => {
              handleChange("MaxCharacterCount", e.target.value);
            },
            //required: 'Enter Max Character Count',
          })}
        />
        <label className="mt-2">
          characters
          <Tooltip
            className="ml-2"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={MaxCharacterCountHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.MaxCharacterCount && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.MaxCharacterCount.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Logger Expiry Day</label>
        <input
          type="number"
          value={logger_expiry_day}
          className={`md:w-[500px] ${
            errors.LoggerExpiryDay && "border border-red-500"
          }`}
          {...register("LoggerExpiryDay", {
            onChange: (e) => {
              handleChange("LoggerExpiryDay", e.target.value);
            },
            //required: 'Set Logger Expiry Day',
          })}
        />
        <label className="mt-2">
          Days
          <Tooltip
            className="ml-[46px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={LoggerExpiryDayHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.LoggerExpiryDay && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.LoggerExpiryDay.message}
        </div>
      )}

      <div className="flex gap-4">
        <label className="w-[280px] mt-2">Logger Max File Size</label>
        <input
          type="number"
          value={logger_max_file_size}
          className={`md:w-[500px] ${
            errors.LoggerMaxFileSize && "border border-red-500"
          }`}
          {...register("LoggerMaxFileSize", {
            onChange: (e) => {
              handleChange("LoggerMaxFileSize", e.target.value);
            },
            //required: 'Set Logger Max File Size',
          })}
        />
        <label className="mt-2">
          MB
          <Tooltip
            className="ml-[57px]"
            placement="top-start"
            arrow
            disableFocusListener
            disableTouchListener
            title={LoggerMaxFileSizeHelp}
          >
            <HelpIcon style={{ color: "gray" }} />
          </Tooltip>
        </label>
      </div>
      {errors.LoggerMaxFileSize && (
        <div className="text-red-500 font-bold text-sm w-full md:ml-60 sm:ml-32 mb-4">
          {errors.LoggerMaxFileSize.message}
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-48 p-2 rounded-lg"
          type="button"
          onClick={resetHandler}
        >
          Reset Default
        </button>
      </div>
    </>
  );
};

export default TopSettings;
