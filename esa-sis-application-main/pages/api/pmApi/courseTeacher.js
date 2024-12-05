const { connect, disconnect } = require("../../../utilities/db");

const { coursesTeachers } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { course_id } = req.body;
    const response = await coursesTeachers(connection, course_id);
    await disconnect(connection);
    // // console.log(response)
    if (response.length === 0) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `Teachers Not Found!`,
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        data: response.rows,
      });
    }
  } catch (error) {
    // console.log(error);
    console.log('the courseTeacher.js in the pmApi : ', error)
  }
}
module.exports = handler;
