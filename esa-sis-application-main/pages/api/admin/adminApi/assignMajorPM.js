import { assignPM, getassignPM } from "../../controller/queries";
const { connect , disconnect} = require("../../../../utilities/db");
async function handler(req , res){
    try {
        const {pm_id , major_id}=req.body
        const connection = await connect()
        const exist = await getassignPM(connection , 'program_manager' , pm_id , major_id)
        if (exist.rowCount > 0) {
            return res.status(200).json({
                success: true,
                code: 200,
                message: `Already exist`
            })

        }

        const existPM = await getassignPM(connection , 'program_manager_extra_major' , pm_id , major_id)
        if (existPM.rowCount > 0) {
            return res.status(200).json({
                success: true,
                code: 200,
                message: `Already exist`
            })

        }
       await assignPM(connection , pm_id,major_id)

        disconnect(connection)
        return res.status(201).json({
            code:201,
            success:true,
            message:`Assign Major successfully!`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "An error occurred while processing the request.",
            error: error.message,
          });
    }
}
export default handler