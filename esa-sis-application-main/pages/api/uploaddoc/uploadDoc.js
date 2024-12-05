import formidable from "formidable";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { env } from "process";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  try{
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Save Data" });
  }

  // const { user } = session;

  // const { formData, attendance } = req.body;

  const readFile = (file, saveLocally, place) => {
    const options = {};
    if (saveLocally) {
      options.uploadDir = place;

      // eslint-disable-next-line no-unused-vars
      options.filename = (name, ext, path1, form) => {
        // // console.log("user",form)

        if (
          path1.mimetype === "application/pdf" ||
          path1.mimetype === "application/x-pdf" ||
          path1.mimetype === "image/png" ||
          path1.mimetype === "image/jpeg" ||
          path1.mimetype === "image/jpg"
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

          return (
            // 'attendance-' + Date.now().toString() + '_' + path1.originalFilename
            path1.originalFilename
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
    localDiskPath + "/sis-application-data/sis-documents/attendance";

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  //<<<<<<< batoul

  const { fields } = await readFile(req, true, directory);
  // console.log("fields", fields);

  //  let attendance_file = await fs.readdirSync(directory);

  return res.status(200).send({
    url: `${env.NEXTAUTH_URL}file/sis/Sis-documents/attendance/attendance-${fields.attendance_id}-${fields.course_id}-${fields.teacher_id}-${fields.attendance_date}.${fields.ext}`,
  });

}catch(error){
  console.log('the error is in uploadDoc.js in uploaddoc in api : ', error)
  return
}
  //=======
  // eslint-disable-next-line no-unused-vars
  // const { fields, files } = await readFile(req, true, directory);
  // // console.log('fields', fields);

  // let attendance_file = await fs.readdirSync(directory);
  // const oldFilePath = path.join(directory, attendance_file.slice(-1)[0]);
  // const fileExtension = path.extname(attendance_file.slice(-1)[0]);
  // const newFileName = fields.attendance + fileExtension;
  // const newFilePath = path.join(directory, newFileName);

  // Rename the file
  // fs.renameSync(oldFilePath, newFilePath);
  // // Delete the old file if it exists
  // if (fs.existsSync(oldFilePath)) {
  //   fs.unlinkSync(oldFilePath);
  // }

  // Return a response
  // return res.status(200).send({
  //   url: `${env.NEXTAUTH_URL}/file/sis/sis-documents/attendance/${newFileName}`,
  // });

  // return res.status(200).send(req)
}

export default handler;
