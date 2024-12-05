/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\api\session\check-sessions.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

// import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import sis_app_logger from "../../api/logger";
import useragent from "useragent";

const handler = async (req, res) => {
  // Get all active sessions
  // const sessions = await getSession({});
  // const session = await getSession()
  try{
  const session = await getServerSession(req, res, authOptions);
  const sessions = await session?.provider?.getAllSessions();

  const userAgent = req.headers["user-agent"];
  const userAgentinfo = useragent.parse(userAgent);
  // console.log(`Session: ${session?.user}`);
  // console.log(`Sessions: ${sessions}`);
  // Check the expiration of each session
  sessions?.forEach((session) => {
    const expiresAt = new Date(session?.expires).getTime();
    const now = Date.now();
    if (expiresAt < now) {
      // Session has expired, log it
      // console.log(`Session expired: ${session?.user.email}`);
      sis_app_logger.info(
        `${new Date()}=${session?.user.role}=session expire=${
          session?.user.email
        }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
          userAgentinfo.family
        }=${userAgentinfo.source}=${userAgentinfo.device.family}`
      );
    }
  });

  // Send a response to indicate the check has completed
  return res.status(200).json({ message: "Session check completed" });
  }catch(error){
    console.log('the error is in check_sessions.js in session in api : ', error)
    return
  }
};

export default handler;
