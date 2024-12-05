const { connect } = require("../../../utilities/db");
const { filterCourses } = require("../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
    try {
        const connection = await connect();
        // filterStudent(connection, id, firstname, lastname, major, promotion, status);
        const {course_id, course_name, course_credit, major_id , course_type} = req.body;
        const response = await filterCourses(connection, 
            course_id, 
            course_name, 
            course_credit, 
            major_id,
            course_type);
           
        return res.status(200).json({
            success: true,
            code:200,
            data : response.rows
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            message: error.message
        })
        // return error;
    }

}
export default handler;
// module.exports = handler;