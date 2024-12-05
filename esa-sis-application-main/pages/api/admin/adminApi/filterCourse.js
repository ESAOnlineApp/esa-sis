const { connect , disconnect} = require("../../../../utilities/db");
const { filterCourseMajor } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
    try {
        const connection = await connect();
        const {course_id, major_name} = req.body;
        const data = await filterCourseMajor(connection,course_id, major_name);
        await disconnect(connection);
        return res.status('200').send(data.rows)
        
    } catch (error) {
        return res.status('401').send(error)
        // return error;
    }

}
export default handler;
// module.exports = handler;