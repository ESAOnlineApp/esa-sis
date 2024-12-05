/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\DropZone.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../../styles/DropZone.module.css";
import formatBytes from "../../utilities/formatbytes";
import useTranslation from "next-translate/useTranslation";
// import UploadFiles from '../utilities/uploadFiles';
import selection_data from "../../utilities/selection_data";
import { useSelector } from "react-redux";

const DropZone = ({ data, dispatch, type }) => {
  const { t } = useTranslation();
  const [exceddSize, setexceddSize] = useState(false);

  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );

  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];
    let allowedExtensions = null;
    if (files[0].size > appState.appVar.upload_file_single_size)
      setexceddSize(true);
    else setexceddSize(false);
    type === "photo"
      ? (allowedExtensions = selection_data.upload_photo_allowedExtensions)
      : (allowedExtensions = selection_data.upload_file_allowedExtensions);
    // // console.log('allowedExtensions=', allowedExtensions);
    // ensure a file or files are dropped
    // FIXME: set totale number dynamic (10)
    if (
      files &&
      files.length > 0 &&
      data.fileList.length <= selection_data.upload_file_total_number
    ) {
      // loop over existing files

      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates

      files = files.filter((f) => !existingFiles.includes(f.name));
      // FIXME: Add file type filter and file size < max_file_size and SUM(files size)< file_size_sum

      files = files.filter(
        (f) => f.size < appState.appVar.upload_file_single_size
      );

      files = files.filter((f) => allowedExtensions.test(f.name));

      if (
        data.fileList.length < selection_data.upload_file_total_number &&
        files.length <=
          selection_data.upload_file_total_number - data.fileList.length
      ) {
        // dispatch action to add droped file or files to fileList
        dispatch({ type: "ADD_FILE_TO_LIST", files });
        // reset inDropZone to false
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
      }
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];
    // ensure a file or files are selected
    // FIXME: set max file number dynamic

    if (
      files &&
      files.length > 0 &&
      data.fileList.length <= selection_data.upload_file_total_number
    ) {
      if (files[0].size > appState.appVar.upload_file_single_size)
        setexceddSize(true);
      else setexceddSize(false);
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // FIXME: Add file type filter and file size < max_file_size and SUM(files size)< file_size_sum

      files = files.filter(
        (f) => f.size < appState.appVar.upload_file_single_size
      );

      if (
        data.fileList.length < selection_data.upload_file_total_number &&
        files.length <=
          selection_data.upload_file_total_number - data.fileList.length
      ) {
        // dispatch action to add selected file or files to fileList
        dispatch({ type: "ADD_FILE_TO_LIST", files });
      }
    }
  };

  /* Calculating the total size of the files selected. */
  const [totalDocumentSize, settotalDocumentSize] = useState(0);
  useEffect(() => {
    settotalDocumentSize(null);
    data.fileList.map((f) => {
      settotalDocumentSize((prev) => prev + f.size);
    });
  }, [data.fileList]);

  /* change the 'totalSize' */
  useEffect(() => {
    dispatch({ type: "CHANGE_TOTALSIZE", totalDocumentSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDocumentSize]);

  return (
    <>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <Image
          src="/upload.svg"
          alt="upload"
          height={50}
          width={50}
          className="w-auto h-auto"
        />

        <input
          id={type}
          // id="fileSelect"
          type="file"
          // max-size="2048"
          // multiple
          // FIXME: Set dynamic filter
          accept={
            type === "photo"
              ? selection_data.upload_photo_type
              : selection_data.upload_file_type
          }
          // accept=".pdf, .png, .jpg, .jpeg,.doc,.docx"
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor={type}>
          {/* <label htmlFor="fileSelect"> */}
          {type === "photo"
            ? t("studentApp:uploadonephotofileselect")
            : type === "file"
            ? t("You Can Upload Scanned")
            : type === "passport"
            ? t("studentApp:uploadonepassportfileselect")
            : type === "RecommendationLetter"
            ? t("studentApp:uploadRecommendationLetterfileselect")
            : type === "ResearchProposal"
            ? t("studentApp:uploadResearchProposalfileselect")
            : type === "ProofOfM1"
            ? t("studentApp:uploadProofOfM1fileselect")
            : type === "BACCertificate"
            ? t("studentApp:uploadBACCertificatefileselect")
            : type === "Transcript"
            ? t("studentApp:uploadTranscriptfileselect")
            : ""}
        </label>

        <h3 className={styles.uploadMessage}>
          {t("studentApp:uploadonedocumentmessage")}
        </h3>
      </div>
      {/* Total Documents Size */}
      {data.fileList.length > 0 && (
        <div className="flex justify-between">
          <div
            className={`${
              data.fileList.length >= selection_data.upload_file_total_number
                ? "font-bold text-red-800"
                : "font-bold text-stone-800 "
            }`}
          >
            {data.fileList.length} {t("studentApp:uploaddocumentfilesselected")}
          </div>
          <div
            className={`' font-bold' ${
              totalDocumentSize >= selection_data.upload_file_total_size
                ? "font-bold text-red-800"
                : "font-bold text-stone-800 "
            }`}
          >
            {t("studentApp:uploadtotalDocumentSize")}

            {formatBytes(totalDocumentSize, 2)}
          </div>
        </div>
      )}
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} dispatch={dispatch} />

      {/* Only show upload button after selecting atleast 1 file */}
      {/* FIXME: set dynamic values */}
      {/* {data.fileList.length > 0 &&
        data.fileList.length < 11 &&
        totalDocumentSize < 10 * 1024 * 1024 && (
          <div className="justify-center items-center">
            <button
              className="primary-button hover:text-white hover:font-bold"
              onClick={handeluploaddoc}
            >
              {t('studentApp:uploadtotalDocumentUpload')}
            </button>
          </div>
        )} */}
      {/* Message if more than 10 files selected */}
      {data.fileList.length > selection_data.upload_file_total_number && (
        <div className="font-bold text-red-800">
          {t("studentApp:uploaddocumentalotoffilesselected")}
        </div>
      )}
      {/* Message if more than 10 MB selected */}
      {totalDocumentSize > selection_data.upload_file_total_size && (
        <div className="font-bold text-red-800">
          {t("studentApp:uploaddocumentmanyoffilesselected")}
        </div>
      )}
      {exceddSize && (
        <div className="font-bold text-red-800">
          {t("studentApp:excedfilesize")}
        </div>
      )}
    </>
  );
};

export default DropZone;
