const { connect  , disconnect} = require("../../../../utilities/db");
const { updateCourseType } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const {  course_id, course_credit , course_name , course_type } = req.body;
     await updateCourseType(
      connection,
      course_id, 
      course_credit , 
      course_name,
      course_type
    );
    disconnect(connection)
    return res.status(201).json({
        code:201,
        message : `update Successfully`,
        success:true
    })
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status(500).json({
        success: false,
        code: 500,
        message: error.message,
      });
    // return error;
  }
}
export default handler;
// module.exports = handler;
