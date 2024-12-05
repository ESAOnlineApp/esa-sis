const { connect, disconnect } = require("../../../../utilities/db");
const { createASAccount } = require("../../controller/queries");
const { default: AsPMExist } = require("./ExistAsPM");
import DataSettings from "../../controller/getDataSettings";
import SendEmailTo from "./emailContent";
// import SendEmailAS from "./sendEmailAsAfterRegister";
// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const {
      // pm_id,
      pm_ass_id,
      pm_ass_firstname,
      pm_ass_lastname,
      pm_ass_email,
      pm_ass_status,
      userpassword,
      major_id,
      password,
      role
    } = req.body;
    // console.log('======this=====')
    // console.log(pm_id)

    const exist = await AsPMExist(connection, pm_ass_email, major_id)
    if (exist) {
      return res.status(200).send(exist)
    }
    const data = await createASAccount(
      connection,
      pm_ass_id,
      pm_ass_firstname,
      pm_ass_lastname,
      pm_ass_email,
      pm_ass_status,
      userpassword,
      major_id,
  
    );
    const settings = await DataSettings(connection, 'settings')
    const esa_logo = settings[0].esa_logo
    // await SendEmailAS(pm_ass_firstname, pm_ass_email, password, pm_ass_id, esa_logo)
    await SendEmailTo(pm_ass_firstname, pm_ass_email, password, pm_ass_id, esa_logo , role)

    await disconnect(connection);
    // console.log(data)
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
