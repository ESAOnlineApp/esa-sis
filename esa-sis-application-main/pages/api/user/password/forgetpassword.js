/*
 * Created By: KANSO Adi/Mohammad Yassine
 * Project: SIS Application
 * File: pages\api\user\password\forgetpassword.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import UserProfile from '../../../../models/user/ProfileModel';
// import db from '../../../../utilities/connectToDb';
// import selection_data from '../../../../utilities/selection_data';
import {
  findDataForResetPassword,
  newEmailToken,
  findUserRole,
  // Userinfo,
  // UpdateData,
  // UpdateActivityTime,
} from "../../controller/queries";
import { connect, disconnect } from "../../../../utilities/db";
// import crypto from 'crypto';
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
 
  if (req.method !== "POST") {
    return res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
  try{
  const { email } = req.body;

  // if (!email || !email.includes("@")) {
  //   res.status(422).json({
  //     message: "Validation error",
  //   });
  //   return;
  // }
  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);

  const connection = await connect();
  if (!connection._connected) {
    const message = connection.message;
    sis_app_logger.error(
      `${new Date()}=From forgetpassword page,connection unsuccess=1=${email}=${message}=${
        userAgentinfo.os.family
      }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
        userAgentinfo.source
      }=${userAgentinfo.device.family}`
    );
    res.status(500).json({
      message: message,
    });
  } else {

    const userrole = await findUserRole(
      connection,
      email
    );
 

    const validateUserEmail = await findDataForResetPassword(
      connection,
      "users",
      "user_contact",
      "userid",
      "userid",
      "userid",
      email
    );
    const validatePmEmail = await findDataForResetPassword(
      connection,
      "users",
      "program_manager",
      "pm_id",
      "userid",
      "userid",
      email
    );
    const validateAdmin = await findDataForResetPassword(
      connection,
      "users",
      "admin",
      "adminid",
      "userid",
      "userid",
      email
    );

    const validatePmAssistanteEmail = await findDataForResetPassword(
      connection,
      "users",
      "program_manager_assistance",
      "pm_ass_id",
      "userid",
      "userid",
      email
    );

    if (
      validateUserEmail.rows[0] != null &&
      validateUserEmail.rows[0].userid != null &&
      validateUserEmail.rows[0].role === 1
      
    ) {
      // Set the emailToken

  
    await newEmailToken(connection, validateUserEmail.rows[0].userid);
     
      //validateUserEmail.emailToken = crypto.randomBytes(64).toString('hex');
      //await validateUserEmail.save();

      // res.status(200).json('Email Verified Successfully.');
    } else if (
      validatePmEmail.rows[0] != null &&
      validatePmEmail.rows[0].userid != null &&
      validatePmEmail.rows[0].role === 2
    
     
    ) {
     
      await newEmailToken(connection, validatePmEmail.rows[0].userid );
    } else if (
      validatePmAssistanteEmail.rows[0] != null &&
      validatePmAssistanteEmail.rows[0].userid != null
      &&  validatePmAssistanteEmail.rows[0].role===3
    ) {
      await newEmailToken(connection, validatePmAssistanteEmail.rows[0].userid);
    } else if (
      validateAdmin.rows[0] != null &&
      validateAdmin.rows[0].userid != null
      &&  validateAdmin.rows[0].role===0
    ) {
      await newEmailToken(connection, validateAdmin.rows[0].userid);
    } else {
      res.status(404).json({
        message: "Account Doesn't Exist.",
      });
      return;
    }
    console.log("after if");
    // Disconnect From DB and send message and user authentication to front end
    const userinfo = await findDataForResetPassword(
      connection,
      "users",
      "user_contact",
      "userid",
      "userid",
      "userid",
      email
    );

    const userPminfo = await findDataForResetPassword(
      connection,
      "users",
      "program_manager",
      "pm_id",
      "userid",
      "userid",
      email
    );
    const userPmAssinfo = await findDataForResetPassword(
      connection,
      "users",
      "program_manager_assistance",
      "pm_ass_id",
      "userid",
      "userid",
      email
    );
    const admininfo = await findDataForResetPassword(
      connection,
      "users",
      "admin",
      "adminid",
      "userid",
      "userid",
      email
    );
   
  
    if (userinfo.rows[0] && userinfo.rows[0].userid != null 
      && userrole.rows[0].role === 1) {
     
      res.status(201).send({
        message: "Ready To send Reset Password Email",
        email: userinfo.rows[0].email,
        emailToken: userinfo.rows[0].token,
        ID: userinfo.rows[0].userid,
      });
    } else if (userPminfo.rows[0] && userPminfo.rows[0].pm_id != null && userPminfo.rows[0].role===2) {
      console.log('userPminfo.rows[0].role' ,userPminfo.rows[0].role)
      res.status(201).send({
        message: "Ready To send Reset Password Email",
        email: userPminfo.rows[0].pm_email,
        emailToken: userPminfo.rows[0].token,
        ID: userPminfo.rows[0].userid,
      });
    } else if (
      userPmAssinfo.rows[0] &&
      userPmAssinfo.rows[0].pm_ass_id != null
      && userrole.rows[0].role === 3 
    ) {
      res.status(201).send({
        message: "Ready To send Reset Password Email",
        email: userPmAssinfo.rows[0].pm_ass_email,
        emailToken: userPmAssinfo.rows[0].token,
        ID: userPmAssinfo.rows[0].userid,
      });
    } else if (admininfo.rows[0] && admininfo.rows[0].adminid != null && userrole.rows[0].role===0) {
      console.log("seret bel else admin");
      res.status(201).send({
        message: "Ready To send Reset Password Email",
        email: admininfo.rows[0].adminemail,
        emailToken: admininfo.rows[0].token,
        ID: admininfo.rows[0].userid,
      });
    }

    //email from req body
    // // console.log("userinfo");
    // // console.log(userinfo.rows[0].token);
    // await UpdateData(connection, 'user_profile', userinfo.user_id, [
    //   'isreset',
    //   true,
    // ]);
    /** Updates Activity Time */
    //Update Activity time

    // await UpdateActivityTime(userinfo.rows[0].userid, connection);
    // // console.log('timeAct')
    // // console.log(UpdateActivityTime)
    await disconnect(connection);
    return
    // // console.log(UpdateData)
    // // console.log(email);
    // // console.log(userinfo.emailToken);
    // // console.log(userinfo.user_id);
    // // console.log(userinfo.firstname);
    // // console.log(userinfo.lastname);
    // res.status(201).send({
    //   message: "Ready To send Reset Password Email",
    //   email: email,
    //   emailToken: userinfo.rows[0].token,
    //   ID: userinfo.rows[0].userid,
    // fname: userinfo.firstname,
    // lname: userinfo.lastname,
    //emailToken: validateUserEmail.emailToken,
    //ID: validateUserEmail.ID,
    //fname: validateUserEmail.fname,
    //lname: validateUserEmail.lname,
    // });
  }
    }catch(error){
      console.log('the error is in forgetpassword.js in password in api : ', error)
      return
    }
}

export default handler;
