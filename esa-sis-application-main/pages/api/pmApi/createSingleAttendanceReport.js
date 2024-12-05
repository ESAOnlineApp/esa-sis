const { connect, disconnect } = require("../../../utilities/db");
const { createAttendance } = require("../controller/queries");
const { default: attendanceExist } = require("./exist/getAttendance");

async function handler(req, res) {

  try {
    const connection = await connect();
   
    const { teacher_id, course_id, major_id, attendance_date } = req.body;
    if (teacher_id === "" || course_id === "") {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Fields is required`,
      });
    }
    const exist = await attendanceExist(
      connection,
      teacher_id,
      course_id,
      attendance_date
    );

    if (exist) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Attendance Report is already Exist !`,
      });
    }
    const response = await createAttendance(
      connection,
      teacher_id,
      course_id,
      major_id,
      attendance_date
    );
  
    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
      message: "Attendance Sheet Created Successfully !",
      data: response.rows[0].attendance_id,
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