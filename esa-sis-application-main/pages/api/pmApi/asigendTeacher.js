const { connect, disconnect } = require("../../../utilities/db");

const { assignmentTeacherCourse } = require("../controller/queries");

const { default: assignedExist } = require("./exist/getTeachersCourse");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { teachers_fullname, major_id, course_id, teacher_id } = req.body;
    // console.log('teacher_id' , teacher_id)
    if (course_id === "" || teacher_id === "") {
      return res.status(201).json({
        code: 201,
        success: false,
        message: `Fields is required`,
      });
    }
    const exist = await assignedExist(
      connection,
      teacher_id,
      course_id,
      major_id
    );
    // console.log(exist)
    if (exist) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Teacher ${teachers_fullname} is already assigned to course ${course_id}`,
      });
    }

    const response = await assignmentTeacherCourse(
      connection,
      course_id,
      teacher_id
    );
    await disconnect(connection);
    // console.log(response)
    return res.status(201).json({
      code: 201,
      success: true,
      message: `professor ${teachers_fullname} assigned To course ${course_id}`,
      data: response.rows,
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
