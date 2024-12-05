const { getExistASPM } = require("../../controller/queries");

const AsPMExist = async( connection , pm_ass_email , major_id)=>{
    try{
    const exist = await getExistASPM(connection , pm_ass_email , major_id)

    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is ExistAsPM.js in adminApi in admin : ', error)
        return;
    }
}
export default AsPMExist;