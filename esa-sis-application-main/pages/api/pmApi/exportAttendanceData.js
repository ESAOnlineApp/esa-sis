const { connect, disconnect } = require("../../../utilities/db");
const { exportAttendanceData } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      major_id , 
      student_id , 
      student_firstname, 
      student_lastname ,
      course_id,
      course_name ,
      attendanceDate, // Use modifiedAttendanceDate
      present
    } = req.body;

    let modifiedAttendanceDate = attendanceDate; // Create a variable to modify attendanceDate

    if (modifiedAttendanceDate === null) {
      modifiedAttendanceDate = ""; // Set attendanceDate to an empty string if it's null
    }

    const response = await exportAttendanceData(
      connection,
      major_id , 
      student_id , 
      student_firstname, 
      student_lastname ,
      course_id,
      course_name ,
      modifiedAttendanceDate, // Use modifiedAttendanceDate
      present
     
 
    );
   
  
    await disconnect(connection);

    if (response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `Attendance not found`,
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        data: response.rows,
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
export default handler;
