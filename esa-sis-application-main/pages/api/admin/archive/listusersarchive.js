/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\archive\listusersarchive.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import selection_data from "../../../../utilities/selection_data";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import { connect, disconnect } from "../../../../utilities/db";
import { FilterData, findmajor_id } from "../../controller/queries";
// import {findData}from "../../controller/accountquery"
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "GET") {
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

  const connection = await connect();

  if (connection && !connection._connected) {
    return res.status(500).send({ message: connection.message });
  }

  const page = req.query.page || 1;
  const limit = selection_data.search_limit;
  let startDate;
  let endDate;
  let filter2 = "";
  if (req.query.Fname) {
    if (filter2 === "")
      filter2 += ` WHERE firstname like '%${req.query.Fname}%'`;
    else filter2 += ` AND firstname like '%${req.query.Fname}%'`;
  }

  if (req.query.Lname) {
    if (filter2 === "")
      filter2 += ` WHERE lastname like '%${req.query.Lname}%'`;
    else filter2 += ` AND lastname like '%${req.query.Lname}%'`;
  }

  if (req.query.ID) {
    if (filter2 === "") filter2 += ` WHERE UserProfileID = '${req.query.ID}'`;
    else filter2 += ` AND UserProfileID = '${req.query.ID}'`;
  }

  if (req.query.major) {
    const major_id = await findmajor_id(connection, req.query.major);
    if (filter2 === "") filter2 += ` WHERE major = '${major_id.major_id}'`;
    else filter2 += ` AND major = '${major_id.major_id}'`;
  }

  if (req.query.promotion) {
    if (filter2 === "")
      filter2 += ` WHERE promotion = '${req.query.promotion}'`;
    else filter2 += ` AND promotion = '${req.query.promotion}'`;
  }

  if (req.query.from && req.query.to) {
    startDate = new Date(req.query.from).toISOString().split("T")[0];
    endDate = new Date(req.query.to).toISOString().split("T")[0];
    //// console.log(startDate);
    //// console.log(endDate);
    if (startDate && endDate) {
      if (filter2 === "")
        filter2 += ` WHERE DATE_FORMAT(create_time, '%Y-%m-%d') between '${startDate}' and '${endDate}'`;
      else
        filter2 += ` and DATE_FORMAT(create_time, '%Y-%m-%d') between '${startDate}' and '${endDate}'`;
    }
  }

  //     const old_report=await findData(
  //         connection,
  //         'old_report'
  //     )

  //     // console.log("old_report",typeof old_report,old_report)
  // // console.log("old_reporter",old_report)

  if (filter2 === "") {
    filter2 += `WHERE UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND isVerified !=0`;
  } else {
    filter2 += ` and UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND isVerified !=0`;
  }
  try {
    const data = await FilterData(
      connection,
      "userinfo",
      filter2,
      limit,
      (page - 1) * limit
    );
    ////// console.log(data);
    // console.log(filter2);
    const response = await Promise.all(
      data.map(async (user) => {
        return {
          ID: user.UserProfileID,
          fname: user.firstname,
          lname: user.lastname,
          email: user.email,
          mobileNumber: user.mobile_number,
          major: user.program,
          promotion: user.promotion,
          createdAt: user.create_time,
          updatedAt: user.update_time,
          reportURL: user ? user.reportURL : null,
        };
      })
    );

    const encryptedResponse = encrypt(JSON.stringify(response));

    sis_app_logger.info(
      `${new Date()}=${user.role}=list archive data=${user.email}=${
        userAgentinfo.os.family
      }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
        userAgentinfo.source
      }=${userAgentinfo.device.family}`
    );

    res.status(200).send({ data: encryptedResponse });
  } catch (error) {
    sis_app_logger.error(
      `${new Date()}=list archive data error=${user.role}=${user.email}=${
        error.message
      }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(500).send({ message: "Failed to get users", error });
  }finally{
    await disconnect(connection);
  }
}

export default handler;
