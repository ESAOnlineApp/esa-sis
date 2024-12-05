const { existType } = require("../../controller/queries");

const typeExist = async( connection , value)=>{
    try{
    const exist = await existType(connection , value)

    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is typeExist.js in adminApi in admin : ', error)
    }
}
export default typeExist;