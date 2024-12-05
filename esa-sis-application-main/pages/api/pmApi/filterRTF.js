const { connect, disconnect } = require("../../../utilities/db");
const { filterRTFGrades } = require("../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
    try {
        const connection = await connect();
        // filterStudent(connection, id, firstname, lastname, major, promotion, status);
        const {
            student_id,
            first_name,
            last_name,
            promotion,
            major_id,
            course_id,
            grades_over_20,
            grades_over_30,
            task_name
        } = req.body;
        const response = await filterRTFGrades(connection,
            student_id,
            first_name,
            last_name,
            promotion,
            major_id,
            course_id,
            grades_over_20,
            grades_over_30,
            task_name
        );
     


        await disconnect(connection);


        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: `Grades not found`,
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
            message: error.message
        })
        // return error;
    }

}
export default handler;
// module.exports = handler;