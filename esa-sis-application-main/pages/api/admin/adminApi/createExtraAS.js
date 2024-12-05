const { connect , disconnect} = require("../../../../utilities/db");
const { createExtraAS} = require("../../controller/queries");



async function handler(req, res) {
  try {
    const connection = await connect();

    const { 
        pm_id,
        major_id
     } = req.body;

 await createExtraAS(
      connection,
      pm_id,
      major_id
    );
   
   
   
    await disconnect(connection)
    return res.status(201).json({
        success:true,
        code:201,
        message:` Major Created Successfully !`,
       
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
