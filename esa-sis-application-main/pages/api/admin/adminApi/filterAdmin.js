const { connect, disconnect } = require('../../../../utilities/db');
const { filterAdmin } = require('../../controller/queries');

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
      admin_lastname,
      admin_status,
    } = req.body;
    const data = await filterAdmin(
      connection,
      adminid,
      adminemail,
      admin_firstname,
      admin_lastname,
      admin_status
    );
    disconnect(connection);
    // console.log(data)
    return res.status('200').send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status('401').send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
