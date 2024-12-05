/* eslint-disable no-async-promise-executor */
/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: lib\parse-form.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import mime from 'mime';
// const fs = require('fs');
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import selection_data from "../utilities/selection_data";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (req) => {
  return await new Promise(async (resolve, reject) => {
    const files = [];
    const fields = [];
    // let newUploadDir = '';

    // const uploadDir = join(
    //   process.env.ROOT_DIR || process.cwd(),
    //   `${selection_data.upload_file_directory_name}/`
    // );
    // // console.log('uploadDir===>',uploadDir)
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `${selection_data.upload_file_directory_name}${dateFn.format(
        Date.now(),
        "dd-MM-Y"
      )}/`
    );

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      multiples: true,
      allowEmptyFiles: false,
      maxFiles: selection_data.upload_file_total_number,
      maxFileSize: selection_data.upload_file_total_size,
      uploadDir,
      filter: (part) => {
        return (
          part.name === "files" &&
          selection_data.upload_file_mimetype.map((val) =>
            part.mimetype?.includes(val)
          )
        );
      },
    });

    form.on("fileBegin", (name, file) => {
      // file.filepath = uploadDir + fields.file_name;
      file.filepath = uploadDir + file.originalFilename;
      // console.log('name:', name);
    });

    form.on("field", (fieldName, value) => {
      fields.push({ fieldName, value });
      // // console.log('fields:', fields);
      // // console.log('fields[0].value:', fields[0].value);
      // newUploadDir = join(
      //   process.env.ROOT_DIR || process.cwd(),
      //   `${selection_data.upload_file_directory_name}${fields[0].value}/`
      // );

      // return newUploadDir;
    });

    // const newUploadDir = join(
    //   process.env.ROOT_DIR || process.cwd(),
    //   `${selection_data.upload_file_directory_name}${fields[0].value}/`
    // );
    form.on("file", (fieldName, file) => {
      files.push({ fieldName, file });
      // // console.log('files:', files);
    });

    // form.on('progress', function (bytesReceived, bytesExpected) {
    //   var percent = ((bytesReceived / bytesExpected) * 100) | 0;
    //   process.stdout.write('Uploading: %' + percent + '\r');
    // });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else {
        resolve({ fields, files });
      }
    });

    // // console.log('uploadDir:', uploadDir);
    // // console.log('newUploadDir:', newUploadDir);
    // // newUploadDir = join(
    // //   process.env.ROOT_DIR || process.cwd(),
    // //   `${selection_data.upload_file_directory_name}${fields[0].value}/`
    // // );
    // fs.rename(uploadDir, newUploadDir, function (err) {
    //   if (err) {
    //     // console.log(err);
    //   } else {
    //     // console.log('Successfully renamed the directory.');
    //   }
    // });
  });
};
