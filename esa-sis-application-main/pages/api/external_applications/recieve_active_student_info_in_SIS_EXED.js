/*
 * Created By: KANSO Adi, Ali Mroueh
 * Project: SIS Application
 * File: pages\api\external_application\recieve_active_student_info_in_SIS.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

const { insertData } = require('../controller/queries');
const { insertPromotion, insertMajor } = require('../controller/queries');
const { addStudentActivityToLogs } = require('../controller/queries');
const { connect } = require('../../../utilities/db');
// const { sis_app_logger } = require('../logger');
// const useragent = require('useragent');
const { env } = require('process');
import crypto from "crypto";
// import axios from 'axios'
import bcryptjs from "bcryptjs";
// import EmailAfterCreateAccount from "../../../utilities/emailing/emailAfterCreateAccount";
import SendEmail from "../admin/adminApi/emailFormat";



const formatDateForDB = (dateString) => {
  // Split the DD/MM/YYYY string into parts
  const [day, month, year] = dateString.split('/');

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
};


function generatePassword(length) {
  const paternlist =
    "0123456789ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnpqrstuvwxyz#$%&()*+,-./:;<=>!?@[]^_`{|}~";
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => paternlist[x % paternlist.length])
    .join("");
}

async function handler(req, res) {
  try {
    // Generate a strong KEY from an online key generator
    const ONLINE_SIS_SECRET_KEY = env.ONLINE_SIS_SECRET_KEY;
    // for dev mode should be localhost:3001
    const ONLINE_URL = env.ONLINE_APPLICATION_URL;
    // Allow integration with the online application
    // during SIS development the value should be false until the integration is done
    // because we plan to deploy progresvly the SIS application in the production server
    const allowIntegration = env.ALLOW_INTEGRATION;

    res.setHeader('Access-Control-Allow-Origin', ONLINE_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (
      allowIntegration &&
      req.method === 'POST' &&
      req.url === '/api/external_applications/recieve_active_student_info_in_SIS_EXED'
    ) {
      // Verify authorization token
      const authHeader = req.headers['authorization'];
      if (!authHeader || authHeader !== ONLINE_SIS_SECRET_KEY) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
        return;
      }
      // const userAgent = req.headers['user-agent'];
      // const userAgentinfo = useragent.parse(userAgent);

      let { studentInfo, adminName } = req.body;
      // console.log(adminName);
      // console.log('===============');
      // console.log(studentInfo.rows);
      // console.log('===============');
      let isSuccess = true;

      if (studentInfo) {
        // // console.log(studentInfo[0]);
        let recieved_data = studentInfo.rows[0];
        // console.log("============asdasd===========asdasd======", recieved_data);
        // connect to data base
        const connection = await connect();
        const new_pass = generatePassword(8)
        console.log('new', new_pass)
        const salt = await bcryptjs.genSalt(8);
        const genPass = await bcryptjs.hash(new_pass, salt);
        // insert the major
        const columns_major = ['major_id', 'major_name'];
        const values_major = [
          `${recieved_data.major_id}`,
          `EXED-${recieved_data.major_name}`,

        ];
        // const insertmajor =

        // eslint-disable-next-line no-unused-vars
        const resMajor = await insertMajor(
          connection,
          'major',
          columns_major,
          values_major
        );
        // // console.log('resMajor: ', resMajor);
        // console.log('major', resMajor);
        isSuccess = isSuccess && resMajor.rowCount > 0;
        const date = new Date();
        let current_year = date.getFullYear();
        const columns_promotion = ['promotion_name', 'major_id', 'academic_year'];
        const promotion_data = [
          `${recieved_data.promotion}`,
          `${recieved_data.major_id}`,
          current_year,
        ];
        let insertIntoPromotionIfNotExist = await insertPromotion(
          connection,
          'promotions',
          columns_promotion,
          promotion_data
        );
        // console.log(
        //   'insertIntoPromotionIfNotExist:',
        //   insertIntoPromotionIfNotExist
        // );

        isSuccess = isSuccess && insertIntoPromotionIfNotExist.rowCount > 0;
        // insert the user
        const columns_user = ['userid', 'role', 'userpassword'];
        const values_user = [
          `${recieved_data.CID}`,
          1,
          `${genPass}`,
        ];
        let resUser = await insertData(
          connection,
          'users',
          columns_user,
          values_user
        );
        // // console.log('resUser: ', resUser.rowCount > 0);
        isSuccess = isSuccess && resUser.rowCount > 0;

        // eslint-disable-next-line no-inner-declarations
        function formatDate(date) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear().toString();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const formattedDate = `${day}-${month}-${year}-${hours}:${minutes}`;
          return formattedDate;
        }

        const currentDate = new Date();
        const formattedCurrentDate = formatDate(currentDate);


        // insert into logs
        // eslint-disable-next-line no-unused-vars
        const insertToLogs = await addStudentActivityToLogs(
          connection,
          studentInfo.rows[0].CID,
          'status',
          'active',
          'online application',
          adminName,
          formattedCurrentDate
        );
        const pass = new Date();
        let pass_year = pass.getFullYear();
        // insert the student
        const columns_student = [
          'student_id',
          'status',
          'promotion',
          'academic_year',
          'student_firstname',
          'student_lastname',

          'major_id',

          'graduated_year'
        ];
        const values_student = [
          `${recieved_data.CID}`,
          `active`,
          `${recieved_data.promotion}`,
          `${pass_year}`,
          `${recieved_data.first_name}`,
          `${recieved_data.last_name}`,

          `${recieved_data.major_id}`,
          2023,
        ];

        // console.log(promotion_data);
        let resstudent = await insertData(
          connection,
          'student',
          columns_student,
          values_student
        );
        // console.log('student', resstudent);
        //here


        isSuccess = isSuccess && resstudent.rowCount > 0;

        const dateBirthFormate = formatDateForDB(
          recieved_data.dob
        )
        // insert the user_personal_info
        const columns_user_personal_info = [
          'userid',
          'title',
          'firstname',
          'fathername',
          'lastname',
          'maidename',
          'mothername',
          'gender',
          'dateofbirth',
          'countryofbirth',
          'placeofbirth',
          'registrationnumber',
          'maritalstatus',
          'firstnationality',
          'secondnationality',
        ];
        const values_user_personal_info = [
          `${recieved_data.CID}`,
          `${recieved_data.title}`,
          `${recieved_data.first_name}`,
          `${recieved_data.father_name}`,
          `${recieved_data.last_name}`,
          ``,
          ``,
          `${recieved_data.gender}`,
          `${dateBirthFormate}`,
          ``,
          `${recieved_data.place_of_birth}`,
          ``,
          `${recieved_data.marital_status}`,
          `${recieved_data.nationality_1}`,
          `${recieved_data.nationality_2}`,
        ];
        const resUserPersonalInfo = await insertData(
          connection,
          'user_personal_info',
          columns_user_personal_info,
          values_user_personal_info
        );

        // // console.log('resUserPersonalInfo: ', resUserPersonalInfo.rowCount > 0);
        // console.log('resInfo', resUserPersonalInfo);
        isSuccess = isSuccess && resUserPersonalInfo.rowCount > 0;

        // insert the user_contact
        const columns_user_contact = [
          'userid',
          'email',
          'email_two',
          'mobile_number',
          'landline_number',
        ];
        const values_user_contact = [
          `${recieved_data.CID}`,
          `${recieved_data.personal_email}`,
          ``,
          `${recieved_data.mobile_number}`,
          ``,
        ];
        const res_user_contact = await insertData(
          connection,
          'user_contact',
          columns_user_contact,
          values_user_contact
        );

        // // console.log('res_user_contact: ', res_user_contact.rowCount > 0);
        // console.log('resContact', res_user_contact);
        isSuccess = isSuccess && res_user_contact.rowCount > 0;

        // insert the user_personal_address
        const columns_user_personal_address = [
          'userid',
          'address_country',
          'address_region',
          'address_city',
          'address_street',
          'address_building',
          'address_floor',
          'address_postal',
        ];
        const values_user_personal_address = [
          `${recieved_data.CID}`,
          `${recieved_data.country}`,
          `${recieved_data.region}`,
          `${recieved_data.home_address}`,
          ``,
          ``,
          ``,
          ``,
        ];
        const res_user_personal_address = await insertData(
          connection,
          'user_personal_address',
          columns_user_personal_address,
          values_user_personal_address
        );

        // // console.log('res_user_personal_address: ', res_user_personal_address.rowCount > 0);
        // console.log('resAddress', res_user_personal_address);
        isSuccess = isSuccess && res_user_personal_address.rowCount > 0;

        // insert the user_emergency_contact
        const columns_user_emergency_contact = [
          'userid',
          'prefix',
          'emerg_firstname',
          'emerg_middlename',
          'emerg_lastname',
          'emerg_phonenumber',
          'emerg_relationship',
          'emerg_medicalhealth',
          'emerg_diseasetype',
        ];
        const values_user_emergency_contact = [
          `${recieved_data.CID}`,
          ``,
          ``,
          ``,
          ``,
          ``,
          ``,
          ``,
          ``,
        ];
        const res_user_emergency_contact = await insertData(
          connection,
          'user_emergency_contact',
          columns_user_emergency_contact,
          values_user_emergency_contact
        );

        // // console.log('res_user_emergency_contact: ', res_user_emergency_contact.rowCount > 0);
        isSuccess = isSuccess && res_user_emergency_contact.rowCount > 0;

        // insert the user_education
        const columns_user_education = [
          'userid',
          'degree_level',
          'series',
          'obtain_date',
          'education_country',
          'establishment',
          'other_establishment',
        ];
        const values_user_education = [
          `${recieved_data.CID}`,
          `${recieved_data.degree}`,
          `${recieved_data.major}`,
          `${recieved_data.year}`,
          ``,
          `${recieved_data.university_name}`,
          ``,
        ];
        const res_user_education = await insertData(
          connection,
          'user_education',
          columns_user_education,
          values_user_education
        );

        // // console.log('res_user_education: ', res_user_education.rowCount > 0);
        isSuccess = isSuccess && res_user_education.rowCount > 0;

        // insert the promotion
        // const column_promotion = ["promotion_name"];
        // const values_promotion = [`${recieved_data.program}`];
        // // eslint-disable-next-line no-unused-vars
        // let resPromotion = await insertData(
        //   connection,
        //   "promotions",
        //   columns_promotion,
        //   values_promotion
        // );
        // // console.log("respromotion: ", resPromotion);

        // insert the user_document
        const columns_document = ['userid', 'profileURL'];
        const values_document = [
          `${recieved_data.CID}`,
          ``,
        ];
        let resDocument = await insertData(
          connection,
          'user_document',
          columns_document,
          values_document
        );
        // // console.log("resDocument: ", resDocument.rowCount > 0);
        isSuccess = isSuccess && resDocument.rowCount > 0;
      //  const password = new_pass
       
     
          const lname = recieved_data.last_name
        const fname = recieved_data.first_name
        const name = fname + ' ' + lname
        const studentId = recieved_data.CID
        const email = recieved_data.personal_email
    
        SendEmail(name, email, new_pass, studentId, 'https://esasis.esa.edu.lb/file/setting/public/esa.png')

    
        console.log('isSuccess' , isSuccess)
        // inseFIXME:Dear SIS team, please fix this useEffect to read SIS settings from the databasee.log("resDocument: ", resDocument);

        // if (!isSuccess) {
        //   const responseData = {
        //     message: 'The data did not save in the sis database',
        //   };
        //   // else send
        //   // const responseData = { message: 'Failed to insert student info' };
        //   // the online application will handle the response for further actions
        //   res.writeHead(404, { 'Content-Type': 'text/plain' });
        //   res.end(JSON.stringify(responseData));
        // }
      } else {
        // // console.log('no student info');
        const responseData = { message: 'No Student Info' };
        // else send
        // const responseData = { message: 'Failed to insert student info' };
        // the online application will handle the response for further actions
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(responseData));
      }

      // TODO: write an info log
      // sis_app_logger.info(
      //   `${new Date()}=received a new active user=${userAgentinfo.os.family}=${
      //     userAgentinfo.os.major
      //   }=${userAgentinfo.family}=${userAgentinfo.source}=${
      //     userAgentinfo.device.family
      //   }`
      // );
      // Send a response to the online application
      // FIXME: Dear SIS developper please handle if the student record inserted or not
      //  if inserted send
      const responseData = { message: 'Received student info' };
      // else send
      // const responseData = { message: 'Failed to insert student info' };
      // the online application will handle the response for further actions
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseData));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      // TODO: Dear SIS developper
      // TODO: write an error log
    }
  } catch (error) {
    console.log('the error is in recieve_active_student_info_in_SIS_EXED.js in external_applications in api : ', error)
    return
  }
}
export default handler
