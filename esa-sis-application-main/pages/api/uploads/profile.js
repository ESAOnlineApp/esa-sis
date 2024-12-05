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
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Save Data" });
  }
  const { user } = session;

  const readFile = (file, saveLocally, place) => {
    const options = {};
    if (saveLocally) {
      options.uploadDir = place;
      options.filename = (name, ext, path1) => {
        if (
          path1.mimetype === "image/png" ||
          path1.mimetype === "image/jpeg" ||
          path1.mimetype === "image/jpg"
        ) {
          // Delete existing files in the directory except the new one
          let sourceDir = fs.readdirSync(place);

          sourceDir.forEach((file) => {
            const filePath = path.join(place, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile() && filePath !== path1.path) {
              try {
                console.log('Attempting to delete file:', filePath);
                fs.unlinkSync(filePath);
                console.log('Deleted file:', filePath);
              } catch (err) {
                console.error('Error deleting file:', err);
                // Log the error but continue with the loop
              }
            }
          });

          return Date.now().toString() + "_" + path1.originalFilename;
        } else {
          return res.status(400).send({ message: "File type not supported" });
        }
      };
    }

    const form = formidable(options);
    return new Promise((resolve, reject) => {
      form.parse(file, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  };

  const localDiskPath = path.parse(require("os").homedir()).root;
  const directory = path.join(
    localDiskPath,
    "sis-application-data",
    "Users",
    `${user.userid}`,
    "photo"
  );

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const test = await readFile(req, true, directory);
  console.log('test', test);

  let allimages = fs.readdirSync(directory);
  
  return res.status(200).send({
    secure_url: `${env.NEXTAUTH_URL}/file/sis/Users/${user.userid}/photo/${allimages[0]}`,
  });
}

export default handler;
