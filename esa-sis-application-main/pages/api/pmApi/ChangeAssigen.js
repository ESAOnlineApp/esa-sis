const { connect, disconnect } = require("../../../utilities/db");

const { updateAssign } = require("../controller/queries");

const { default: courseExist } = require("./exist/ExistCourses");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      major_id,
      teacher_name,
      teacher_nameC,
      teacher_id,
      course_id,
      teacher_idC,
    } = req.body;
    // // console.log(' major_id' ,  major_id)
    // // console.log('  course_id' ,   course_id)
    if (teacher_idC === teacher_id) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Can't replace teacher with it self!`,
      });
    }

    const existCourse = await courseExist(
      connection,
      course_id,
      teacher_id,
      major_id
    );
    const existCourseC = await courseExist(
      connection,
      course_id,
      teacher_idC,
      major_id
    );
    // // console.log(existCourseC)
    // // console.log('existCourse' , existCourse)
  
    if (existCourseC) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `prof ${teacher_nameC} Already assigned to course ${course_id}`,
      });
    }
    if (existCourse) {
      const response = await updateAssign(
        connection,
        teacher_idC,
        course_id,
        teacher_id
      );
      // // console.log('response' , response)
      await disconnect(connection)

      return res.status(201).json({
        code: 201,
        success: true,
        message: `Course ${course_id} Assign to prof ${teacher_nameC} instead of prof ${teacher_name}`,
        data: response.rows[0].teacher_courses_id,
      });
    } else {
      res.status(200).json({
        success: true,
        code: 200,
        message: ` prof ${teacher_name} Doesn't Assign to Course ${course_id} `,
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
module.exports = handler;
