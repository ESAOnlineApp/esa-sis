const { connect, disconnect } = require("../../../utilities/db");
const { updateStatusActive } = require("../controller/queries");


async function handler(req, res) {
    try {
        const connection = await connect();

        const {

            status,
            majorId
        } =
            req.body;

        await updateStatusActive(
            connection, 
            status,
            majorId

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
export default handler;
