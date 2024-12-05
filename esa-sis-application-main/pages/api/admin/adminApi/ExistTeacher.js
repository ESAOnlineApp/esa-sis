const { getExistTeacher } = require("../../controller/queries");

const teacherExist = async( connection , teacher_mail)=>{
    try{    
    const exist = await getExistTeacher(connection , teacher_mail)

    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is ExistTeacher.js in adminApi in admin : ', error)
        return;
    }
}
export default teacherExist;