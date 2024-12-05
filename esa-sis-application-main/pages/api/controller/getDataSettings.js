const { getAll } = require("./queries");

const DataSettings = async( connection , table)=>{
  try{    
    const exist = await getAll(connection , table )
      if(exist){
        return exist.rows
      }
    }catch(error){
      console.log('the error is in getDataSettings.js in controller in api : ', error)
      return;
    }
}
export default DataSettings;