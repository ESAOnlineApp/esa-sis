/*
 * Created By: Mohammad Yassine
 * Project: SIS Application
 * File: pages\api\CRUD_Op\sendarchived.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import * as dateFn from "date-fns";
import axios from "axios";

import useragent from "useragent";
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
import online_app_logger from "../logger";
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
  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);
  const incomingData = req.body;

  if (!incomingData) {
    return res.status(400).send({ message: "Data not found in request body" });
  }

  const ID = incomingData.oldID;
  const name = incomingData.name;
  const reportUrl = incomingData.oldreportURL;
  const promotion = incomingData.oldpromotion;

  //// console.log('reportServer', typeof reportUrl, reportUrl);

  const reportFileName = `${name}_${ID}_${promotion}_Application_${dateFn.format(
    Date.now(),
    "dd-MM-yyyy"
  )}.pdf`;

  //const desktopPath = require('path').join(require('os').homedir(), 'Desktop');
  const localDiskPath = path.parse(require("os").homedir()).root;
  const directory = path.join(
    localDiskPath,
    "esa-applicants-data",
    "Archived",
    "Users",
    ID.toString(),
    "Reports"
  );
  //const directory =path.join(process.cwd(),'public','Files','Users',user.ID.toString(),'Reports');
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // console.log(directory);
    const response = await axios.get(
      reportUrl,
      {
        responseType: "arraybuffer",
      },
      {
        timeout: selection_data.axios_timeout,
      }
    );

    // Write the report file to the directory
    const reportFilePath = path.join(directory, reportFileName);
    //// console.log('reportFilePath', reportFilePath);
    fs.writeFileSync(reportFilePath, response.data);
    const noteFileName = `${ID}_ReportLink.txt`;
    const noteFilePath = path.join(directory, noteFileName);
    //Write the report Link to the directory
    fs.writeFileSync(noteFilePath, reportUrl);
    //// console.log('report saved to:', reportFilePath);
    //// console.log('report Link saved to:', noteFilePath);
  } catch (error) {
    online_app_logger.error(
      `${new Date()}=Can't Save report or report Link=${user.role}=${
        user.email
      }=${error.message}=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    return res.status(422).send({ message: "Failed to Save Folder", error });
    //throw error;
  }
  // Return a response
  return res.status(200).send({ reportURL: reportUrl });
}

export default handler;
