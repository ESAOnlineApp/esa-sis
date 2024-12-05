const { connect, disconnect } = require("../../../utilities/db");
const { updateContactAddressProfile } = require("../controller/queries");
//filterAttendanceStudent

async function handler(req, res) {
    try {
        const connection = await connect();
        const {
            userid,
            mobile_number,
            address
        } = req.body;
        // // console.log(major_id)
       
         await updateContactAddressProfile(
            connection,
            userid,
            mobile_number,
            address
        );
       
        await disconnect(connection);

        return res.status(203).json({
            success: true,
            code: 203,
            message: `Student Update Successfully`
       
        });
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
