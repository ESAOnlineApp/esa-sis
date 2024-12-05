/*
 * Created By:MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { connect, disconnect } from "../../../../utilities/db";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { ReadDropdown, UpdateAny } from "../../controller/queries";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Insert" });
  }

  const incomingData = JSON.parse(decrypt(req.body.data));
  // console.log(incomingData);
  if (!incomingData) {
    return res.status(400).send({ message: "Data not found in request body" });
  }
  const AutoSavingTime = incomingData.AutoSavingTime;
  const MaxCharacterCount = incomingData.MaxCharacterCount;
  const YearOfAquisitionLimit = incomingData.YearOfAquisitionLimit;
  const DisapearingMessageTime = incomingData.DisapearingMessageTime;
  const DOBMinDate = incomingData.DOBMinDate;
  const DOBMaxDate = incomingData.DOBMaxDate;
  const SingleFileUploadSize = incomingData.SingleFileUploadSize;
  const FileUploadTotalSize = incomingData.FileUploadTotalSize;
  const LoggerExpiryDay = incomingData.LoggerExpiryDay;
  const LoggerMaxFileSize = incomingData.LoggerMaxFileSize;

  const connection = await connect();
  try {

    const existingtableID = await ReadDropdown(connection, "setting");

    if (!existingtableID) {
      return res.status(404).send({ message: "Table not found" });
    }
    await UpdateAny(
      connection,
      "setting",
      "setting_name",
      "app",
      ["auto_Save_Timing", AutoSavingTime],
      ["max_characters_count", MaxCharacterCount],
      ["Year_of_Acquisition_Limit", YearOfAquisitionLimit],
      ["message_disapear_timing", DisapearingMessageTime],
      ["personalinfo_dob_min", DOBMinDate],
      ["personalinfo_dob_max", DOBMaxDate],
      ["upload_file_single_size", SingleFileUploadSize],
      ["upload_file_total_size", FileUploadTotalSize],
      ["logger_expiry_day", LoggerExpiryDay],
      ["logger_max_file_size", LoggerMaxFileSize]
    );
    //// console.log(DeleteTable);
    res.status(200).json({
      message: `Update values into Table Setting was successful in the database table`,
    });
    await disconnect(connection);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to Update table", error });
  }finally{
    await disconnect(connection);
  }
}

export default handler;
