const {   isPromotionMajor } = require("../../controller/queries");

const PromotionMajorExist = async( connection ,promotion_name ,major_id)=>{
    try{
    const exist = await isPromotionMajor(connection ,promotion_name , major_id)
   
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is isPromotionToMajor.js in adminApi in admin : ', error)
    }
}
export default PromotionMajorExist;