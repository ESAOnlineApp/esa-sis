/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: pages\api\controller\accountquery.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { executeQuery } from "../../../utilities/db";
// import crypto from 'crypto';
import bcryptjs from "bcryptjs";

//find user data from database and return true or flase

async function findUserData(connection, name, table, value) {
  try {
    const [result] = await executeQuery(
      connection,
      `select max(if(${name}=?,true,false)) AS result from ${table}`,
      [value]
    );

    return result;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

//create user account
async function newAccount(
  connection,
  user_id,
  email,
  password,
  profileUrl,
  major,
  role,
  firstname,
  lastname,
  mobile_number,
  extraMajorId
) {
  // let emailToken = crypto.randomBytes(64).toString('hex');
  password = bcryptjs.hashSync(password);

  try {
    await executeQuery(
      connection,
      "insert into user_profile(user_id,email,password,major,role,status,isVerified,emailToken,appisSaved,application_Language) value(?,?,?,?,?,'incomplete',1,null,0,'en-US')",
      [user_id, email, password, major, role]
    );
    await executeQuery(
      connection,
      "insert into user_personal_info values(?,1,?,'',?,'','',1,null,'','','',1,'','')",
      [user_id, firstname, lastname]
    );
    await executeQuery(
      connection,
      "insert into user_contact_info values(?,'',?,'')",
      [user_id, mobile_number]
    );
    await executeQuery(
      connection,
      "insert into user_document values(?,null,null,?,null,null,null,null,null,null)",
      [user_id, profileUrl]
    );

    for (let i = 0; i < extraMajorId.length; i++) {
      await executeQuery(
        connection,
        "insert into user_extra_major values(?,?)",
        [user_id, extraMajorId[i].major_id]
      );
    }
  } catch (error) {
    console.log("error in the accountquery file : ", error); return;
  }
}

//find major id
async function findmajor_id(connection, major_program) {
  try {
    let [UserData] = await executeQuery(
      connection,
      "SELECT major.major_id from major where major.program=?",
      [major_program]
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function DeleteAccountBYID(ID, tables, connection) {
  try {
    let results = [];
    for (const table of tables) {
      let UserData = await executeQuery(
        connection,
        `Delete from ${table} where user_id=?`,
        [ID]
      );
      results.push(UserData);
    }
    return results;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function UpdateIsUnVerified(connection, user_id, isVerified) {
  try {
    let UserData = await executeQuery(
      connection,
      "UPDATE user_profile SET isVerified='0' where user_id=?",
      [user_id, isVerified]
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function UpdateIsVerified(connection, user_id, isVerified) {
  try {
    let UserData = await executeQuery(
      connection,
      "UPDATE user_profile SET isVerified='1' where user_id=?",
      [user_id, isVerified]
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function UpdateData(connection, table, whereValue, ...columnValuePairs) {
  try {
    let query = `UPDATE ${table} SET `;
    let values = [];

    columnValuePairs.forEach((pair, index) => {
      query += `${pair[0]} = ?`;
      if (index !== columnValuePairs.length - 1) {
        query += ", ";
      }
      values.push(pair[1]);
    });

    query += ` WHERE user_id= ?`;
    values.push(whereValue);
    const result = await executeQuery(connection, query, values);

    return result;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function findData(connection, table) {
  try {
    const query = `SELECT * FROM ${table}`;
    const result = await executeQuery(connection, query);

    return result;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function findextramajor(connection, user_id) {
  try {
    let UserData = await executeQuery(
      connection,
      "SELECT * from user_extra_major where user_id=?",
      [user_id]
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}

async function findemajor_user(connection, user_id) {
  try {
    let [UserData] = await executeQuery(
      connection,
      "SELECT * from user_profile where user_id=?",
      [user_id]
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}
async function FilterDataExport(connection, table, wherevalues) {
  try {
    let query = `Select * from ${table} ${wherevalues}`;

    const result = await executeQuery(connection, query);

    return result;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}
async function UpdateUserpassword(connection, password, userid) {
  /*  user will be taken from a session userid  */

  password = bcryptjs.hashSync(password);
  try {
    let UserData = await executeQuery(
      connection,
      `UPDATE users SET userpassword = '${password}' WHERE  userid = '${userid}'`
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}
// async function UpdateadminInfo(connection ,table , condition , em , name , email){
//   // console.log(table);
//   // console.log(condition);
//   // console.log(name);
//   // console.log(em);
//   // console.log(email)
//   try {
//     let userdata = await executeQuery(connection ,
//       `UPDATE '${table}' SET '${condition}' = '${name}' WHERE '${em}' ='${email}' `,
//       );
//      consolele.log(userdata)
//     return userdata;
//   } catch (error) {
//     console.log("error in the accountquery file : ", error); return
//   }
// }

async function UpdateadminInfo(connection, name, lname, email) {
  try {
    let userdata = await executeQuery(
      connection,
      `UPDATE admin SET admin_firstname = '${name}' ,  admin_lastname='${lname}' WHERE adminemail ='${email}' `
    );
    return userdata;
  } catch (error) {
    console.log("error in the accountquery file : ", error); return;
  }
}
async function Userinfo(connection, userid) {
  try {
    let UserData = await executeQuery(
      connection,
      `select * from user_document where userid = '${userid}'`
    );
    return UserData;
  } catch (err) {
    console.log("error in the accountquery file : ", err); return;
  }
}
async function updateUser(connection, table, condition, column, value, id) {
  // console.log(value)
  try {
    let sql = `UPDATE ${table} SET ${column} = '${value}' WHERE ${condition} = '${id}'`;
    const data = await executeQuery(connection, sql);
    return data;
  } catch (error) {
    console.log("error in the accountquery file : ", error); return;
  }
}

export {
  findUserData,
  newAccount,
  UpdateadminInfo,
  Userinfo,
  updateUser,
  UpdateUserpassword,
  findmajor_id,
  DeleteAccountBYID,
  UpdateIsUnVerified,
  UpdateIsVerified,
  UpdateData,
  findData,
  findextramajor,
  findemajor_user,
  FilterDataExport,
};
