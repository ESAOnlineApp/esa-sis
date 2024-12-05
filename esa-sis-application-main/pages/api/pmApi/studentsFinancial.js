// getStudentsAndPims

const { connect, disconnect } = require("../../../utilities/db");

const { getStudentsAndPims } = require("../controller/queries");
// const { default: assignedExist } = require('./exist/getTeachersCourse');

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      major_id ,
      extra_major
    } = req.body;

     const response = await getStudentsAndPims(connection, major_id, extra_major)
    await disconnect(connection);
    return res.status(200).json({
      success: true,
      code: 200,
      data: response.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
// module.exports = handler;
export default handler;