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
  ReadDropdown,
  UpdateintoDropdown,
  UpdateintoDropdownformajor,
} from "../../controller/queries";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Signin Required To Insert" });
  }

  const incomingData = JSON.parse(decrypt(req.body.data));

  if (!incomingData) {
    return res.status(400).send({ message: "Data not found in request body" });
  }
  const tablename = incomingData.tablename;
  const tableid = incomingData.tableid;
  const id = incomingData.id;
  const itemsEn = incomingData.eng;
  const itemsFr = incomingData.fr;
  const itemsPromotion = incomingData.promotion;
  const columeng = incomingData.columeng;
  const columfr = incomingData.columfr;

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
    if (tablename === "major") {
      await UpdateintoDropdownformajor(
        tablename,
        tableid,
        itemsEn,
        itemsFr,
        itemsPromotion,
        columeng,
        columfr,
        id,
        connection
      );
      //// console.log(DeleteTable);
    } else {
      await UpdateintoDropdown(
        tablename,
        tableid,
        itemsEn,
        itemsFr,
        columeng,
        columfr,
        id,
        connection
      );
    }
    res.status(200).json({
      message: `Update value into Table was successful in the database table:${tablename}`,
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
