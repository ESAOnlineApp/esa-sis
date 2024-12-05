/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\account\deleteAdminByID.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import { connect } from "../../../../utilities/db";
import { findUserData, DeleteAccountBYID } from "../../controller/accountquery";
import xss from "xss-filters";
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Update" });
  }

  const { user } = session;

  if (user.role !== "0") {
    return res.status(401).send({ message: "You are Unauthorized" });
  }
  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);

  const incomingData = JSON.parse(decrypt(req.body.data));
  // console.log('incomingData', incomingData);

  const ID = xss.inHTMLData(incomingData.ID);
  // console.log('ID=', ID);

  if (!ID) {
    res.status(422).json({
      message: "ID Empty!!",
    });
    return;
  }

  const connection = await connect();

  const existingUserID = await findUserData(
    connection,
    "user_id",
    "user_profile",
    ID
  );
  // console.log(existingUserID);

  try {
    if (existingUserID.result) {
      const deleteuser = await DeleteAccountBYID(
        ID,
        ["user_profile"],
        connection
      );
      console.log(deleteuser);
      res.status(200).json({
        message: "Account Deleted Successfully",
      });
      sis_app_logger.info(
        `${new Date()}=${user.role}=account deleted=${user.email}=${
          userAgentinfo.os.family
        }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
          userAgentinfo.source
        }=${userAgentinfo.device.family}`
      );
    }
  } catch (error) {
    sis_app_logger.error(
      `${new Date()}=account delete error=${user.role}=${user.email}=${
        error.message
      }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(422).json({
      message: "Failed to Delete Account",
    });
  }
}

export default handler;
