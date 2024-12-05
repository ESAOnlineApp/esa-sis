const { connect, disconnect } = require('../../../../utilities/db');
const { filterpm } = require('../../controller/queries');

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { pm_id, pm_firstname, pm_lastname, pm_email, pm_status, majorName } =
      req.body;
    const data = await filterpm(
      connection,
      pm_id,
      pm_firstname,
      pm_lastname,
      pm_email,
      pm_status,
      majorName
    );
    // console.log(data.rows)
    await disconnect(connection);
    return res.status('200').send(data.rows);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status(500).json(
      {
        code:500,
        success:false,
        message: error.message
      }
    );
    // return error;
  }
}
export default handler;
// module.exports = handler;
