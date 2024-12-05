const { existMajor } = require("../../controller/queries");

const majorExist = async( connection , teacher_mail)=>{
    try{
    const exist = await existMajor(connection , teacher_mail)

    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is existMajor.js in adminApi in admin : ', error)
        return;
    }
}
export default majorExist;