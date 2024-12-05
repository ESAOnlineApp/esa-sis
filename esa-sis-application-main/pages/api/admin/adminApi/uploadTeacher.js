import fs from "fs";
import multer from "multer";
import csv from "csv-parser";
import { getServerSession } from "next-auth/next";
const { connect, disconnect } = require("../../../../utilities/db");
const { uploadTeacher } = require("../../controller/queries");
import teacherExist from "./ExistTeacher";
import { authOptions } from "../../auth/[...nextauth]";
import iconv from "iconv-lite";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = "C:/sis-application-data/sis-documents-Admin/teacher";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

function generateID() {
  const randomDigits = Math.floor(Math.random() * 10000).toString();
  return randomDigits;
}

async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({ message: `${req.method} not supported` });
    }
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: "Signin Required To Save Data" });
    }

    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(200).json({
          success: true,
          code: 200,
          message: "File upload failed.",
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

      const connection = await connect();
      let countSaved = 0;
      // let idx = 0;

      for (const row of fields) {
        try {
          const teacherArray = Object.values({ row });

          const uploadPromises = teacherArray.map(async (teacher) => {
            console.log("teacher", teacher);
            const teacherId = generateID();

            const exist = await teacherExist(connection, teacher["Email"]);

            if (exist) {
              return res.status(200).json({
                success: true,
                code: 200,
                message: `Teachers Already Exist! ${
                  countSaved === 0 ? "No Teachers Saved" : `${countSaved} Teachers Saved`
                }`,
              });
            }

            if (
              teacher["FirstName"] === undefined ||
              teacher["LastName"] === undefined ||
              teacher["Email"] === undefined ||
              teacher["FirstName"] === "" ||
              teacher["LastName"] === "" ||
              teacher["Email"] === ""
            ) {
              return res.status(200).json({
                success: true,
                code: 200,
                message: `No data was uploaded due to missing required information.`,
              });
            }

            const response = await uploadTeacher(connection, {
              teacher_id: teacherId,
              teacher_firstname: teacher["FirstName"],
              teacher_mail: teacher["Email"],
              teacher_lastname: teacher["LastName"],
              teacher_mobile: teacher["MobileNumber"],
            });

            countSaved++; // Increment the count of saved records
            return response;
          });

          await Promise.all(uploadPromises);
        } catch (error) {
          return res.status(401).json({
            success: false,
            code: 401,
            message: `Failed to save row: ${row} `,
          });
        }
      }

      await disconnect(connection);

      return res.status(201).json({
        success: true,
        code: 201,
        message: `Teachers Uploaded Successfully! ${countSaved} Teacher(s) Saved`,
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
