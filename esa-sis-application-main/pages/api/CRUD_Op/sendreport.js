/*
 * Created By: Moetassem Chebbo/Mohammad Yassine
 * Project: SIS Application
 * File: pages\api\CRUD_Op\sendreport.js
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
  const reportURL = req.body.reportURL;

  //// console.log("reportServer", typeof reportURL,reportURL )

  const reportFileName = `${user.name}_${user.ID}_${
    user.promotion
  }_Application_${dateFn.format(Date.now(), "dd-MM-yyyy")}.pdf`;

  //const desktopPath = require('path').join(require('os').homedir(), 'Desktop');
  const localDiskPath = path.parse(require("os").homedir()).root;
  const directory = path.join(
    localDiskPath,
    "esa-applicants-data",
    "Users",
    user.ID.toString(),
    "Reports"
  );
  //const directory =path.join(process.cwd(),'public','Files','Users',user.ID.toString(),'Reports');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // console.log(directory);
  const response = await axios.get(
    reportURL,
    {
      responseType: "arraybuffer",
    },
    {
      timeout: selection_data.axios_timeout,
    }
  );

  // Write the report file to the directory
  const reportFilePath = path.join(directory, reportFileName);
  //// console.log("reportFilePath",reportFilePath)
  fs.writeFileSync(reportFilePath, response.data);

  //// console.log("report saved to:", reportFilePath);

  // Return a response
  return res.status(200).send({ reportURL: reportURL });
  }catch(error){
    console.log('the error is in sendreport.js in CRUD_Op in api : ', error)
    return
  }
}

export default handler;
