/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\account\listadmin.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import selection_data from "../../../../utilities/selection_data";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import { connect, disconnect } from "../../../../utilities/db";
import { FilterData } from "../../controller/queries";
import sis_app_logger from "../../../api/logger";
import useragent from "useragent";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({ message: "Signin Required" });
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
  /* Setting the default values for the query parameters. */
  const page = req.query.page || 1;
  const limit = selection_data.search_limit;

  /* Creating a filter String that will be used to filter the results of the query. */
  let filter2 = "";

  /* Filtering out the current user from the results. */
  if (filter2 === "") {
    filter2 += `WHERE UserProfileID !='${user._id}' AND  role !='1'`;
  } else {
    filter2 += ` and UserProfileID !='${user._id}' AND  role !='1' `;
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
          role: user.role,
          email: user.email,
          mobileNumber: user.mobile_number,
          isVerified: user.isVerified,
        };
      })
    );

    const encryptedResponse = encrypt(JSON.stringify(response));

    // sis_app_logger.info(
    //   `${new Date()}=${user.role}=list-account-data=${user.email}=${
    //     userAgentinfo.os.family
    //   }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
    //     userAgentinfo.source
    //   }=${userAgentinfo.device.family}`
    // );

    res.status(200).send({ data: encryptedResponse });
  } catch (error) {
    sis_app_logger.error(
      `${new Date()}=list account data error=${user.role}=${user.email}=${
        error.message
      }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(500).send({ message: "Failed to get users", error });
  }
  await disconnect(connection);
}
export default handler;
