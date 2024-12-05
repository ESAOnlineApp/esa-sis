const { connect , disconnect} = require("../../../../utilities/db");
const { createPromotion } = require("../../controller/queries");
const { default: PromotionExist } = require("./promotionExist");




async function handler(req, res) {
  try {
    const connection = await connect();

    const { 
        promotion_name,
        academic_year,
        major_id
     } = req.body;
     console.log('testuuuuuuuuuuuuuuuuuu' )
    //  if(promotion_name === '' || academic_year === '' || major_id === ''){
    //   return res.status(400).json({
    //     success:false,
    //     code:400,
    //     message:`Field is required!`
    //   })
    //  }
     const exist = await PromotionExist(connection , promotion_name)
     if(exist){
       return res.status(200).json({
        success:true,
        code:200,
        message:`Promotion ${promotion_name} Already Exist!`
       })
     }
   const result = await createPromotion(
      connection,
      promotion_name,
        academic_year,
        major_id
    );

    await disconnect(connection)
    return res.status(201).json({
        success:true,
        code:201,
        message:"Promotion Created Successfully !",
        data : result
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        code:500,
        message: error.message
    })
  }
}

export default handler;
