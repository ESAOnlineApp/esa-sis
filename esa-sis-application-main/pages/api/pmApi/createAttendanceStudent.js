const { connect, disconnect } = require("../../../utilities/db");
const { createAttendanceStudent } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { attendance_id, student_id } = req.body;

    if (student_id.length > 0) {
      for (let i = 0; i < student_id.length; i++) {
        const result = await createAttendanceStudent(connection, student_id[i].student_id, attendance_id);
        console.log('result' , result)

      }
      // // console.log(response)
      await disconnect(connection);

      return res.status(201).json({
        success: true,
        code: 201,
        message: "Student Report Create Successfully",
      });

    }else{
      return res.status(400).json({
        success: true,
        code: 400,
        message: "no student id",
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
// module.exports = handler;
export default handler
