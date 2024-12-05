const { connect , disconnect} = require("../../../utilities/db");
const { getPromotion } = require('../controller/queries')

async function handler(req , res){

    try {
        const connection = await connect();
        const {
         major_id,
         academic_year
          
        }=req.body;
        const response = await getPromotion(connection , major_id , academic_year);

        await disconnect(connection);
        if(response.rows.length === 0){
            return res.status(404).json({
                success:false,
                code:404,
                message:"promotion Not found"
            })
        }else{
            return res.status(200).json({
                success:true,
                code:200,
                data:response.rows
            })

        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            message: error.message
        })
    }
}
export default handler;