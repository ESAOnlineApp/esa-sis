/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\api\cloud\deleteFolderInCloud.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import decrypt from "../../../utilities/encrypt_decrypt/decryptText";

import cloudinary from "cloudinary";
import selection_data from "../../../utilities/selection_data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To send" });
  }
  const incomingData = JSON.parse(decrypt(req.body.data));
  const name = incomingData.userName;
  const StudentID = incomingData.userID;
  const folder = incomingData.folder;
  // console.log("dataDeletefolder",incomingData)
  // // console.log('deleteFolderInCloud name==>', name);
  // // console.log('deleteFolderInCloud StudentID==>', StudentID);
  // // console.log('deleteFolderInCloud folder==>', folder);

  // TODO: Delete relevant data from Cloudinary
  cloudinary.config({
    cloud_name: selection_data.cloud_Name,
    api_key: selection_data.cloud_API_key,
    api_secret: selection_data.cloud_API_secret,
  });

  // First should empty all folder contents
  const deleteFolderresources = async (folderName) => {
    try {
      const result = await cloudinary.api.delete_resources_by_prefix(
        `${folderName}/`
      );
      console.log(result);
    } catch (error) {
      console.error("Error=", error);
      return;
    }
  };
  // deleteFolderresources(`onlineUsers/${name}-${StudentID}/application`);
  deleteFolderresources(`SISUsers/${name}-${StudentID}/${folder}`);
  // deleteFolderresources(`onlineUsers/${name}-${StudentID}/student`);
  // // delete empty folders
  // const deleteFolder = async (folderName) => {
  //   try {
  //     const result = await cloudinary.api.delete_folder(folderName);
  //     // console.log(result);
  //   } catch (error) {
  //     console.error('Error=', error);
  //   }
  // };

  // deleteFolder(`onlineUsers/${name}-${StudentID}/student`);
  return res.status(200).send({ message: "Succeed" });
}
