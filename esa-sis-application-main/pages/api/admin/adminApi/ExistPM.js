const { getExistPM } = require("../../controller/queries");

const PMExist = async( connection , pm_email , major_id)=>{
    try{
    const exist = await getExistPM(connection , pm_email , major_id)

    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is ExistPM.js in adminApi in admin : ', error)
        return;
    }
}
export default PMExist;