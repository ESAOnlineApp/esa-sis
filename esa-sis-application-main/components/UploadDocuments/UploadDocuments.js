/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\UploadDocuments.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useReducer } from "react";
import DropZone from "./DropZone";
import styles from "../../styles/Home.module.css";

export default function UploadDocuments() {
  // reducer function to handle state changes
  const uploadDocReducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      case "REMOVE_FILE_FROM_LIST":
        // // console.log('action=', action);
        // // console.log('action.name=', action.f.name);
        return {
          ...state,
          fileList: state.fileList.filter((ans) => ans.name !== action.f.name),
        };
      case "REMOVE_ALL_FILE_FROM_LIST":
        return {
          ...state,
          fileList: state.fileList.splice(0, state.fileList.length),
        };

      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(uploadDocReducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Drag And Drop File To Upload</h1>
        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone data={data} dispatch={dispatch} />
      </main>
    </div>
  );
}
