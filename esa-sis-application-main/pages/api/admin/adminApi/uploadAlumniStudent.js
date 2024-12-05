import fs from "fs";
// import path from "path";
import multer from "multer";
import csv from "csv-parser";
import { getServerSession } from "next-auth/next";
const { connect, disconnect } = require("../../../../utilities/db");
const {
  AddStudentAlumni,
  getMajor,
  updateStudentStatus,
  getAllById
} = require("../../controller/queries");

// import xlsx from "xlsx";
import { authOptions } from "../../auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = "C:/sis-application-data/sis-documents-Admin/studentAlumni";
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

async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({ message: `${req.method} not supported` });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: "Signin Required To Save Data" });
    }

    upload.single("file")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          success: false,
          code: 500,
          message: "An error occurred while uploading the file.",
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

      // const buffer = fs.readFileSync(file.path);

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

      const readFile = (filePath) => {
        return new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream(filePath)
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

      // console.log('fields' , fields)

      const connection = await connect();
      let countSaved = 0;

      for (const row of fields) {
        try {
          const major = await getMajor(connection, row.Major);
          const majorid = major.rows[0].major_id;
          const student_exist = await getAllById(
            connection,
            'student',
            'student_id',
            row.StudentID
            
          )
      
          
          if(student_exist.rowCount>0){
          
            const response = await updateStudentStatus(
              connection , {
                status:'Alumni', 
                graduated_year:row.GraduatedYear, 
                student_id:row.StudentID
              }
            )
           
            if (response) {
              countSaved++;
            } else {
              console.error(`Failed to save row: `, row);
            }
          }else{
         
            const response = await AddStudentAlumni(connection, {
              status: row.Status,
              graduated_year: row.GraduatedYear,
              student_id: row.StudentID,
              promotion: row.Promotion,
              major_id: majorid,
              firstname: row.FirstName,
              lastname: row.LastName,
              academic_year: row.AcademicYear,
              email: row.Email,
              mobile_number: row.PhoneNumber,
            });
            // console.log('test' , response)
            if (response) {
              countSaved++;
            } else {
              console.error(`Failed to save row: `, row);
            }
          }


        } catch (error) {
          return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
          });
        }
      }

      await disconnect(connection);

      return res.status(201).json({
        success: true,
        code: 201,
        message: `Student Alumni Uploaded Successfully! ${countSaved} Student saved.`,
      });
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
