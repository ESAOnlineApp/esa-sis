const { connect, disconnect } = require("../../../utilities/db");
const { filterElective } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      major_id,
      course_id,
      student_firstname,
      student_lastname,
      course_name,
    } = req.body;

    const response = await filterElective(
      connection,
      major_id,
      course_id,
      student_firstname,
      student_lastname,
      course_name
    );

    await disconnect(connection);
    if (response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `assign not found`,
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        data: response.rows,
      });
    }
  } catch (error) {
    // // console.log(message.error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
