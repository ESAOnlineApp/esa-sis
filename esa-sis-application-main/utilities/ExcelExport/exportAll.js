/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: utilities\ExcelExport\exportAll.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import moment from "moment";
import selection_data from "../selection_data";
import axios from "axios";

async function exportAll(incomingData, session) {
  // if(Object.keys(usersExport).length > 0){
  // console.log("userExportexcel",typeof incomingData,incomingData)

  const allUsers = Object.values(incomingData).flat();
  // Combine all user arrays into a single array

  const selectedUsers = allUsers.map((user) => {
    user.create_time = moment(user.create_time).format("YYYY/MM/DD");
    user.update_time = moment(user.update_time).format("YYYY/MM/DD");
    // user.reportURL=user.firstname+" "+user.lastname+"'s Report";
    user.source = user.source.join(", ");
    return user;
  });

  // console.log("selectedUsers",selectedUsers)

  // Getting all the keys from the object and putting them in an array

  const allKeys = selectedUsers.reduce((uniqueKeys, user) => {
    Object.keys(user).forEach((key) => {
      if (!uniqueKeys.includes(key)) {
        uniqueKeys.push(key);
      }
    });
    return uniqueKeys;
  }, []);

  // const headerRow = allKeys.filter(key =>key !="password" && key !== "isVerified" && key !== "major" && key !== "appisSaved" && key !== "isreset");
  const excludedKeys = [
    "password",
    "isVerified",
    "major",
    "appisSaved",
    "isreset",
  ];

  const headerRow = allKeys.filter((key) => !excludedKeys.includes(key));

  const dataAll = [
    headerRow,
    ...selectedUsers.map((user) => headerRow.map((key) => user[key])),
  ];

  const ws = XLSX.utils.aoa_to_sheet(dataAll);

  //     const coulmnNames=getColumnNames(dataAll[0].length);

  // for (let i = 0; i < headerRow.length; i++) {
  //     const cell = coulmnNames[i] + '1';
  //     ws[cell].s = {  fill: { fgColor: { rgb: "FFFF0000" } }
  // }
  // }

  // get the number of columns in the worksheet
  const numCols = dataAll[0].length;
  const columnWidth = 20;
  const cols = Array(numCols).fill({ wch: columnWidth });
  ws["!cols"] = cols;

  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = XLSX.utils.encode_cell({ r: row, c: col });
      if (!ws[cell]) continue;
      ws[cell].s = { alignment: { horizontal: "center" } };
    }
  }

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const data = new Blob([excelBuffer], { type: fileType });
  // where you save this data?
  FileSaver.saveAs(
    data,
    `Students_Data_On_${moment().format("DD-MM-YYYY")}${fileExtension}`
  );

  const reportData = new FormData();
  reportData.append("file", data);
  const appReportName = `Students_Data_Report_On_${moment().format(
    "DD-MM-YYYY"
  )}-admin-${session.user.name}.xlsx`;
  const publicId = `admin/${appReportName}`;
  reportData.append("public_id", publicId);
  reportData.append("upload_preset", selection_data.upload_preset);
  try {
    const reportXLSX = await axios
      .post(selection_data.cloudinary_document_url, reportData)
      .then((res) => res.data.secure_url);
    return reportXLSX;
  } catch (err) {
    // console.log("error",err)
  }
}

export default exportAll;
