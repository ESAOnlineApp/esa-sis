const {   promotionExist } = require("../../controller/queries");

const PromotionExist = async( connection ,promotion_name)=>{
    try{
    const exist = await promotionExist(connection ,promotion_name)
   
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is promotionExist.js in adminApi in admin : ', error)
    }
}
export default PromotionExist;