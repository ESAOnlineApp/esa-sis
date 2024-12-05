/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\listusers\listexport.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { connect, disconnect } from "../../../../utilities/db";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import {
  FilterDataExport,
  findextramajor,
  findemajor_user,
} from "../../controller/accountquery";
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

  if (user.role === "1") {
    return res.status(401).send({ message: "You are Unauthorized" });
  }
  const ViewNames = ["usersbba", "usersmba_emba", "usersother"];
  let response = {};
  let filter2 = "";

  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);

  if (user.role === "2") {
    const connection = await connect();
    const extra_major = await findextramajor(connection, user._id);
    // console.log('extra', extra_major);
    const user_major = await findemajor_user(connection, user._id);

    const majorIds = [
      ...extra_major.map((item) => item.major_id),
      user_major.major,
    ].join(",");

    // console.log('majorIds', majorIds);
    filter2 += `WHERE UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0  AND major IN (${majorIds})`;

    try {
      for (let i = 0; i < ViewNames.length; i++) {
        const result = await FilterDataExport(
          connection,
          ViewNames[i],
          filter2
        );
        // console.log(filter2);
        response[ViewNames[i]] = result;
        // // console.log('response', response);
        // // console.log(`result for ${ViewNames[i]}`, result);
      }
      const encryptedResponse = encrypt(JSON.stringify(response));
      sis_app_logger.info(
        `${new Date()}=${user.role}=lists exported=${user.email}=${
          userAgentinfo.os.family
        }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
          userAgentinfo.source
        }=${userAgentinfo.device.family}`
      );
      res.status(200).send({ data: encryptedResponse });
    } catch (error) {
      sis_app_logger.error(
        `${new Date()}=lists exports error=${user.role}=${user.email}=${
          error.message
        }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
          userAgentinfo.family
        }=${userAgentinfo.source}=${userAgentinfo.device.family}`
      );
      res.status(500).send({ message: "Internal Server Error" });
    }
      finally{
        await disconnect(connection);
      }
    
  } else {
    filter2 += `WHERE UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0`;

    const connection = await connect();
    try {
      for (let i = 0; i < ViewNames.length; i++) {
        const result = await FilterDataExport(
          connection,
          ViewNames[i],
          filter2
        );
        response[ViewNames[i]] = result;
        // // console.log('response', response);
        // // console.log(`result for ${ViewNames[i]}`, result);
      }

      const encryptedResponse = encrypt(JSON.stringify(response));
      sis_app_logger.info(
        `${new Date()}=${user.role}=lists exported=${user.email}=${
          userAgentinfo.os.family
        }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
          userAgentinfo.source
        }=${userAgentinfo.device.family}`
      );
      res.status(200).send({ data: encryptedResponse });
    } catch (error) {
      sis_app_logger.error(
        `${new Date()}=lists exports error=${user.role}=${user.email}=${
          error.message
        }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
          userAgentinfo.family
        }=${userAgentinfo.source}=${userAgentinfo.device.family}`
      );
      res.status(500).send({ message: "Internal Server Error" });
    }finally{
      await disconnect(connection);
    }

  }
}

export default handler;
