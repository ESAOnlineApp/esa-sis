const { connect, disconnect } = require("../../../../utilities/db");
// const { createAdmin } = require("../../controller/queries");
// const { default: adminExist } = require("./AdminExist");
// import DataSettings from "../../controller/getDataSettings";
import SendEmailTo from "./formatEmailbeforeClass";
// import SendEmailAdmin from "./sendEmailAdminAfterRegister";

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);

    const {
      email,
      className,
      startdate,
      courseName,
      teacherName,
      from_time,
      to_time,
      room_name,
      building,
    } = req.body;

    await SendEmailTo(
      email,
      className,
      startdate,
      courseName,
      teacherName,
      from_time,
      to_time,
      room_name,
      building
    );
   
    disconnect(connection);
    return res.status("200").send("ok");
  } catch (error) {
    console.log("the error is: ", error);
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
