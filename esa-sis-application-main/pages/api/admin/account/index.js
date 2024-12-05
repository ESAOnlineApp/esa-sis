/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\Account\index.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { connect, disconnect } from "../../../../utilities/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import xss from "xss-filters";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
// import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import {
  findUserData,
  newAccount,
  findmajor_id,
} from "../../controller/accountquery";
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
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

  const encryptedBody = req.body.data;
  const reqBody = JSON.parse(decrypt(encryptedBody));

  const ID = xss.inHTMLData(reqBody.ID);
  const role = xss.inHTMLData(reqBody.role);
  const email = xss.inHTMLData(reqBody.email);
  const password = xss.inHTMLData(reqBody.password);
  const major = xss.inHTMLData(reqBody.major);
  const fname = xss.inHTMLData(reqBody.fname);
  const lname = xss.inHTMLData(reqBody.lname);
  const mobileNumber = xss.inHTMLData(reqBody.mobileNumber);
  const profileUrl =
    reqBody && reqBody.profileUrl ? xss.inHTMLData(reqBody.profileUrl) : "";
  const selectedOptions = xss.inHTMLData(reqBody.selectedOptions);
  const selectedOptionsArray = selectedOptions.split(",");

  // // console.log('ID=', ID);
  // // console.log('role=', role);
  // // console.log('email=', email);
  // // console.log('password=', password);
  // // console.log('major=', major);
  // // console.log('fname=', fname);
  // // console.log('lname=', lname);
  // // console.log('mobileNumber=', mobileNumber);
  // // console.log('profileUrl=', profileUrl);
  // console.log(
  //   'selectedOptions:',
  //   selectedOptions,
  //   'type:',
  //   typeof selectedOptions
  // );
  // console.log(
  //   'selectedOptionsArray:',
  //   selectedOptionsArray,
  //   'type:',
  //   typeof selectedOptionsArray
  // );

  if (
    !ID ||
    !role ||
    !fname ||
    !lname ||
    !email ||
    !email.includes("@") ||
    !major ||
    !mobileNumber
  ) {
    res.status(422).json({ message: "Validation error" });
    return;
  }

  const connection = await connect();

  if (!connection._connected) {
    const message = "Database connection Error";
    res.status(422).json({
      message: message,
    });
  } else {
    try {
      const existingUserEmail = await findUserData(
        connection,
        "email",
        "user_profile",
        email
      );

      const existingUserPhone = await findUserData(
        connection,
        "mobile_number",
        "user_contact_info",
        mobileNumber
      );

      // global.language = 0;
      const major_id = await findmajor_id(connection, major);

      // let language;

      //  if (major_id.major_id === 10) {
      //   language = 'fr';
      // } else {
      //   language = 'en-US';
      // }

      if (existingUserEmail.result || existingUserPhone.result) {
        let message;
        if (existingUserEmail.result)
          message = "Account already exists (by Email)";
        if (existingUserPhone.result)
          message = "Account already exists (by Mobile Number)";
        if (existingUserEmail.result && existingUserPhone.result)
          message = "Account already exists";
        res.status(422).json({
          message: message,
        });
        await disconnect(connection);
        return;
      }

      let extraMajorIds = [];
      for (let i = 0; i < selectedOptionsArray.length; i++) {
        const extraMajorId = await findmajor_id(
          connection,
          selectedOptionsArray[i]
        );
        // console.log('extraMajorId=', extraMajorId);

        extraMajorIds.push(extraMajorId);
      }
      // console.log('extraMajorIds=', extraMajorIds);

      const responsecreateaccount = await newAccount(
        connection,
        ID,
        email,
        password,
        profileUrl,
        major_id.major_id,
        role,
        fname,
        lname,
        mobileNumber,
        extraMajorIds
      );

      console.log("responsecreateaccount=", responsecreateaccount);
      // const accountinfo=await Userinfo(connection,email)
      // // console.log('USER=', accountinfo);

      // await disconnect(connection);

      // const payload={
      //   message: 'User Profile Created!',
      //   // emailToken: accountinfo.emailToken,
      // }

      // const response = encrypt(JSON.stringify(payload))

      sis_app_logger.info(
        `${new Date()}=${user.role}=account created=${user.email}=${
          userAgentinfo.os.family
        }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
          userAgentinfo.source
        }=${userAgentinfo.device.family}`
      );

      res.status(201).json({ message: "User Profile Created!" });
    } catch (error) {
      sis_app_logger.error(
        `${new Date()}=create account error=${user.role}=${user.email}=${
          error.message
        }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
          userAgentinfo.family
        }=${userAgentinfo.source}=${userAgentinfo.device.family}`
      );
      res.status(500).json({ message: "Something went wrong" });
    }

    await disconnect(connection);
  }
}

export default handler;
