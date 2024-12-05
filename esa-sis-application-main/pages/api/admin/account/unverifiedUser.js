/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\admin\account\unverifiedUser.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import { connect } from "../../../../utilities/db";
import {
  findUserData,
  UpdateIsUnVerified,
} from "../../controller/accountquery";
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

  const isVerified = xss.inHTMLData(incomingData.isVerified);

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
      // eslint-disable-next-line no-unused-vars
      const updatedUser = await UpdateIsUnVerified(connection, ID, isVerified);
      // // console.log(updatedUser)

      sis_app_logger.info(
        `${new Date()}=${user.role}=account locked=${user.email}=${
          userAgentinfo.os.family
        }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
          userAgentinfo.source
        }=${userAgentinfo.device.family}`
      );

      res.status(200).json({
        message: "This account has become inactive",
      });
    }
  } catch (error) {
    sis_app_logger.error(
      `${new Date()}=lock/unlock account error=${user.role}=${user.email}=${
        error.message
      }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
        userAgentinfo.family
      }=${userAgentinfo.source}=${userAgentinfo.device.family}`
    );
    res.status(422).json({
      message: "There was an error updating the account",
    });
  }
}

export default handler;
