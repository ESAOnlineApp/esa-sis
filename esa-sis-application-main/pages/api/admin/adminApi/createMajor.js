const { connect , disconnect} = require("../../../../utilities/db");
const { createMajor } = require("../../controller/queries");
const { default: majorExist } = require("./existMajor");


async function handler(req, res) {
  try {
    const connection = await connect();

    const { 
        major_id,
        major_name
     } = req.body;
  
     if(major_name === ''){
      return res.status(400).json({
        success:false,
        code:400,
        message:`Field is required!`
      })
     }
     const exist = await majorExist(connection , major_name)
     if(exist){
       return res.status(200).json({
        success:true,
        code:200,
        message:`Major ${major_name} Already Exist!`
       })
     }
const result= await createMajor(
      connection,
      major_id,
      major_name
    );
   
   
   
    await disconnect(connection)
    return res.status(201).json({
        success:true,
        code:201,
        message:` Major Created Successfully !`,
        data: result
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
