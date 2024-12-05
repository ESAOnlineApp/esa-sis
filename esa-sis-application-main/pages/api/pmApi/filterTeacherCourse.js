const { connect , disconnect} = require("../../../utilities/db");
const { teacherCourse } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      teacherId,
      courseId,
      teacher_firstname,
      teacher_lastname,
      course_name,
      major_id,
    } = req.body;

    const response = await teacherCourse(
      connection,
      teacherId,
      courseId,
      teacher_firstname,
      teacher_lastname,
      course_name,
      major_id
    );
    await disconnect(connection)
    if (response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `attendance not found`,
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
// module.exports = handler;
export default handler;
