const { connect, disconnect } = require("../../../../utilities/db");
const { createAdmin } = require("../../controller/queries");
const { default: adminExist } = require("./AdminExist");
import DataSettings from "../../controller/getDataSettings";
import SendEmailTo from "./emailContent";
// import SendEmailAdmin from "./sendEmailAdminAfterRegister";

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);

    const { 
      adminid,
      adminemail,
      admin_firstname,
      userpassword,
      admin_lastname,
      admin_status,
      password,
      role
    } = req.body;
    // if (adminemail === '' || admin_firstname === '' || admin_lastname === '' || admin_status === '') {
    //   return res.status(400).json({
    //     success: false,
    //     code: 400,
    //     message: `Fields is Required`
    //   })
    // }
    const exist = await adminExist(connection, admin_firstname, admin_lastname, adminemail )
    if (exist) {
      return res.status(200).send(exist);
    }

    const data = await createAdmin(
      connection,
      adminid,
      adminemail,
      admin_firstname,
      userpassword,
      admin_lastname,
      admin_status
    );
  
    const settings = await DataSettings(connection, 'settings')
    const esa_logo = settings[0].esa_logo
    // await SendEmailAdmin(admin_firstname, adminemail, password ,adminid, esa_logo)
    await SendEmailTo(admin_firstname, adminemail, password ,adminid, esa_logo , role)
  

    disconnect(connection)
    return res.status("200").send(data);
  } catch (error) {
    // console.log("the error is: ", error);
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
