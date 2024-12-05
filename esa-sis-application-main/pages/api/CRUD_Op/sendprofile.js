/*
 * Created By:Mohammad Yassine/Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\CRUD_Op\sendprofile.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import * as dateFn from "date-fns";
import axios from "axios";
import selection_data from "../../../utilities/selection_data";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Save Data" });
  }
  const { user } = session;

  try{
  // const secure_url = req.body;
  const cloudURL = req.body.cloudURL;
  let lastThreeChars = cloudURL.slice(-3);
  // console.log('cloudURL', typeof cloudURL, cloudURL);

  let photoFileName;
  if (lastThreeChars === "png") {
    photoFileName = `${user.name}_${user.ID}_Image_${dateFn.format(
      Date.now(),
      "dd-MM-yyyy"
    )}.png`;
  } else if (lastThreeChars === "jpg") {
    photoFileName = `${user.name}_${user.ID}_Image_${dateFn.format(
      Date.now(),
      "dd-MM-yyyy"
    )}.jpg`;
  } else if (lastThreeChars === "peg") {
    photoFileName = `${user.name}_${user.ID}_Image_${dateFn.format(
      Date.now(),
      "dd-MM-yyyy"
    )}.jpeg`;
  }

  //const directory =path.join(process.cwd(),'public','Files','Users',user.ID.toString(),'Photo');
  //const desktopPath = require('path').join(require('os').homedir(), 'Desktop');
  const localDiskPath = path.parse(require("os").homedir()).root;
  //// console.log('the path',desktopPath);
  //// console.log('Local disk path',localDiskPath);
  const directory = path.join(
    localDiskPath,
    "esa-SIS-data",
    "Users",
    user.userid.toString(),
    "Photo"
  );

  //// console.log(directory2)
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // console.log(directory);
  const response = await axios.get(
    cloudURL,
    {
      responseType: "arraybuffer",
    },
    {
      timeout: selection_data.axios_timeout,
    }
  );

  // Write the report file to the directory
  const reportFilePath = path.join(directory, photoFileName);
  //const fullDirectoryPath = path.join(desktopPath, 'Files', 'Users', user.ID.toString(), 'Photo');
  // console.log('reportFilePath', reportFilePath);
  fs.writeFileSync(reportFilePath, response.data);
  //// console.log(fs.readFileSync(reportFilePath));
  // const readingdata=fs.readFileSync(reportFilePath);
  //// console.log(readingdata);
  //const fullReportURL = `${fullDirectoryPath}/${photoFileName}`;
  // console.log('report saved to:', reportFilePath);
  //// console.log("report full pass to:", fullReportURL);
  // res.setHeader('Content-Type', 'image/png');
  //// console.log(base64)
  // Return a response
  // res.status(200).send({ reportURL: `/api/get-report?filePath=${encodeURIComponent(reportFilePath)}` });
  //res.status(200).send({ cloudURL: `/Files/Users/${user.ID.toString()}/Photo/${photoFileName}` });
  //res.status(200).send({ cloudURL: `/Files/Users/${user.ID.toString()}/Photo/${photoFileName}` });
  return res.status(200).send({ cloudURL: cloudURL });
  }catch(error){
    console.log('the error is in sendprofile.js in CRUD_Op in api : ', error)
    return
  }
}
export default handler;
