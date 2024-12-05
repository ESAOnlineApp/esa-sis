const { connect, disconnect } = require("../../../utilities/db");
const { getScheduleByPM } = require('../controller/queries')

async function handler(req , res){

    try {
        const connection = await connect();
        const {
           pmID
        }=req.body;
        const response = await getScheduleByPM(connection , pmID);
        await disconnect(connection)

            return res.status(200).json({
                success:true,
                code:200,
                data:response.rows
            })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            message: error.message
        })
    }
}
// module.exports = handler;
export default handler;