const { connect, disconnect } = require('../../../utilities/db');
const { getMajorPM } = require('../controller/queries');

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    const { majorID } = req.body;
    const data = await getMajorPM(connection,majorID);
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
