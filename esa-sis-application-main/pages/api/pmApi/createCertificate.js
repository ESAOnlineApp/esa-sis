const { connect, disconnect } = require("../../../utilities/db");
const { default: majorExist } = require("../admin/adminApi/existMajor");
const { createCertificate } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { majorId, name } = req.body;
    const exist = await majorExist(connection , `EXED-${name}`)
    if(exist){
      return res.status(200).json({
        code:200,
        success:true,
        message : `Certificate ${name} Already Exist!`
      })
    }
   const response = await createCertificate(connection, majorId , name);
   
    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
      message: `Certificate ${name} created successfully`,
      data:response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
module.exports = handler;
