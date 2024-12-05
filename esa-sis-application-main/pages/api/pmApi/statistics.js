const { connect, disconnect } = require("../../../utilities/db");

const { getStudentStatistics } = require("../controller/queries");
// const { default: assignedExist } = require('./exist/getTeachersCourse');

async function handler(req, res) {
  try {
    const connection = await connect();

    const {
      major_id,
      promotion
    } = req.body;


     const response = await getStudentStatistics(connection, major_id, promotion)
    
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
export default handler;