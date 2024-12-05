import fs from "fs";
// import path from "path";
import csv from "csv-parser";
import multer from "multer";
// import * as XLSX from 'xlsx';
import iconv from "iconv-lite";
import { getServerSession } from "next-auth/next";
const { connect, disconnect } = require("../../../../utilities/db");
const {
  getMajor,
  uploadAddress,
  uploadEducation,
  uploadEmerg,
  uploadContact,
  uploadInfo,
  uploadStudent,
  ActiveUser,
  userDocument,
  uploadStudentFinancial,
} = require("../../controller/queries");


import { authOptions } from "../../auth/[...nextauth]";
// import SendEmail from "./emailFormat";
import hash from "./hash";
import StudentExist from "./studentExist";
import PromotionExist from "./promotionExist";
import PromotionMajorExist from "./isPromotionToMajor";
// import DataSettings from "../../controller/getDataSettings";
// import ClassNameGenerator from "@mui/utils/ClassNameGenerator";

function generateID(academicYear, majorId) {
  let academic_year = academicYear;
  let major_id = majorId;
  const randomDigits = Math.floor(Math.random() * 10000)

  return academic_year + major_id + randomDigits
}

function generateRandomPassword(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!$%?)(*&~`';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

// Create the directory if it doesn't exist
const uploadDir = "C:/sis-application-data/sis-documents-Admin/student";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  try {
    const connection = await connect();

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: "Signin Required To Save Data" });
    }

    upload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          success: false,
          code: 500,
          message: "Error uploading file.",
          error: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          code: 500,
          message: "An unknown error occurred.",
          error: err.message,
        });
      }

      const { file } = req;

      const readFile = (filePath) => {
        return new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream(filePath)
            .pipe(iconv.decodeStream("win1252")) // Specify the input encoding, such as "win1252" for Windows-1252
            .pipe(iconv.encodeStream("utf8")) // Convert to UTF-8 encoding
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
              resolve({ fields: results });
            })
            .on("error", (error) => {
              reject(error);
            });
        });
      };

      const { fields } = await readFile(file.path);


      // Initialize a set to store unique emails
      const emailSet = new Set();

      for (const field of fields) {

        let countSaved = 0; // Add a variable to track the number of records saved
        // const connection = await connect();

        // Check for duplicate email
        if (emailSet.has(field['Email(required)'])) {
          return res.status(200).json({
            success: true,
            code: 200,
            message: `Duplicate email found: ${field['Email(required)']}`,
          });
        }

        // Add the email to the set
        emailSet.add(field['Email(required)']);

        // Check if the necessary fields exist in the field object
        if (!field['Promotion(required,e.g:promo(promoNumber))']) {
          return res.status(200).json({
            code: 200,
            success: true,
            message: `Promotion field is required`,
          });
        }

        const major = await getMajor(connection, field.MajorName);
        // await disconnect(connection);

        const majorid = major.rows[0].major_id;
        const exist = await StudentExist(connection, field['Email(required)'], majorid);
        // await disconnect(connection);

        if (exist) {
          return res.status(200).json({
            success: true,
            code: 200,
            message: `Student Already Exist! ${countSaved === 0 ? 'No Students Saved' : `${countSaved} Students Saved`}`,
          });
        }

        const promotion_name = field['Promotion(required,e.g:promo(promoNumber))'].replace(/\s+/g, '').toUpperCase();
        const promotion_exist = await PromotionExist(connection, promotion_name);
       
        if (!promotion_exist) {
          return res.status(200).json({
            code: 200,
            success: true,
            message: `Promotion ${promotion_name} not Found`,
          });
        }

        const major_exist = await PromotionMajorExist(connection, promotion_name, majorid);
        if (!major_exist) {
          return res.status(200).json({
            success: true,
            code: 200,
            message: `Promotion ${promotion_name} not in major ${field.MajorName}`,
          });
        }
      }


      // let student_file = await fs.readdirSync(directory);

      // Access the file path from the 'files' object
      // const buffer = attendance_file.slice(-1)
      // console.log(directory)
      // if (!student_file) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: "File path not provided.",
      //   });
      // }

      // let student_files = await fs.readdirSync(directory);

      // const sortedFiles = student_files.slice().sort((fileA, fileB) => {
      //   const getIntFromFilename = (filename) => {
      //     const match = filename.match(/(\d+)/);
      //     return match ? parseInt(match[0]) : 0;
      //   };

      //   const intA = getIntFromFilename(fileA);
      //   const intB = getIntFromFilename(fileB);

      //   return intA - intB;
      // });

      // // Get the latest file from the 'course_files' list
      // const latestFile = sortedFiles[sortedFiles.length - 1];

      // // Construct the full path of the latest file
      // const latestFilePath = path.join(directory, latestFile);

      // // Read the buffer from the latest file
      // const buffer = fs.readFileSync(latestFilePath);

      // // Read the file data and create the workbook
      // const workbook = xlsx.read(buffer, { type: "buffer" });

      // const sheetName = workbook.SheetNames[0];

      // const worksheet = workbook.Sheets[sheetName];

      // const data = xlsx.utils.sheet_to_json(worksheet);
      // if (data.length === 0) {
      //   return res.status(400).json({
      //     success: false,
      //     code: 400,
      //     message: "Excel file is empty. No data to upload.",
      //   });
      // }


      // const connection = await connect();

      let countSaved = 0; // Add a variable to track the number of records saved



      let idx = 0;



      for (const row of fields) {


        try {

          const major = await getMajor(connection, row.MajorName);
          if (!major || major.rows.length === 0) {
            console.error(`Major not found for row: `, row);
            continue; // Skip this row if the major is not found
          }


          const majorid = major.rows[0].major_id;


          let field = fields[idx];


          idx++;
          // console.log('field.Email\n' , field.Email , 'field.Promotion\n',
          // field.Promotion, 
          // 'field.MobileNumber\n',field.MobileNumber , 'field.Gender\n' , field.Gender , 
          // 'field.StudentFirstName\n',field.StudentFirstName,
          // 'field.StudentLastName\n',field.StudentLastName,
          // 'field.AcademicYear\n',field.AcademicYear,
          // 'field.DateOfBirth\n' , field.DateOfBirth
          // )
          if (field['Email(required)'] === undefined
            || field['Promotion(required,e.g:promo(promoNumber))'] === undefined
            || field['MobileNumber(required)'] === undefined
            || field['Gender(required)'] === undefined
            || field['StudentFirstName(required)'] === undefined
            || field['AcademicYear(required)'] === undefined
            || field['DateOfBirth(required,e.g:(mm/dd/yyyy))'] === undefined
            || field['StudentLastName(required)'] === undefined
            || field['Email(required)'] === ''
            || field['MobileNumber(required)'] === ''
            || field['StudentFirstName(required)'] === ''
            || field['Promotion(required,e.g:promo(promoNumber))'] === ''
            || field['AcademicYear(required)'] === ''
            || field['Gender(required)'] === ''
            || field['StudentLastName(required)'] === ''
            || field['DateOfBirth(required,e.g:(mm/dd/yyyy))'] === '') {
            return res.status(200).json({
              success: true,
              code: 200,
              message: `No data was uploaded due to missing required information.`
            })
          }

          // const settings = await DataSettings(connection, 'settings')

          // const esa_logo = settings[0].esa_logo



          const StudentArray = Object.values({ field });

          const uploadPromises = StudentArray.map(async (student) => {

            // const userpasswordref = await hash(student.userpassword);
            const studentId = generateID(student['AcademicYear(required)'], majorid)
            
            const user_password = generateRandomPassword(8)
           
            const hasPass = await hash(user_password)
            
            const dateofBirth = new Date(student['DateOfBirth(required,e.g:(mm/dd/yyyy))'])
          
            // Add one day to the date
            dateofBirth.setDate(dateofBirth.getDate() + 1);

            // Get the date string without the time component
           dateofBirth.toISOString().split('T')[0];

         





            await ActiveUser(connection, {
              userid: studentId,
              userpassword: hasPass,
              token: "",
              isVerified: "",
              update_time: "",
            });

            await userDocument(connection, {
              userid: studentId,
              profileurl: '',
            });

            await uploadAddress(connection, {
              userid: studentId,
              address_country: student['Country'],
              address_region: student['Region'],
              address_city: student['City'],
              address_street: student['Street'],
              address_building: student['Building'],
              address_floor: student['Floor'],
              address_postal: student['Postal'],
            });
            await uploadContact(connection, {
              userid: studentId,
              email: student['Email(required)'],
              email_two: student['SecondEmail'],
              mobile_number: student['MobileNumber(required)'],
              landline_number: student['LandLineNumber'],
            });
            await uploadEducation(connection, {
              userid: studentId,
              degree_level: student['Degree'],
              series: student['Series'],
              obtain_date: student['DateObtain'],
              education_country: student['EducationCountry'],
              establishment: student['Establishment'],
              other_establishment: student['otherEstablishment'],
            });
            await uploadEmerg(connection, {
              userid: studentId,
              prefix: student['EmergencePrefix'],
              emerg_firstname: student['EmergenceFirstName'],
              emerg_middlename: student['EmergenceMiddleName'],
              emerg_lastname: student['EmergenceLastName'],
              emerg_phonenumber: student['EmergencePhoneNumber'],
              emerg_relationship: student['EmergenceRelationShip'],
              emerg_medicalhealth: student['EmergenceMedicalHealth'],
              emerg_diseasetype: student['EmergenceDisease'],
            });
            await uploadInfo(
              connection,
              {
                userid: studentId,
                title: student['Title'],
                firstname: student['StudentFirstName(required)'],
                fathername: student['FatherName'],
                lastname: student['StudentLastName(required)'],
                maidename: student['maidename'],
                mothername: student['MotherName'],
                gender: student['Gender(required)'],
                dateofbirth: dateofBirth,
                countryofbirth: student['CountryOfBirth'],
                placeofbirth: student['PlaceOfBirth'],
                registernumber: student['RegisterNumber'],
                martialstatus: student['MartialStatus'],
                firstnationality: student['FirstNationality'],
                secondnationality: student['SecondNationality']
              }
            )

            const response = await uploadStudent(connection, {
              student_id: studentId,
              status: "active",
              promotion: student['Promotion(required,e.g:promo(promoNumber))'].replace(/\s+/g, '').toUpperCase(),
              academic_year: student['AcademicYear(required)'],
              student_firstname: student['StudentFirstName(required)'],
              student_lastname: student['StudentLastName(required)'],
              major_id: majorid,
            });
            if (response) {
              await uploadStudentFinancial(connection, {
                student_id: studentId,
                pims_id: student['PimsId']
              })
            }

            // await SendEmail(
            //   student['StudentFirstName(required)'],
            //   student['Email(required)'],
            //   user_password,
            //   studentId,
            //   esa_logo
            // );

            return response

          })


          const responses = await Promise.all(uploadPromises);

          if (responses) {
            countSaved++; // Increment the count of saved records
          } else {
            console.error(`Failed to save row: `, row);
          }
        } catch (error) {
          return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
          });
        }
      }

      //     // Close the database connection after all operations
      await disconnect(connection);

      return res.status(201).json({
        success: true,
        code: 201,
        message: `Student Uploaded Successfully! ${countSaved} Student Saved`,
      });

    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  }
}

export default handler;
