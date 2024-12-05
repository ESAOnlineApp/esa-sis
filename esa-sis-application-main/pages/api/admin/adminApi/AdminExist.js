const { getAdminExist } = require("../../controller/queries");

const adminExist = async( connection ,admin_firstname, admin_lastname, adminemail)=>{

    try{
    const exist = await getAdminExist(connection , admin_firstname, admin_lastname, adminemail)
//    console.log('exist',exist.rowCount)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
}catch(error){
    console.log('this is AdminExist.js in adminApi in admin : ', error)
}
}
export default adminExist;