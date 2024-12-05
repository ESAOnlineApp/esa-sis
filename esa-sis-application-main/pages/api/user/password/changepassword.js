/*
 * Created By: KANSO Adi/Mohammad Yassine
 * Project: SIS Application
 * File: pages\api\user\password\forgetpassword.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

// import { getSession } from 'next-auth/react';
// import bcryptjs from 'bcryptjs';
// import { getSession } from 'next-auth/react';
// import { getSession } from 'next-auth/client';
// import UserProfile from '../../../../models/user/ProfileModel';
// import db from '../../../../utilities/connectToDb';
import { newpassword } from "../../controller/queries";
import { connect, disconnect } from "../../../../utilities/db";
// import selection_data from '../../../../utilities/selection_data';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  try{
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .send({ message: "Signin Required To Change Password" });
  }
  const { user } = session;
  // console.log('req.body=', req.body);
  const password = req.body.password;
  // const email = req.body.email;

  // console.log('Password=', password);
  // console.log('userid=', user.userid);

  const regularExpression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
  if (!regularExpression.test(password)) {
    res.status(422).json({
      message: "Validation ERROR When Trying Update User Password",
    });
    return;
  }
  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);

  if (password) {
    const connection = await connect();
    if (!connection._connected) {
      const message = connection.message;
      sis_app_logger.error(
        `${new Date()}=From changepassword page,connection unsuccess=1=${
          user.userid
        }=${message}=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
          userAgentinfo.family
        }=${userAgentinfo.source}=${userAgentinfo.device.family}`
      );
      return res.status(500).json({
        message: message,
      });
    } else {
      await newpassword(connection, user.userid, password);
      // // console.log(update);
      await disconnect(connection);
    }
  }

  // console.log('User Password Updated');
  return res.send({
    message: "User Password Updated",
  });
  }catch(error){
    console.log('the error is in changepassword.js in password in api : ', error)
    return
  }
}

export default handler;
