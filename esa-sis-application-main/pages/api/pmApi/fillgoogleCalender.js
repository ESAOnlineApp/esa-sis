const { connect, disconnect } = require("../../../utilities/db");
const { insertGoogleEventDetails } = require('../controller/queries');


async function handler(req, res) {
    console.log('test' , req.body)

    try {
        console.log('wsllllllllllllllllllllll')
        const connection = await connect();
        const {
            student_id , event_id , attendance_id
        } = req.body;
       
      
            const response = await insertGoogleEventDetails(connection,  student_id , event_id , attendance_id);
            console.log('respnse' , response)
            await disconnect(connection)
      
                return res.status(201).json({
                    success: true,
                    code: 201,
                    message: 'Schedule created successfully',
                   
                })
        
      

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