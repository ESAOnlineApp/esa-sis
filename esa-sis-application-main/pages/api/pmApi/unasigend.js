const { connect, disconnect } = require("../../../utilities/db");

const { unassign } = require("../controller/queries");
// const { default: assignedExist } = require('./exist/getTeachersCourse');

async function handler(req, res) {
  try {
    const connection = await connect();

    const {
      teacher_firstname,
      teacher_lastname,
      teacher_id,
      course_id,
    } = req.body;

     await unassign(connection, teacher_id, course_id)
    await disconnect(connection);
    return res.status(201).json({
      success: true,
      code: 201,
      message: `professor ${teacher_firstname} ${teacher_lastname} unassigned course ${course_id}`,
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
