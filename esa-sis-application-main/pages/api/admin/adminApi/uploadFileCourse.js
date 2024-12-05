import fs from "fs";
// import { getServerSession } from "next-auth/next";
import { connect, disconnect } from "../../../../utilities/db";
import { getMajor, CreateCourse } from "../../controller/queries";
import multer from "multer";
import CourseExist from "../../pmApi/exist/getCourses";
import * as csv from "fast-csv";
import iconv from "iconv-lite";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = "C:/sis-application-data/sis-documents-Admin/course";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
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

    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          code: 500,
          message: "An error occurred while uploading the file.",
          error: err.message,
        });
      }

      const { file } = req;

      const fields = [];
      fs.createReadStream(file.path)
        .pipe(iconv.decodeStream("win1252")) // Specify the input encoding, such as "win1252" for Windows-1252
        .pipe(iconv.encodeStream("utf8")) // Convert to UTF-8 encoding
        .pipe(csv.parse({ headers: true })) // Parse CSV with correct encoding
        .on("error", (error) => {
          console.error("Error parsing CSV:", error);
          return res.status(500).json({
            success: false,
            code: 500,
            message: "An error occurred while parsing the CSV file.",
            error: error.message,
          });
        })
        .on("data", (row) => {
          fields.push(row);
        })
        .on("end", async () => {
          // console.log("Raw Data from CSV:", fields); // Log raw data to check encoding

          console.log('json', JSON.stringify(fields))

          const connection = await connect();
          let countSaved = 0;

          for (const row of fields) {
            try {
              const major = await getMajor(connection, row.MajorName);
              if (!major || major.rows.length === 0) {
                continue; // Skip if major not found
              }

              const majorid = major.rows[0].major_id;

              // Check for required fields
              if (!row.CourseID || !row.CourseName || !row.MajorName || !row.CourseCredit || !row.CourseType) {
                return res.status(200).json({
                  success: true,
                  code: 200,
                  message: "No data was uploaded due to missing required information.",
                });
              }

              // Check if course already exists
              const exist = await CourseExist(connection, row.CourseID, majorid);
              if (exist) {
                return res.status(200).json({
                  success: true,
                  code: 200,
                  message: `Courses already exist! ${countSaved === 0 ? 'No courses saved' : `${countSaved} courses saved`}`,
                });
              }

              // Create new course
              const response = await CreateCourse(connection, {
                course_id: row.CourseID,
                course_name: row.CourseName,
                course_credit: row.CourseCredit,
                course_type: row.CourseType,
                major_id: majorid,
              });
              if (response) {
                countSaved++;
              } else {
                console.error("Failed to save row:", row);
              }
            } catch (error) {
              console.error("Error while processing row:", row, "\nError:", error);
            }
          }

          await disconnect(connection);

          return res.status(201).json({
            success: true,
            code: 201,
            message: `Courses uploaded successfully! ${countSaved} courses saved`,
          });
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
