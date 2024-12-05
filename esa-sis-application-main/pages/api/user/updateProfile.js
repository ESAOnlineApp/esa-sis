/*
 * Created By: KANSO Adi/Mohammad Yassine
 * Project: SIS Application
 * File: pages\api\user\updateProfile.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import { getSession } from 'next-auth/react';

// import bcryptjs from 'bcryptjs';

import {
  UpdateUserpassword,
  UpdateadminInfo,
  updateUser,
} from "../controller/accountquery";
import { connect, disconnect } from "../../../utilities/db";
// import selection_data from '../../../utilities/selection_data';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import sis_app_logger from "../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  // FIXME:

  try{
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  //  // console.log(session)
  if (!session) {
    return res.status(401).send({ message: "Signin Required To Update" });
  }

  const { user } = session;
  // // console.log(user)
  const { fname, lname, password, profileUrl } = req.body;

  // // console.log("profile" , profileUrl)
  // const profileUrl = req.body.profileUrl;

  const regularExpression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
  if (password && !regularExpression.test(password)) {
    res.status(422).json({
      message: "Validation ERROR When Trying Update User Profile",
    });
    return;
  }
  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);

  const connection = await connect();
  if (!connection._connected) {
    const message = connection.message;
    sis_app_logger.error(
      `${new Date()}=From updateProfile page,connection unsuccess=1=${
        user.email
      }=${message}=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(500).json({
      message: message,
    });
  } else {
    // const connection = await connect();
    if (user.role === "0") {
      if (fname) {

        await UpdateadminInfo(connection, fname, lname, user.email);
      }
    } else if (user.role === "1") {
      if (fname) {
        await updateUser(
          connection,
          "user_personal_info",
          "userid",
          "firstname",
          fname,
          user.userid
        );
      }
      if (lname) {
        await updateUser(
          connection,
          "user_personal_info",
          "userid",
          "lastname",
          lname,
          user.userid
        );
      }
      if (fname) {
        await updateUser(
          connection,
          "student",
          "student_id",
          "student_firstname",
          fname,
          user.userid
        );
        // // console.log(usr)
      }
      if (lname) {
        await updateUser(
          connection,
          "student",
          "student_id",
          "student_lastname",
          lname,
          user.userid
        );
      }
      // console.log(user.userid);
    } else if (user.role === "2") {
      if (fname) {
        await updateUser(
          connection,
          "program_manager",
          "pm_id",
          "pm_firstname",
          fname,
          user.userid
        );
      }
      if (lname) {
        await updateUser(
          connection,
          "program_manager",
          "pm_id",
          "pm_lastname",
          lname,
          user.userid
        );
      }
    } else if (user.role === "3") {
      if (fname) {
        await updateUser(
          connection,
          "program_manager_assistance",
          "pm_ass_id",
          "pm_ass_firstname",
          fname,
          user.userid
        );
      }
      if (lname) {
        await updateUser(
          connection,
          "program_manager_assistance",
          "pm_ass_id",
          "pm_ass_lastname",
          lname,
          user.userid
        );
      }
    }

    if (password) {
      await UpdateUserpassword(connection, password, user.userid);
    }
    if (profileUrl) {
      await updateUser(
        connection,
        "user_document",
        "userid",
        "profileurl",
        profileUrl,
        user.userid
      );
    }

    await disconnect(connection);
    // sis_app_logger.info(
    //   `${new Date()}:updateprofile:${user.email}:${req.headers['user-agent']}`
    // );
    sis_app_logger.info(
      `${new Date()}=${user.role}=update profile=${user.email}=${
        userAgentinfo.os.family
      }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
        userAgentinfo.source
      }=${userAgentinfo.device.family}`
    );
    return res.send({
      message: "User Profile Updated",
    });
  }
    }catch(error){
      console.log('the error is in updateProfile.js in user in api : ', error)
      return
    }
}

export default handler;
