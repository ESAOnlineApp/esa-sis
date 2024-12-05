const { connect, disconnect } = require('../../../../utilities/db');
const { getTheMajors } = require('../../controller/queries');

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    // const {pm_id, pm_firstname, pm_lastname, pm_email, pm_status} = req.body;
    const data = await getTheMajors(connection);
    // console.log(data.rows)
    await disconnect(connection);
    return res.status('200').send(data.rows);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status('401').send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
