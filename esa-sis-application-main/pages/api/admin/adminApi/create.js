const { connect , disconnect} = require("../../../../utilities/db");
const { create } = require("../../controller/queries");
const { default: typeExist } = require("./typeExist");


async function handler(req, res) {
  try {
    const connection = await connect();

    const { 
        table,
        column,
        value
     } = req.body;
  
     if(value === ''){
      return res.status(400).json({
        success:false,
        code:400,
        message:`Field is required!`
      })
     }

     const exist = await typeExist(connection , value)
    
     if(exist){
       return res.status(200).json({
        success:true,
        code:200,
        message:`Course Type ${value} Already Exist!`
       })
     }
  const result = await create(
      connection,
       table,
        column,
        value
    );
    
    await disconnect(connection)
    return res.status(201).json({
        success:true,
        code:201,
        message:` ${table} Created Successfully !`,
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
