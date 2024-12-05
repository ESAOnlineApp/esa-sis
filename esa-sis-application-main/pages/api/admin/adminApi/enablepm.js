const { connect, disconnect } = require('../../../../utilities/db');
const { enableUserpm } = require('../../controller/queries');
import DataSettings from '../../controller/getDataSettings';
import SendEmailTo from './emailContent';
// import SendEmailPMActive from "./sendEmailAsAfterRegister";
// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { pm_id, userpassword, pm_first_name, password, email, role } =
      req.body;
    const data = await enableUserpm(connection, pm_id, userpassword);

    const settings = await DataSettings(connection, 'settings');

    const esa_logo = settings[0].esa_logo;
    //  await SendEmailPMActive(pm_first_name , email  , password ,pm_id, esa_logo)
    await SendEmailTo(pm_first_name, email, password, pm_id, esa_logo, role);

    await disconnect(connection);
    return res.status('200').send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status('401').send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
