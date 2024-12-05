const { connect } = require("../../../../utilities/db");
const { updateCourse } = require("../../controller/queries");

async function handler(req, res) {
  try {
    const { course_id, major_name } = req.body;
    const connection = await connect();
    // // console.log(course_id, major_name)
    const data = await updateCourse(connection, course_id, major_name);
    
    // // console.log('the dta is: ',data)
    return res.status("200").send(data);
  } catch (error) {
    // // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
