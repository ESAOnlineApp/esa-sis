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
import {
  //  DeletefromDropdown,
  findData,
} from "../../controller/queries";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Delete" });
  }

  const incomingData = JSON.parse(decrypt(req.body));
  //const incomingData = req.body.data;
  //const dataType = incomingData.dataType;
  // console.log(incomingData);
  if (!incomingData) {
    return res.status(400).send({ message: "Data not found in request body" });
  }

  const dataType = incomingData.dataType;

  //const id  = incomingData.id;
  const id = incomingData.id;
  //const tableid  = xss.inHTMLData(incomingData.tableid);
  const tableid = incomingData.tableid;
  const tablename = incomingData.tablename;
  //// console.log(id);
  //// console.log(dataType);
  //// console.log(tableid);
  if (!id) {
    res.status(422).json({
      message: "ID Empty!!",
    });
    return;
  }

  if (!dataType) {
    res.status(422).json({
      message: "dataType Empty!!",
    });
    return;
  }
  const connection = await connect();
  try {

    const existingtableID = await findData(connection, tableid, tablename, id);
    //// console.log(existingtableID);
    if (!existingtableID.result) {
      return res.status(404).send({ message: "Table not found" });
    }
    // const DeleteTable = await DeletefromDropdown(
    //   tablename,
    //   tableid,
    //   id,
    //   connection
    // );
    // console.log(DeleteTable);

    res.status(200).json({
      message: `Delete Table was successful in the database table:${dataType}`,
    });

    await disconnect(connection);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Failed to Delete table", error });
    //throw error;
  }finally{
    await disconnect(connection);
  }
}
export default handler;
