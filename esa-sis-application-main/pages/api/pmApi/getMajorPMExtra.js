const { connect, disconnect } = require("../../../utilities/db");
const { getMajorPMExtra } = require('../controller/queries')

async function handler(req, res) {

    try {
        const connection = await connect();
        const {
            pm_id , 
            table , 
            pmID

        } = req.body;
        const response = await getMajorPMExtra(connection,
            pm_id , 
            table , 
            pmID
        );
       
        await disconnect(connection);
        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "student Not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                code: 200,
                data: response.rows
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