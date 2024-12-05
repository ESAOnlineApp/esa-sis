/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\FilePreview.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from "react";
import styles from "../../styles/FilePreview.module.css";
import formatBytes from "../../utilities/formatbytes";

const FilePreview = ({ fileData, dispatch }) => {
  return (
    <div className="justify-between items-center mb-2">
      <div className={styles.fileContainer}>
        {/* loop over the fileData */}

        {fileData.fileList.map((f) => {
          // // console.log('fileData.fileList=', fileData.fileList);
          return (
            <ol key={f.lastModified}>
              <li className={styles.fileList}>
                {/* display the filename and type */}
                <div
                  key={f.name}
                  className={` ${
                    f.size > 2 * 1024 * 1024
                      ? "font-bold text-red-800"
                      : " text-stone-800 "
                  }`}
                >
                  {f.name}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div
                    key={f.name}
                    className={` ${
                      f.size > 2 * 1024 * 1024
                        ? "font-bold text-red-800"
                        : "font-bold text-stone-800 "
                    }`}
                  >
                    {formatBytes(f.size, 2)}
                  </div>
                  <button
                    className="ml-5"
                    type="button"
                    onClick={() => {
                      dispatch({ type: "REMOVE_FILE_FROM_LIST", f });
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            </ol>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;
