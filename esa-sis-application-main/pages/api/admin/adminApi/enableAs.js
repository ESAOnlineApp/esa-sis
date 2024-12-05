const { connect , disconnect } = require("../../../../utilities/db");
const { enableUserAs } = require("../../controller/queries");
import DataSettings from "../../controller/getDataSettings";
import SendEmailTo from "./emailContent";


// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { pm_ass_id, userpassword , password , email , name , role } = req.body;
    const data = await enableUserAs(connection, pm_ass_id, userpassword);
    // console.log(data)
    const settings = await DataSettings(connection , 'settings')
         
    const esa_logo = settings[0].esa_logo
    // await SendEmailASActive(name , email , password , pm_ass_id , esa_logo)
    await SendEmailTo(name , email , password , pm_ass_id , esa_logo , role)
    await disconnect(connection);
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
