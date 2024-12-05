const { connect, disconnect } = require("../../../utilities/db");
const { createSchedule } = require('../controller/queries');


async function handler(req, res) {

    try {
        const connection = await connect();
        const {
            classId, days, fromTime, toTime, room, pmID, attendanceId , is_online
        } = req.body;
   
      
            const response = await createSchedule(connection, classId, days, fromTime, toTime, room, pmID, attendanceId , is_online);
            
            await disconnect(connection)
            if (response.rowCount > 0) {
                return res.status(201).json({
                    success: true,
                    code: 201,
                    message: 'Schedule created successfully',
                    scheduleId: response.rows[0].tmpschedule_id
                })
            } else {
                return res.status(201).json({
                    success: true,
                    code: 400,
                    message: 'Error creating Schedule',
                })
            }
        
      

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        })
    }
}
// module.exports = handler;
export default handler;