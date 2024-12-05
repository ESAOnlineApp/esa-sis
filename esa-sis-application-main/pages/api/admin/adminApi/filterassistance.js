const { connect, disconnect } = require('../../../../utilities/db');
const { filterassistance } = require('../../controller/queries');

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const {
      pm_ass_id,
      pm_ass_firstname,
      pm_ass_lastname,
      pm_ass_email,
      pm_ass_status,
      majorName,
    } = req.body;
    const data = await filterassistance(
      connection,
      pm_ass_id,
      pm_ass_firstname,
      pm_ass_lastname,
      pm_ass_email,
      pm_ass_status,
      majorName
    );
    // console.log(data)
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
