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
import { AddtoDropdown, ReadDropdown } from "../../controller/queries";

async function handler(req, res) {
  if (req.method !== "POST") {
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

  const tablename = incomingData.tablename;
  const itemsFr = incomingData.itemsFr;
  const itemsEn = incomingData.itemsEn;
  const itemsPromotion = incomingData.itemsPromotion;
  const eng = incomingData.eng;
  const fr = incomingData.fr;
  const promotion = "current_applicants_promotion";
  // console.log(tablename);
  //// console.log(tablename);
  //// console.log(tableid);
  if (!itemsEn) {
    res.status(422).json({
      message: "English value Empty!!",
    });
    return;
  }

  if (!itemsFr) {
    res.status(422).json({
      message: "french value Empty!!",
    });
    return;
  }
  if (tablename === "major") {
    if (!itemsPromotion) {
      res.status(422).json({
        message: "Promotion value Empty!!",
      });
      return;
    }
  }
  const connection = await connect();
  try {

    const existingtableID = await ReadDropdown(connection, tablename);
    if (!existingtableID) {
      return res.status(404).send({ message: "Table not found" });
    }
    // console.log('You entered here');
    if (tablename === "major") {
      await AddtoDropdown(
        tablename,
        [eng, fr, promotion],
        [itemsEn, itemsFr, itemsPromotion],
        connection
      );
      //// console.log(DeleteTable);
    } else {
      // console.log(
      //   await AddtoDropdown(
      //     tablename,
      //     [eng, fr],
      //     [itemsEn, itemsFr],
      //     connection
      //   )
      // );
    }
    res.status(200).json({
      message: `Insert data into Table was successful in the database table:${tablename}`,
    });
    await disconnect(connection);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to Insert table", error });
  }finally{
    await disconnect(connection);
  }
}
export default handler;
