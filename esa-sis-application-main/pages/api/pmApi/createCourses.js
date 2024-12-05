const { connect, disconnect } = require("../../../utilities/db");
const { createCourse } = require("../controller/queries");
const { default: CourseExist } = require("./exist/getCourses");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { course_id, course_name, course_credit, major_id, course_type } =
      req.body;
    // if(course_name || course_id || course_credit ||major_id ==='' ){
    //     return res.status(200).json({
    //         code:200,
    //         success:true,
    //         message :`Fields is required`
    //     })
    // }
    const exist = await CourseExist(connection, course_id, major_id);

    if (exist) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Course is already Exist !`,
      });
    }
    await createCourse(
      connection,
      course_id,
      course_name,
      course_credit,
      major_id,
      course_type
    );
    
    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
      message: `Course ${course_name} Created Successfully`,
      // data:response.rows[0].attendance_id
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
