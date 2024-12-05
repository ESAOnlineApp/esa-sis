const { connect, disconnect } = require("../../../utilities/db");
const { copyClass } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {
      // class_id,
      course_id,
      teacher_id,
      promotion,
      startdate,
      enddate,
      pm_id,
      major_id,
    } = req.body;

    const response = await copyClass(
      connection,
      course_id,
      teacher_id,
      promotion,
      startdate.slice(0, 10),
      enddate.slice(0, 10),
      pm_id,
      major_id
    );
    await disconnect(connection);
    if (response > 0) {
      // const response1 = await copySchedule(connection, class_id, response);
     

      return res.status(201).json({
        success: true,
        code: 201,
        message: "Schedule copied successfully",
      });
    } else {
      return res.status(201).json({
        success: true,
        code: 400,
        message: "Error copy Schedule",
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
