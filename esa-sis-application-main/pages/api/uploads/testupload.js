// import fs from "fs";
// import path from "path";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]";
// import { env } from "process";
// import express from 'express';
// import fileUpload from 'express-fileupload';

// const app = express();

// app.use(fileUpload());

// async function handler(req, res) {
//   console.log('wsllllllllllllllllll')
//   if (req.method !== "POST") {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(200).send('No files were uploaded.');
//     }

//     const file = req.files.file;

//     const localDiskPath = path.parse(require("os").homedir()).root;
//     const directory = path.join(
//       localDiskPath,
//       "/sis-application-data/sis-documents-programManager/grade"
//     );

//     if (!fs.existsSync(directory)) {
//       fs.mkdirSync(directory, { recursive: true });
//     }

//     const filePath = path.join(directory, `${Date.now()}_${file.name}`);

//     file.mv(filePath, function(err) {
//       if (err) {
//         return res.status(200).send(err);
//       }
//       res.status(201).json({
//         success: true,
//         code: 201,
//         message: `File uploaded successfully`
//       });
//     });
//   } catch (error) {
//     return res.status(200).json({
//       success: false,
//       code: 200,
//       message: error.message
//     });
//   }
// }

// app.post('/upload', handler);

// export default app;
