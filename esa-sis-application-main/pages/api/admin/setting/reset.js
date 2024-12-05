/*
 * Created By:MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { connect, disconnect } from "../../../../utilities/db";
//import decrypt from '../../../../utilities/encrypt_decrypt/decryptText';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]';
import { ReadDropdown, ResetSetting } from "../../controller/queries";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  //const session = await getServerSession(req, res, authOptions);

  //if (!session) {
  //  return res.status(401).send({ message: 'Signin Required To Reset' });
  //  }

  const connection = await connect();
  try {

    const existingtableID = await ReadDropdown(connection, "setting");

    if (!existingtableID) {
      return res.status(404).send({ message: "Table not found" });
    }
    await ResetSetting(connection);
    //// console.log(DeleteTable);
    res.status(200).json({
      message: `Reset values was successful`,
    });
    await disconnect(connection);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to Reset values", error });
  }finally{
    await disconnect(connection);
  }
}
export default handler;
