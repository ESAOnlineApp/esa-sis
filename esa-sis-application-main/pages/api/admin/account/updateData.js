/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\account\updateData.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import { connect, disconnect } from "../../../../utilities/db";
import { findUserData, UpdateData } from "../../controller/accountquery";
import xss from "xss-filters";
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "PUT") {
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

  const ID = xss.inHTMLData(incomingData.ID);

  const fname = xss.inHTMLData(incomingData.fname);
  const lname = xss.inHTMLData(incomingData.lname);
  const role = xss.inHTMLData(incomingData.role);
  const email = xss.inHTMLData(incomingData.email);
  const mobileNumber = xss.inHTMLData(incomingData.mobileNumber);

  // console.log('ID', ID);
  // console.log('fname', fname);
  // console.log('lname', lname);
  // console.log('role', role);
  // console.log('email', email);
  // console.log('mobileNumber', mobileNumber);

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

  if (!existingUserID.result) {
    return res.status(404).send({ message: "User not found" });
  }
  try {
    if (fname) {
      const firstlast = await UpdateData(
        connection,
        "user_personal_info",
        ID,
        ["firstname", fname],
        ["lastname", lname]
      );
      console.log("firstlast", firstlast);
    }

    if (lname) {
      const lastfirst = await UpdateData(
        connection,
        "user_personal_info",
        user._id,
        ["firstname", fname],
        ["lastname", lname]
      );
      console.log("lastfirst", lastfirst);
    }

    if (role) {
      const rolelast = await UpdateData(connection, "user_profile", ID, [
        "role",
        role,
      ]);
      console.log("rolelast", rolelast);
    }

    if (email) {
      const emaillast = await UpdateData(connection, "user_profile", ID, [
        "email",
        email,
      ]);
      console.log("emaillast", emaillast);
    }

    if (mobileNumber) {
      const mobilelast = await UpdateData(connection, "user_contact_info", ID, [
        "mobile_number",
        mobileNumber,
      ]);
      console.log("mobilelast", mobilelast);
    }
    sis_app_logger.info(
      `${new Date()}=${user.role}=account updated=${user.email}=${
        userAgentinfo.os.family
      }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
        userAgentinfo.source
      }=${userAgentinfo.device.family}`
    );

    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (error) {
    sis_app_logger.error(
      `${new Date()}=update account error=${user.role}=${user.email}=${
        error.message
      }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(500).json({ message: "Something went wrong" });
  }

  await disconnect(connection);
}

export default handler;
