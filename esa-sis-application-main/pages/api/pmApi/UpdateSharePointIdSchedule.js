const { connect, disconnect } = require("../../../utilities/db");
const { updateScheduleSharepointID } = require("../controller/queries");


async function handler(req, res) {
    try {
        const connection = await connect();

        const {

            sharepointId,
            attendanceId
        } =
            req.body;

         await updateScheduleSharepointID(
            connection,
            sharepointId,
            attendanceId

        );
        await disconnect(connection)
        return res.status(201).json({
            success: true,
            code: 201,
            message: "status updated successfully",
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
