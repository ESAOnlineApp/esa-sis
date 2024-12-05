const { connect  , disconnect} = require("../../../../utilities/db");
const { createPMAccount  } = require("../../controller/queries");
const { default: PMExist } = require("./ExistPM");
// const { default: SendEmailPM } = require("./sendEmailPM");
import DataSettings from "../../controller/getDataSettings";
import SendEmailTo from "./emailContent";


// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
    try {
        const connection = await connect();
        // filterStudent(connection, id, firstname, lastname, major, promotion, status);
        const {pm_id, pm_firstname, pm_lastname, pm_email, pm_status, userpassword, major_id , password , role} = req.body;
    
        const exist = await PMExist(connection , pm_email , major_id)
        if(exist){
            return res.status(200).send(exist)
        }
        const data = await createPMAccount(connection, pm_id, pm_firstname, pm_lastname, pm_email, pm_status, userpassword,major_id);
        const settings = await DataSettings(connection , 'settings')
         
        const esa_logo = settings[0].esa_logo
        // await SendEmailPM(  pm_firstname , pm_email , password , pm_id , esa_logo)
        await SendEmailTo(pm_firstname , pm_email , password , pm_id , esa_logo , role)
      
        await disconnect(connection);
        return res.status('200').send(data)
        
    } catch (error) {
        
        return res.status('401').send(error)
        // return error;
    }

}
export default handler;
// module.exports = handler;