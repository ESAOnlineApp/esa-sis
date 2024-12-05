import formidable from "formidable";
import fs from "fs";
import path from "path";
import axios from 'axios'

import { getServerSession } from "next-auth/next";
const { connect, disconnect } = require("../../../utilities/db");
const { uplaodEXEDGrade } = require("../controller/queries");

import xlsx from "xlsx";
import { env } from 'process';
import { authOptions } from "../auth/[...nextauth]";
// import SendEmail from "./emailGrade";
import gradeExistsEXED from "./exist/ExistEXEDGrade";




export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {

  try {
    if (req.method !== "POST") {
      return res.status(400).send({ message: `${req.method} not supported` });
    }
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: "Signin Required To Save Data" });
    }

    const readFile = (file, saveLocally, place) => {
      const options = {};
      if (saveLocally) {
        options.uploadDir = place;

        // eslint-disable-next-line no-unused-vars
        options.filename = (name, ext, path1, form) => {

          if (
            path1.mimetype ===
            'text/csv'
          ) {
            let sourceDir = fs.readdirSync(place);

            sourceDir.forEach((file) => {
              const filePath = path.join(place, file);
              const stats = fs.statSync(filePath);
              if (stats.isFile()) {
                // fs.unlinkSync(filePath);
                // // console.log('Deleted file:', filePath);
              }
            });

            const currentTimestamp = Date.now();
            const filename = `${currentTimestamp}_${path1.originalFilename}`;

            return (
              // 'attendance-' + Date.now().toString() + '_' + path1.originalFilename
              filename
            );
          } else {
            return res
              .status(200)
              .send({ status: 401, message: "file was not accepted" });
          }
        };
      }

      // options.maxFileSize = 4000 * 1024 * 1024;
      const form = formidable(options);

      return new Promise((resolve, reject) => {
        form.parse(file, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });
    };

    const localDiskPath = path.parse(require("os").homedir()).root;

    const directory =
      localDiskPath + "/sis-application-data/sis-documents-programManager/grade";

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const { fields } = await readFile(req, true, directory);
    

    let grade_file = await fs.readdirSync(directory);


    if (!grade_file) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "File path not provided.",
      });
    }

    let grade_files = await fs.readdirSync(directory);

    const sortedFiles = grade_files.slice().sort((fileA, fileB) => {
      const getIntFromFilename = (filename) => {
        const match = filename.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
      };

      const intA = getIntFromFilename(fileA);
      const intB = getIntFromFilename(fileB);

      return intA - intB;
    });

    // Get the latest file from the 'course_files' list
    const latestFile = sortedFiles[sortedFiles.length - 1];

    // Construct the full path of the latest file
    const latestFilePath = path.join(directory, latestFile);

    // Read the buffer from the latest file
    const buffer = fs.readFileSync(latestFilePath);

    // Read the file data and create the workbook
    const workbook = xlsx.read(buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    if (data.length === 0) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Excel file is empty. No data to upload.",
      });
    }

    const connection = await connect();
    const processedRows = []

    for (const row of data) {
      try {

        // if (row.StudentID === undefined || row.StudentFirstName === undefined || row.CertificateName === undefined
        //   || row.StudentFamilyName === undefined || row.StudentID === '' || row.CertificateName === '' || row.Grade === undefined || row.StudentFirstName === ''
        //   || row.StudentFamilyName === '' || row.Grade === '') {
        //   return res.status(400).json({
        //     success: false,
        //     code: 400,
        //     message: `No data was uploaded due to missing required information.`
        //   })
        // }
        
        const exist = await gradeExistsEXED(connection ,row.StudentID ,row.CertificateName , row.TaskName)
  
        if (exist) {
          return res.status(200).json({
            success :true,
            status : 200,
            message:`${row.FirstName} ${row.FamilyName} Grade Already Exist !`
          })
        }

        await uplaodEXEDGrade(
          connection,
          {
            student_id:row.StudentID,
            student_firstname:row.FirstName,
            student_lastname:row.FamilyName,
            course_id:row.CertificateName,
            task_name:row.TaskName,
            academic_year:row.Year,
            grades:row.Grade,
            comments:row.Comments
          }
        )
        processedRows.push(row);

      } catch (error) {
        console.error(`Error while processing row: `, row, "\nError: ", error);
      }
    }
    // Send email using the last processed row outside the loop
    if (processedRows.length > 0) {
      const lastProcessedRow = processedRows[processedRows.length - 1];
    
      // Assuming fields.studentInfo is a JSON string
      const recipientInfoString = fields.studentInfo;
    
      // Parse the JSON string into an array of objects
      const recipientInfoArray = JSON.parse(recipientInfoString);

    
      // Assuming recipientInfoArray is an array of objects with the specified properties
      for (const recipientInfo of recipientInfoArray) {
        try {   
          // Assuming the SendEmail function requires the recipient's email, first name, and last name
          // await SendEmail(
          //    lastProcessedRow.CertificateName,
          //    recipientInfo.email,
          //    recipientInfo.firstName,
          //    recipientInfo.lastName,
          // );
          await axios.post(`${env.NEXTAUTH_URL}/api/pmApi/addNotification`,{
            receiverIds:[recipientInfo.studentID], 
            senderId:recipientInfo.pm_id, 
            content:'<!DOCTYPE html>' +
            '<html><head><title>Grades</title>' +
            '</head><body><div>' +
            `<div style="text-align: center;">
               </div>` +
            `</br>` +
            `<p>Dear <span style="font-weight: bold">${ recipientInfo.firstName} ${recipientInfo.lastName}</span>,</p>` +
            `<p>We trust this email finds you well.</p> ` +
            `<p>We would like to inform you that your most recent grade for <span style="font-weight: bold"> ${lastProcessedRow.CertificateName}</span> has been updated on the Student Information System <span style="font-weight: bold"> (SIS)</span>. </p>` +
            // `<p> Please login using the below credentials:</p>` +
            // `<p>Your username: <span style="font-weight: bold">${email}</span>.</p>` +
            // `<p>Your password: <span style="font-weight: bold">${defaultpassword}</span>.</p>` +
      
            `<p>To review the details of this update, please log in to the SIS portal using your credentials and navigate to the <span style="font-weight: bold">"Grades" </span> section.</p>` +
            `<p>
            Should you have any inquiries or require further clarification regarding the updated grade, do not hesitate to contact your program manager.</p>` +
            `<p>Best regards,</p> ` +
            `<p>ESA Business School</p> ` +
      
            '</div></body></html>',
             subject:'Student Grades'
          })
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
    }

    // Close the database connection after all operations
    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
      message: `Grades Uploaded Successfully!`,
    });



  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  }
}

export default handler;
