/*
 * Created By:
 * Project: SIS Application
 * File: pages\api\controller\queries.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

const { executeQuery } = require("../../../utilities/db");

const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
// const { executeQuery } = require('../../../utilities/db');

// async function current_applicant_promotion(major_id, user_id, connection) {
//   try {
//     let [result] = await executeQuery(
//       connection,
//       'select major.current_applicants_promotion from major inner join user_profile where user_profile.major=major.major_id and major.major_id=? and user_profile.user_id=?',
//       [major_id, user_id]
//     );
//     return result;
//   } catch (err) {
//     console.log("error in the query file : ", err); return;
//   }
// }

/* Start Postegresql */
/**
 * It finds Data from the databasevand returns true or false
 * </code>
 */
// "users",
// "program_manager",
// "userid",
// "pm_id",
// "pm_email",
// email
async function findDataForResetPassword(
  connection,
  table,
  fromTable,
  userid1,
  userId2,
  where,
  columnName
) {
  try {
    let result =
      connection.query(`SELECT ${table}.*, ${fromTable}.* from ${table} 


    LEFT JOIN  ${fromTable} ON  ${fromTable}.${userid1} =  ${table}.${userId2} WHERE users.${where} = '${columnName}'`);

    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function findData(connection, table, where, columnName) {
  try {
    let result = await connection.query(
      `SELECT * from ${table} WHERE ${where} = '${columnName}'`
    );
    // console.log('the result : ', result)
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function newEmailToken(connection, userid) {
  let emailToken = crypto.randomBytes(64).toString("hex");
  try {
    let query = `
    UPDATE users
    SET token = '${emailToken}'
    WHERE userid = '${userid}'`;
    console.log('query', query)

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function UpdateToken(connection, emailToken) {
  try {
    let UserData = await executeQuery(
      connection,
      "UPDATE users set token=null where token=?",
      [emailToken]
    );

    return UserData;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function Userinfo(connection, email) {
  try {
    let result = connection.query(`SELECT users.*, user_contact.* from users 
    LEFT JOIN user_contact ON
	user_contact.userid = users.userid WHERE user_contact.email = '${email}'`);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function newpassword(connection, email, newPassword) {
  let password = bcryptjs.hashSync(newPassword);
  try {
    let query = `
    UPDATE users
    SET userpassword = '${password}'
    WHERE userid = '${email}'`;
    console.log('test', query)

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function getCourseMajor(connection) {
  try {
    let result =
      connection.query(`SELECT courses.course_id, courses.course_name, courses.course_credit, course_type,COALESCE(major.major_name, '') AS major_name
    FROM courses
    LEFT JOIN major ON courses.major_id = major.major_id;`);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// course
async function updateCourse(connection, course_id, major_name) {
  try {
    let result = connection.query(`UPDATE courses
    SET major_id = (
      SELECT major_id
      FROM major
      WHERE major_name = '${major_name}'
    ) 
    WHERE course_id = '${course_id}'`);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// Create Class
async function createClass(
  connection,
  course_id,
  teacher_id,
  promotion,
  startdate,
  enddate,
  pm_id,
  major_id
) {
  try {
    const query = ` INSERT INTO tmpclass (course_id , teacher_id, promotion, startdate, enddate, pm_id, major_id) VALUES ('${course_id}','${teacher_id}','${promotion}','${startdate}','${enddate}', '${pm_id}', '${major_id}') `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// Copy Class
async function copyClass(
  connection,
  course_id,
  teacher_id,
  promotion,
  startdate,
  enddate,
  pm_id,
  major_id
) {
  try {
    const query = ` INSERT INTO tmpclass (course_id , teacher_id, promotion, startdate, enddate, pm_id, major_id) VALUES ('${course_id}','${teacher_id}','${promotion}','${startdate}','${enddate}', '${pm_id}', '${major_id}') 
    RETURNING tmpclass_id;`;
    const res = await connection.query(query);
    return res.rows[0].tmpclass_id;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function insertPromotion(connection, table, columns, values) {
  try {
    const columnList = columns.join(", ");
    const valueList = values.map((val) => `'${val}'`).join(", ");
    const result = await connection.query(
      `INSERT INTO ${table} (${columnList}) VALUES (${valueList}) 
      ON CONFLICT (promotion_name) DO NOTHING`
    );
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function getClassDetails(connection, tmpclass_id) {
  try {
    const query = ` SELECT * FROM tmpclass WHERE tmpclass_id = '${tmpclass_id}'`;
    const result = connection.query(query);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createSchedule(
  connection,
  classId,
  days,
  fromTime,
  toTime,
  room,
  pmID,
  attendanceId,
  isOnline
) {
  try {
    let res = null;
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const query = `
        INSERT INTO tmpschedule (class_id, day, from_time, to_time, room, pm_id , attendance_id ,is_online)
        VALUES ($1, $2, $3, $4, $5, $6 , $7 , $8) RETURNING tmpschedule_id
      `;
      res = await connection.query(query, [
        classId,
        day,
        fromTime,
        toTime,
        room,
        pmID,
        attendanceId,
        isOnline
      ]);

    }
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updateZoomInfo(connection, tmpscheduleIds, meetingIds, zoomUrls) {
  console.log('query', tmpscheduleIds, meetingIds, zoomUrls)
  try {


    const query = `
        UPDATE tmpschedule
        SET
          zoom_meeting_id =${meetingIds},
          zoom_url = '${zoomUrls}'
        WHERE tmpschedule_id = ${tmpscheduleIds};
      `;
    console.log(query)
    const res = await connection.query(query)
    return res
  } catch (error) {
    return { success: false, message: `Error updating: ${error.message}` };
  }
}

// GET course based on course_id and major_name
async function createScheduleOnline(
  connection,
  classId,
  days,
  fromTime,
  toTime,
  room,
  pmID,
  attendanceId,
  isOnline
) {
  try {
    let createdRowIds = [];
    let result = null;
    let day = null;
    let query = null;
    for (let i = 0; i < days.length; i++) {
      day = days[i];
      query = `
        INSERT INTO tmpschedule (class_id, day, from_time, to_time, room, pm_id, attendance_id, is_online)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING tmpschedule_id;
      `;
      result = await connection.query(query, [
        classId,
        day,
        fromTime,
        toTime,
        room,
        pmID,
        attendanceId,
        isOnline,
      ]);

      // console.log('in the result')
      // console.log(result)
      // Extract the ID from the result and add it to the array
      createdRowIds.push(result.rows[0].tmpschedule_id);
      console.log('in query  ')
      console.log(createdRowIds)
    }

    // Return the array of created IDs
    if (createdRowIds.length === days.length) {
      return createdRowIds;
    } else {
      return 'false'
    }
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function filterCourseMajor(connection, course_id, major_name) {
  try {
    let query = `
    SELECT c.course_id, c.course_name, c.course_credit, m.major_name , c.course_type
    FROM courses c
    LEFT JOIN major m ON c.major_id = m.major_id
    WHERE 
      (c.course_id = '${course_id}' OR '${course_id}' = '') 
      AND
      (m.major_name = '${major_name}' OR '${major_name}' = '') 
      AND
      (m.major_name != '' OR c.major_id IS NULL);
    ;`;
    const result = await connection.query(query);
    return result;
    // return `couse id: ${course_id} major name: ${major_name}`
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// eslint-disable-next-line no-unused-vars
async function UpdateData(connection, table, whereValue, ...columnValuePairs) {
  // try {
  //   let query = `UPDATE ${table} SET `;
  //   let values = [];
  //   columnValuePairs.forEach((pair, index) => {
  //     query += `${pair[0]} = ?`;
  //     if (index !== columnValuePairs.length - 1) {
  //       query += ', ';
  //     }
  //     values.push(pair[1]);
  //   });
  //   query += ` WHERE user_id= ?`;
  //   values.push(whereValue);
  //   const result = await executeQuery(connection, query, values);
  //   return result;
  // } catch (err) {
  //   console.log("error in the query file : ", err); return;
  // }
}

// eslint-disable-next-line no-unused-vars
async function UpdateActivityTime(userid, connection) {
  // try {
  //   const result = await executeQuery(
  //     connection,
  //     'UPDATE users SET users.update_time = CURRENT_TIMESTAMP WHERE userid = ?',
  //     [userid]
  //   );
  //   return result;
  // } catch (err) {
  //   console.log("error in the query file : ", err); return;
  // }
}

// insert to the database as much as you like columns and values
async function insertData(connection, table, columns, values) {
  try {
    const columnList = columns.join(", ");
    const valueList = values.map((val) => `'${val}'`).join(", ");
    const result = await connection.query(
      `INSERT INTO ${table} (${columnList}) VALUES (${valueList})`
    );
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// get all data from specific column
async function getAll(connection, table) {
  try {
    const result = connection.query(`SELECT * from ${table}`);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// get the major of the program manager
async function getMajorPM(connection, majorID) {
  try {
    const result = await connection.query(`SELECT *
    FROM major
    WHERE major_id = '${majorID}'
    AND major_name LIKE 'EXED%'`);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getPromotionByMajorId(connection, majorID){
  try{
    const result = await connection.query(`SELECT *
    FROM promotions
    WHERE major_id = '${majorID}'`)
    return result;
  }catch(error){
    console.log("error in the query file : ", error);
    return;
  }
}

// get the emails based on major id
const getEmailsByMajorId = async (connection, majorId, promotionValue) => {
  try {
    const result = await connection.query(
      `
      SELECT uc.email ,uc.userid
      FROM user_contact uc
      JOIN student s ON uc.userid = s.student_id
      WHERE s.major_id = $1
      AND s.promotion = $2
    `,
      [majorId, promotionValue]
    );
    console.log(majorId, "  ====  ",promotionValue)
console.log('the result : ', result)
    return result.rows;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
};

// insert notification
const insertNotifications = async (
  connection,
  receiverIds,
  senderId,
  content,
  subject
) => {
  try {
    // Insert notifications for each receiver ID
    const result = await connection.query(
      `
      INSERT INTO notifications (receiver_id, sender_id, content, subject, date, viewed)
      SELECT
        receiver_id,
        $2 as sender_id,
        $3 as content,
        $4 as subject,
        current_timestamp as date,
        false as viewed
      FROM UNNEST($1::character varying[]) AS receiver_id;
    `,
      [receiverIds, senderId, content, subject]
    );

    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
};

// get the count of unviewed notification

const countNotification = async (connection, receiver_id) => {
  try {
    const result = await connection.query(
      `
    SELECT COUNT(*)
    FROM notifications
    WHERE viewed = false AND receiver_id = $1;
    `,
      [receiver_id]
    );
    return result.rows[0].count;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
};

// get the emails with the sender info

const getEmailsSender = async (connection, receiver_id) => {
  try {
    const result = connection.query(
      `
    SELECT
    nt.*,
    CASE
      WHEN nt.sender_id IS NOT NULL THEN pm.pm_firstname
      ELSE null
    END AS pm_firstname,
    CASE
      WHEN nt.sender_id IS NOT NULL THEN pm.pm_lastname
      ELSE null
    END AS pm_lastname
  FROM notifications nt
  LEFT JOIN program_manager pm ON nt.sender_id = pm.pm_id
  WHERE nt.receiver_id = $1
  ORDER BY nt.date DESC;  
    `,
      [receiver_id]
    );
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
};

// update the notifications based on receiver_id

const changeViewed = async (connection, receiver_id) => {
  try {
    const result = connection.query(
      `
    UPDATE notifications
    SET viewed = true
    WHERE receiver_id = $1 AND viewed = false;`,
      [receiver_id]
    );
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
};
// get all data from specific column
async function getAllById(connection, table, colName, val) {
  try {
    const result = connection.query(
      `SELECT * from ${table} Where ${colName} = '${val}' `
    );
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// get schedule based on class_id
async function getScheduleByPM(connection, pmID) {
  try {
    const result = connection.query(`
  SELECT
  tmpschedule.*,
  courses.*,
  teachers.*,
  rooms.*
  FROM
    tmpschedule
  JOIN
    tmpclass ON tmpclass.tmpclass_id = tmpschedule.class_id
  JOIN
    courses ON courses.course_id = tmpclass.course_id
  JOIN
    teachers ON teachers.teacher_id = tmpclass.teacher_id
  JOIN 
    rooms ON rooms.room_id = tmpschedule.room
  WHERE
    tmpclass.major_id = '${pmID}';
    `);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// delete
async function deleteByID(connection, table, colName, id) {
  try {
    const result = connection.query(
      `Delete FROM ${table} WHERE ${colName} = ${id}`
    );
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// Add Schedule
async function addSchedule(
  connection,
  classID,
  day,
  fromTime,
  toTime,
  room_id,
  pm_id,
  attendanceId,
  isOnline
) {
  try {
    // classID, day, fromTime, toTime, room_id, pm_id
    const result = connection.query(
      `INSERT INTO tmpschedule (day, from_time, to_time, room, pm_id,class_id , attendance_id , is_online) VALUES 
      ('${day}','${fromTime}','${toTime}', ${room_id}, '${pm_id}' , ${classID} , '${attendanceId}' , '${isOnline}')`
    );
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// copy Schedule
async function copySchedule(connection, classID, newClassID) {
  try {
    const query = `INSERT INTO tmpschedule (class_id, day, from_time, to_time, room, pm_id)
    SELECT $1, to_char(day::date + INTERVAL '1 year', 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS day, from_time, to_time, room, pm_id
    FROM tmpschedule
    WHERE class_id = ${classID};`;
    const classId = newClassID;
    let res = await connection.query(query, [classId]);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// update Schedule
async function updateSchedule(
  connection,
  classID,
  day,
  fromTime,
  toTime,
  room_id,
  pm_id,
  tmpscheduleID,
  is_online
) {
  try {
    const query =
      "UPDATE tmpschedule SET class_id = $1, day = $2, from_time = $3, to_time = $4, room = $5, pm_id = $6 ,is_online=$7 WHERE tmpschedule_id = $8";
    const values = [
      classID,
      day,
      fromTime,
      toTime,
      room_id,
      pm_id,
      is_online,
      tmpscheduleID

    ];
    // console.log('query' , query , values)
    const res = await connection.query(query, values);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// filter search of student
// async function filterStudent(connection, id, firstname, lastname, major, promotion, status){
//   try{
//     const result = connection.query(`SELECT * from student WHERE student_id = '${id}' AND student_firstname = '${firstname}' AND student_lastname = '${lastname}' AND major_id = ${major} AND promotion = '${promotion}' AND status ='${status}'`)
//     return result;
//   }catch(err){
//     console.log("error in the query file : ", err); return
//   }
// }
// async function filterStudent(connection, id, firstname, lastname, major, promotion, status) {
//   try {
//     let query = `SELECT * FROM student WHERE 1=1`;

//     if (id != 'all') {
//       query += ` AND lower(trim(student_id)) LIKE lower(trim('%${id}%'))`;
//     }
//     if (firstname != 'all') {
//       query += ` AND lower(trim(student_firstname)) LIKE lower(trim('%${firstname}%'))`;
//     }
//     if (lastname != 'all') {
//       query += ` AND lower(trim(student_lastname)) LIKE lower(trim('%${lastname}%'))`;
//     }
//     if (major != 'all') {
//       query += ` AND major_id = ${major}`;
//     }
//     if (promotion != 'all') {
//       query += ` AND promotion = '${promotion}'`;
//     }
//     if (status != 'all') {
//       query += ` AND status = '${status}'`;
//     }

//     const result = await connection.query(query);
//     return result;
//   } catch (err) {
//     console.log("error in the query file : ", err); return;
//   }
// }

async function filterStudent(
  connection,
  id,
  firstname,
  lastname,
  major,
  promotion,
  status
) {
  try {
    let query = `
      SELECT student.*, major.major_name, user_contact.email, user_contact.mobile_number
      FROM student
      LEFT JOIN major ON student.major_id = major.major_id
      LEFT JOIN user_contact ON student_id = user_contact.userid
      WHERE student.major_id = '${major}'`;

    if (id.trim() != "") {
      query += ` AND lower(trim(student_id)) LIKE lower(trim('%${id}%'))`;
    }
    if (firstname.trim() != "") {
      query += ` AND lower(trim(student_firstname)) LIKE lower(trim('%${firstname}%'))`;
    }
    if (lastname.trim() != "") {
      query += ` AND lower(trim(student_lastname)) LIKE lower(trim('%${lastname}%'))`;
    }
    if (promotion.trim() != "") {
      query += ` AND promotion = '${promotion}'`;
    }
    if (status.trim() != "") {
      query += ` AND student.status = '${status}'`;
    }
    // if (phoneNumber.trim() != '') {
    //   query += ` AND user_contact.mobile_number = '${phoneNumber}'`;
    // }
    console.log(query)

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function filterTeacher(
  connection,
  id,
  firstname,
  lastname,
  email,
  courseid
) {
  try {
    let query = `
      SELECT * FROM teachers
      WHERE 1=1`;

    if (id != "") {
      query += ` AND teacher_id = '${id}'`;
    }
    if (firstname.trim() != "") {
      query += ` AND lower(trim(teacher_firstname)) LIKE lower(trim('%${firstname}%'))`;
    }
    if (lastname.trim() != "") {
      query += ` AND lower(trim(teacher_lastname)) LIKE lower(trim('%${lastname}%'))`;
    }
    if (email != "") {
      query += ` AND lower(trim(teacher_mail)) LIKE lower(trim('%${email}%'))`;
    }
    if (courseid.trim() != "") {
      query += ` AND lower(trim(course_id)) LIKE lower(trim('%${courseid}%'))'`;
    }

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// get the user and the teacher info
async function getUserTeacher(connection, pmID) {
  try {
    let query = `SELECT 
    tmpclass.*, 
    teachers.*
    FROM 
    tmpclass
    JOIN
    teachers ON teachers.teacher_id = tmpclass.teacher_id
    WHERE 
    tmpclass.major_id = '${pmID}'
    `;
    const result = await connection.query(query);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//<<<<<<< batoul
//async function ReadDropdown(connection, table) {
//  try {
//    const query = `SELECT * FROM ${table}`;
//    const result = await executeQuery(connection, query, []);
//=======

async function filterCourses(
  connection,
  course_id,
  course_name,
  course_credit,
  major_id,
  course_type
) {
  try {
    let query = `
    SELECT  courses .* , major.major_name
    FROM courses
    INNER JOIN major ON courses.major_id = major.major_id
    WHERE major.major_id ='${major_id}'`;

    if (course_id != "") {
      query += ` AND lower(trim(course_id)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (course_name.trim() != "") {
      query += ` AND lower(trim(course_name)) LIKE lower(trim('%${course_name}%'))`;
    }
    if (course_credit != "") {
      query += ` AND courses.course_credit = ${course_credit}`;
    }
    if (course_type != "") {
      query += ` AND courses.course_type = '${course_type}'`;
    }

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function getAllCourses(connection, course_id, major_id) {
  try {
    const query = `SELECT * FROM courses WHERE course_id ='${course_id}' AND major_id='${major_id}'`;
    const res = connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//filter attendance
async function filterAttendances(
  connection,
  attendance_id,
  teacher_id,
  major_id,
  course_id,
  attendance_date,
  present,
  teacher_firstname,
  teacher_lastname,
  major_name
) {
  try {
    let query = `SELECT attendance_report .* ,  major.major_name , teachers.teacher_firstname , teachers.teacher_lastname ,courses.course_name
    FROM attendance_report
    INNER JOIN teachers ON attendance_report.teacher_id = teachers.teacher_id
    INNER JOIN major ON attendance_report.major_id = major.major_id 
    INNER JOIN courses ON attendance_report.course_id = courses.course_id
    WHERE attendance_report.major_id = '${major_id}'  
    `;

    if (attendance_id != "") {
      query += ` AND attendance_id = '${attendance_id}'`;
    }
    if (teacher_id != "") {
      query += ` AND teachers.teacher_id = '${teacher_id}'`;
    }
    if (teacher_firstname) {
      query += ` AND lower(trim(teachers.teacher_firstname)) LIKE lower(trim('%${teacher_firstname}%')) `;
    }
    if (teacher_lastname) {
      query += ` AND lower(trim(teachers.teacher_lastname)) LIKE lower(trim('%${teacher_lastname}%'))`;
    }
    if (major_name) {
      query += ` AND lower(trim(major.major_name) LIKE lower(trim('%${major_name}%'))`;
    }
    if (course_id != "") {
      query += ` AND lower(trim(attendance_report.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (attendance_date != "") {
      query += ` AND attendance_date = '${attendance_date}'`;
    }
    if (present != "") {
      query += ` AND present = '${present}'  `;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getCourse(connection, table, where, id) {
  try {
    let query = `SELECT * FROM ${table} WHERE ${where}='${id}'`;

    const response = await connection.query(query);
    return response;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// get course_id in table teacher_courses use in function exist

async function getExistCourse(connection, course_id, teacher_idC, major_id) {
  try {
    let query = `SELECT teacher_courses .*  , courses.major_id FROM teacher_courses 
    INNER JOIN courses ON  teacher_courses.course_id = courses.course_id
    WHERE teacher_courses.course_id ='${course_id}' AND  teacher_courses.teacher_id='${teacher_idC}' AND major_id='${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getTeachersByMajorCourse(connection) {
  try {
    let query = `SELECT  teachers.teacher_id ,concat(teachers.teacher_firstname ,' ', teachers.teacher_lastname) AS teacher_fullname 
    from teachers 
    `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getTeachersCourses(connection, teacher_id, course_id, major_id) {
  try {
    const query = `SELECT teacher_courses .* , courses.major_id FROM teacher_courses
    INNER JOIN courses ON teacher_courses.course_id = courses.course_id
    WHERE teacher_id='${teacher_id}' AND teacher_courses.course_id ='${course_id}' AND courses.major_id='${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updatePresent(connection, present, student_id, attendance_id) {
  try {
    const query = `UPDATE attendance SET present = ${present} 
    
    WHERE student_id = '${student_id}' AND attendance_id = '${attendance_id}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getAllStudent(connection, major_id, promotion) {
  try {
    const query = `SELECT student.* , users.access_token ,user_contact.email FROM student 
    INNER JOIN users ON student.student_id = users.userid
    INNER JOIN user_contact ON student.student_id = user_contact.userid
    WHERE student.major_id = '${major_id}' AND (trim(student.promotion)) = '${promotion}' AND student.status != 'Alumni'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file in getAllStudent function : ", error); return;
  }
}
//insert data to attendance_table
async function createAttendanceStudent(connection, student_id, attendance_id) {
  try {
    const query = `INSERT INTO attendance (attendance_id , student_id) 
    VALUES ('${attendance_id}' , '${student_id}')`;
    const res = await connection.query(query);
    // console.log("[[[[[[[[[[[[[[[",res.lastrowid)
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//select
async function createAttendance(
  connection,
  teacher_id,
  course_id,
  major_id,
  attendance_date
) {
  try {
    const query = ` INSERT INTO attendance_report (teacher_id , course_id , major_id, attendance_date) VALUES ('${teacher_id}','${course_id}','${major_id}','${attendance_date}') RETURNING attendance_id `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error);
    return;
  }
}
async function AttendanceView(connection, attendance_id) {
  try {
    const query = ` SELECT attendance .* ,  student.student_firstname , student.student_lastname, courses.course_name
    FROM attendance 
    INNER JOIN student ON attendance.student_id = student.student_id 
	  INNER JOIN attendance_report ON attendance.attendance_id = attendance_report.attendance_id
	  INNER JOIN courses ON attendance_report.course_id = courses.course_id
    WHERE attendance.attendance_id = '${attendance_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getAttendanceByCTD(
  connection,
  teacher_id,
  course_id,
  attendance_date
) {
  try {
    const query = `SELECT * FROM attendance_report 
    WHERE teacher_id = '${teacher_id}' AND course_id = '${course_id}' AND attendance_date = '${attendance_date}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterpm(
  connection,
  pm_id,
  pm_firstname,
  pm_lastname,
  pm_email,
  pm_status,
  majorName
) {
  try {
    let query = `
    SELECT 
    pm.pm_id, 
    pm.pm_firstname, 
    pm.pm_lastname, 
    pm.pm_status, 
    pm.pm_email, 
    major.major_name AS pm_major_name, 
    STRING_AGG(extra_major.major_name, ', ') AS concatenated_major_names,
    CONCAT(major.major_name, 
           CASE WHEN STRING_AGG(extra_major.major_name, ', ') IS NOT NULL THEN ', ' ELSE '' END, 
           STRING_AGG(extra_major.major_name, ', ')) AS combined_major_names
FROM 
    program_manager pm
LEFT JOIN 
    program_manager_extra_major pmem ON pm.pm_id = pmem.pm_id
INNER JOIN 
    major ON pm.major_id = major.major_id
LEFT JOIN 
    major AS extra_major ON pmem.major_id = extra_major.major_id
    WHERE 
        1 = 1
    `;

    if (pm_id.trim() != "") {
      query += ` AND lower(trim(pm.pm_id)) LIKE lower(trim('%${pm_id}%'))`;
    }
    if (pm_firstname.trim() != "") {
      query += ` AND lower(trim(pm.pm_firstname)) LIKE lower(trim('%${pm_firstname}%'))`;
    }
    if (majorName.trim() != "") {
      query += `
        AND (
          lower(trim(major.major_name)) LIKE lower(trim('%${majorName}%')) OR
          lower(trim(extra_major.major_name)) LIKE lower(trim('%${majorName}%'))
        )
      `;
    }
    if (pm_lastname.trim() != "") {
      query += ` AND lower(trim(pm.pm_lastname)) LIKE lower(trim('%${pm_lastname}%'))`;
    }
    if (pm_email.trim() != "") {
      query += ` AND lower(trim(pm.pm_email)) LIKE lower(trim('%${pm_email}%'))`;
    }
    if (pm_status.trim() != "") {
      query += ` AND pm.pm_status = '${pm_status}'`;
    }

    query += `
    GROUP BY 
    pm.pm_id, 
    pm.pm_firstname, 
    pm.pm_lastname, 
    pm.pm_status, 
    pm.pm_email, 
    major.major_name
    `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err);
    return;
  }
}




async function filterassistance(
  connection,
  pm_ass_id,
  pm_ass_firstname,
  pm_ass_lastname,
  pm_ass_email,
  pm_ass_status,
  majorName
) {
  try {
    let query = `
    SELECT 
    pm_ass.*, 
    major.major_name AS pm_ass_major_name, 
    string_agg(extra_major.major_name, ', ') AS concatenated_major_names,
    CONCAT(major.major_name, ', ', string_agg(extra_major.major_name, ', ')) AS combined_major_names
FROM 
    (
        SELECT 
            program_manager_assistance.*, 
            program_manager_assistance_extra_major.major_id AS extra_major_id
        FROM 
            program_manager_assistance 
        LEFT JOIN 
            program_manager_assistance_extra_major ON program_manager_assistance.pm_ass_id = program_manager_assistance_extra_major.pm_ass_id
        WHERE 
            1 = 1
    ) AS pm_ass
INNER JOIN 
    major ON pm_ass.major_id = major.major_id
LEFT JOIN 
    major AS extra_major ON pm_ass.extra_major_id = extra_major.major_id
WHERE 
    1 = 1
    `;

    if (pm_ass_id.trim() != "") {
      query += ` AND lower(trim(pm_ass.pm_ass_id)) LIKE lower(trim('%${pm_ass_id}%'))`;
    }
    if (pm_ass_firstname.trim() != "") {
      query += ` AND lower(trim(pm_ass.pm_ass_firstname)) LIKE lower(trim('%${pm_ass_firstname}%'))`;
    }
    if (majorName.trim() != "") {
      query += `
        AND (
          lower(trim(major.major_name)) LIKE lower(trim('%${majorName}%')) OR
          lower(trim(extra_major.major_name)) LIKE lower(trim('%${majorName}%'))
        )
      `;
    }
    if (pm_ass_lastname.trim() != "") {
      query += ` AND lower(trim(pm_ass.pm_ass_lastname)) LIKE lower(trim('%${pm_ass_lastname}%'))`;
    }
    if (pm_ass_email.trim() != "") {
      query += ` AND lower(trim(pm_ass.pm_ass_email)) LIKE lower(trim('%${pm_ass_email}%'))`;
    }
    if (pm_ass_status.trim() != "") {
      query += ` AND pm_ass.pm_ass_status = '${pm_ass_status}'`;
    }

    query += `
      GROUP BY 
          pm_ass.pm_ass_id, pm_ass.pm_ass_firstname, pm_ass.pm_ass_lastname, pm_ass.pm_ass_status, pm_ass.pm_ass_email, pm_ass.major_id, major.major_name, pm_ass.extra_major_id
    `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err);
    return;
  }
}



async function filterStudentForResetPassword(
  connection,
  studentid,
  studentemail,
  student_firstname,
  student_lastname,
  student_status,
  majorID
) {
  try {
    let query = `
    SELECT student.*, user_contact.email
    FROM student
    JOIN user_contact ON student.student_id = user_contact.userid
      WHERE 1=1`;
    if (studentid.trim() != "") {
      query += ` AND lower(trim(student.student_id)) LIKE lower(trim('%${studentid}%'))`;
    }
    if (studentemail.trim() != "") {
      query += ` AND lower(trim(user_contact.email)) LIKE lower(trim('%${studentemail}%'))`;
    }
    if (student_firstname.trim() != "") {
      query += ` AND lower(trim(student.student_firstname)) LIKE lower(trim('%${student_firstname}%'))`;
    }
    if (student_lastname.trim() != "") {
      query += ` AND lower(trim(student.student_lastname)) LIKE lower(trim('%${student_lastname}%'))`;
    }
    if (majorID != "" && majorID != null) {
      query += ` AND student.major_id='${majorID}'`;
    }
    if (student_status != "") {
      query += ` AND student.status='${student_status}'`;
    }
    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function filterAdmin(
  connection,
  adminid,
  adminemail,
  admin_firstname,
  admin_lastname,
  admin_status
) {
  try {
    let query = `
      SELECT * FROM Admin
      WHERE 1=1`;
    if (adminid.trim() != "") {
      query += ` AND lower(trim(adminid)) LIKE lower(trim('%${adminid}%'))`;
    }
    if (adminemail.trim() != "") {
      query += ` AND lower(trim(adminemail)) LIKE lower(trim('%${adminemail}%'))`;
    }
    if (admin_firstname.trim() != "") {
      query += ` AND lower(trim(admin_firstname)) LIKE lower(trim('%${admin_firstname}%'))`;
    }
    if (admin_lastname.trim() != "") {
      query += ` AND lower(trim(admin_lastname)) LIKE lower(trim('%${admin_lastname}%'))`;
    }
    if (admin_status != "") {
      query += ` AND admin_status='${admin_status}'`;
    }

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function UpdateAdminStatus(connection, admin_status, adminid) {
  try {
    let query = `UPDATE admin
    SET admin_status = '${admin_status}'
    WHERE adminid = '${adminid}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateStatusPM(connection, pm_id, pm_status) {
  try {
    let query = `
    UPDATE program_manager
    SET pm_status = '${pm_status}'
    WHERE pm_id = '${pm_id}'`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function updateStatusAssistance(connection, pm_ass_id, pm_ass_status) {
  try {
    let query = `
    UPDATE program_manager_assistance
    SET pm_ass_status = '${pm_ass_status}'
    WHERE pm_ass_id = '${pm_ass_id}'`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function enableUserpm(connection, pm_id, userpassword) {
  try {
    let query = `
      INSERT INTO users(userid ,role , userpassword)
        VALUES('${pm_id}', 2, '${userpassword}');
        INSERT INTO user_document(userid, profileurl)
        VALUES('${pm_id}', '')
        `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function enableUserAdmin(connection, adminid, userpassword) {
  try {
    let query = `
      INSERT INTO users(userid ,role , userpassword)
        VALUES('${adminid}', 0, '${userpassword}');
        INSERT INTO user_document(userid, profileurl)
        VALUES('${adminid}', '')
        `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function enableUserAs(connection, pm_ass_id, userpassword) {
  try {
    let query = `
      INSERT INTO users(userid ,role , userpassword)
        VALUES('${pm_ass_id}', 3, '${userpassword}'); 
        INSERT INTO user_document(userid, profileurl)
        VALUES('${pm_ass_id}', '')`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function deleteUserpm(connection, pm_id) {
  try {
    let query = `
    DELETE FROM users 
    WHERE userid = '${pm_id}';
    DELETE FROM user_document WHERE user_document.userid='${pm_id}'

    `;

    const result = await connection.query(query);

    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
//filter teacher-course

async function teacherCourse(
  connection,
  teacher_id,
  course_id,
  teacher_firstname,
  teacher_lastname,
  course_name,
  major_id
) {
  try {
    let query = `SELECT teacher_courses.* , teachers.teacher_firstname,teachers.teacher_lastname , courses.course_name,courses.major_id , courses.major_id
    from teacher_courses 
    INNER JOIN teachers ON teacher_courses.teacher_id = teachers.teacher_id
	INNER JOIN courses ON teacher_courses.course_id = courses.course_id
    where courses.major_id= '${major_id}'`;
    if (teacher_id.trim() != "") {
      query += ` AND lower(trim(teacher_courses.teacher_id)) LIKE lower(trim('%${teacher_id}%'))`;
    }
    if (course_id.trim() != "") {
      query += ` AND lower(trim(teacher_courses.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (teacher_firstname.trim() != "") {
      query += ` AND lower(trim(teachers.teacher_firstname)) LIKE lower(trim('%${teacher_firstname}%'))`;
    }
    if (teacher_lastname.trim() != "") {
      query += ` AND lower(trim(teachers.teacher_lastname)) LIKE lower(trim('%${teacher_lastname}%'))`;
    }

    if (course_name.trim() != "") {
      query += ` AND lower(trim(courses.course_name)) LIKE lower(trim('%${course_name}%'))`;
      //>>>>>>> main
    }
    const res = await connection.query(query);
    // console.log(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//get Schedule by major and promotion to each student
async function getScheduleToStudents(connection, major_id, promotion) {
  try {
    const query = `SELECT tmpschedule.*,tmpclass.promotion ,tmpclass.major_id  , tmpclass.teacher_id , tmpclass.course_id , rooms.room_name,
    rooms.room_building,
     courses.course_name , concat(teachers.teacher_firstname , '' , teachers.teacher_lastname) AS teacher_fullname FROM tmpschedule 
     INNER JOIN tmpclass ON tmpschedule.class_id = tmpclass.tmpclass_id
   INNER JOIN rooms ON  tmpschedule.room = rooms.room_id
     INNER JOIN courses ON tmpclass.course_id = courses.course_id
     INNER JOIN teachers ON tmpclass.teacher_id = teachers.teacher_id
     WHERE tmpclass.major_id = '${major_id}' AND (trim(tmpclass.promotion)) = '${promotion}'`;
    const result = await connection.query(query);

    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getAllMajors(connection) {
  try {
    const query = `SELECT * FROM promotions`;
    const result = await connection.query(query);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getStdEmailForEditProfile(connection, user_id) {
  try {
    const query = `SELECT * FROM user_contact WHERE userid = '${user_id}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

//unassign teacher to course

async function unassign(connection, teacher_id, course_id) {
  try {
    const query = `DELETE FROM teacher_courses WHERE teacher_id ='${teacher_id}' AND course_id = '${course_id}'`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// update query to upload url
async function uploadFile(connection, Url, attendance_id) {
  try {
    console.log('attebdance', attendance_id)
    const query = `UPDATE attendance_report SET url='${Url}' WHERE attendance_id ='${attendance_id}'`;
    const res = await connection.query(query);
    console.log(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//update teacher
async function updateAssign(connection, teacher_id, course_id, condition) {
  // console.log('query' , query)
  try {
    const query = `UPDATE teacher_courses SET teacher_id = '${teacher_id}' WHERE course_id = '${course_id}' AND teacher_id='${condition}' RETURNING teacher_courses_id`;

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// assignment  course to teacher

async function assignmentTeacherCourse(connection, course_id, teacher_id) {
  try {
    const query = `INSERT INTO teacher_courses(teacher_id , course_id) VALUES ('${teacher_id}','${course_id}') RETURNING teacher_courses_id `;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//get teacher by id of courses
async function coursesTeachers(connection, course_id) {
  try {
    const query = `SELECT teacher_courses.* , concat(teachers.teacher_firstname, ' ', teachers.teacher_lastname) AS teacher_fullName 
    FROM teacher_courses 
    INNER JOIN teachers ON teacher_courses.teacher_id = teachers.teacher_id WHERE course_id = '${course_id}'
    `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//attendance details
async function AttendanceDetails(connection, attendance_id) {
  try {
    const query = `SELECT attendance_report.* , teachers.teacher_firstname , teachers.teacher_lastname , courses.course_name
    FROM attendance_report 
    INNER JOIN teachers ON attendance_report.teacher_id = teachers.teacher_id 
    INNER JOIN courses  ON attendance_report.course_id = courses.course_id
    WHERE attendance_id = '${attendance_id}'
    `;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//get student fullname and promotion by attendance_id
async function getStudentPromotion(connection, attendance_id) {
  try {
    const query = `SELECT attendance .* , concat(student_firstname ,' ',student_lastname) AS student_fullname 
    from attendance 
    INNER JOIN student ON attendance.student_id = student.student_id
    WHERE attendance_id = '${attendance_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getPromotion(connection, major_id, academic_year) {
  try {
    let query = `
      SELECT * FROM promotions WHERE academic_year = '${academic_year}' AND major_id='${major_id}'`;

    const result = await connection.query(query);

    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function getAllMajor(connection) {
  try {
    let query = `
      SELECT major_name, major_id FROM major`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function getTheMajors(connection) {
  try {
    let query = `
      SELECT * FROM major`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
//create courses
async function createCourse(
  connection,
  course_id,
  course_name,
  course_credit,
  major_id,
  course_type
) {
  // console.log(major_id)

  try {
    const query = `INSERT INTO courses (course_id , course_name , course_credit , major_id , course_type) VALUES ('${course_id}','${course_name}',${course_credit},${major_id} , '${course_type}')`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//ELECTIVE COURSES
async function createElective(
  connection,
  course_id,
  student_id,
  major_id,
  promotion
) {
  try {
    const query = `INSERT INTO assign_student (course_id , student_id , major_id , promotion) VALUES ('${course_id}','${student_id}' , '${major_id}' , '${promotion}') RETURNING assign_student_id`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//GET STUDENT ELECTIVE
async function ExistElective(connection, course_id, student_id) {
  try {
    const query = `SELECT * FROM assign_student 
    WHERE course_id='${course_id}' AND student_id ='${student_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//filter ElectiveStudent
// async function filterElective (
//   connection ,
//   course_id ,
//   student_firstname,
//   student_lastname ,
//   course_name
//   ){
//   try {
//     let query = `SELECT assign_student.* , student.student_firstname ,
//     student.student_lastname , courses.course_name
//     FROM assign_student
//     INNER JOIN  student ON assign_student.student_id = student.student_id
//     INNER JOIN courses ON  assign_student.course_id = courses.course_id WHERE 1=1
//     `
//     if(course_id !=""){
//       query += ` AND lower(trim(assign_student.course_id)) LIKE lower(trim('%${course_id}%'))`
//     }

//     if(student_firstname != ""){
//       query += ` AND lower(trim(student.student_firstname)) LIKE lower(trim('%${student_firstname}%'))`
//     }
//     if(student_lastname != ""){
//       query += ` AND lower(trim(student.student_lastname)) LIKE lower(trim('%${student_lastname}%'))`
//     }

//     if(course_name !=""){
//       query += `AND lower(trim(courses.course_name)) LIKE lower(trim('%${course_name}%'))`
//     }

//     const res = await connection.query(query)
//     return res

//   } catch (error) {
//     console.log("error in the query file : ", error); return
//   }
// }

async function filterElective(
  connection,
  major_id,
  course_id,
  student_firstname,
  student_lastname,
  course_name
) {
  try {
    let query = `SELECT assign_student.* , student.student_firstname , 
    student.student_lastname , courses.course_name , major.major_name , student.promotion
    FROM assign_student 
    INNER JOIN  student ON assign_student.student_id = student.student_id
	  INNER JOIN major ON student.major_id = major.major_id
    INNER JOIN courses ON  assign_student.course_id = courses.course_id
     WHERE assign_student.major_id ='${major_id}'
    `;

    if (course_id != "") {
      query += ` AND  lower(trim(assign_student.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (student_firstname) {
      query += ` AND lower(trim(student.student_firstname)) LIKE lower(trim('%${student_firstname}%')) `;
    }
    if (student_lastname) {
      query += ` AND lower(trim(student.student_lastname)) LIKE lower(trim('%${student_lastname}%'))`;
    }
    if (course_name) {
      query += ` AND lower(trim(courses.course_name) LIKE lower(trim('%${course_name}%'))`;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// check with batoul
async function getElectiveCourse(connection, major_id) {
  try {
    const query = `SELECT * FROM courses WHERE course_type = 'Elective' AND major_id = '${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getStudentByYear(connection, major_id, academic_year) {
  try {
    const query = `SELECT * FROM student WHERE major_id = '${major_id}' AND academic_year = '${academic_year}' `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getStudentAssigned(connection, promotion, major_id, course_id) {
  try {
    const query = `SELECT assign_student .* , users.access_token ,student.student_firstname , student.student_lastname FROM assign_student 
    INNER JOIN student ON assign_student.student_id = student.student_id 
    INNER JOIN users ON student.student_id = users.userid
    WHERE assign_student.promotion ='${promotion}' 
    AND assign_student.major_id='${major_id}' AND assign_student.course_id = '${course_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createPMAccount(
  connection,
  pm_id,
  pm_firstname,
  pm_lastname,
  pm_email,
  pm_status,
  userpassword,
  major_id
) {
  try {
    let query = `
    insert into program_manager(pm_id, pm_firstname, pm_lastname, pm_email, pm_status, major_id)
    values ('${pm_id}', '${pm_firstname}', '${pm_lastname}', '${pm_email}', '${pm_status}', '${major_id}') on conflict (pm_id) do nothing
    RETURNING CASE
    WHEN pm_id = '${pm_id}' THEN 'ID already exists'
    ELSE 'Conflict occurred'
    END AS message; 
    insert into users(userid, role, userpassword)
    values ('${pm_id}', '2', '${userpassword}') on conflict (userid) do nothing;

    INSERT INTO user_document(userid , profileurl)
      VALUES('${pm_id}' , ' ') on conflict (userid) do nothing
      RETURNING CASE
      WHEN userid = '${pm_id}' THEN 'ID already exists'
      ELSE 'Conflict occurred'
      END AS message; 
    `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function createExtra(connection, pm_id, major_id) {
  try {
    const query = `INSERT INTO program_manager_extra_major (pm_id , major_id) VALUES ('${pm_id}' , '${major_id}')`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function createASAccount(
  connection,
  pm_ass_id,
  pm_ass_firstname,
  pm_ass_lastname,
  pm_ass_email,
  pm_ass_status,
  userpassword,
  major_id
) {
  try {
    let query = `
    insert into program_manager_assistance(pm_ass_id, pm_ass_firstname, pm_ass_lastname, pm_ass_email, pm_ass_status, major_id)
    values ('${pm_ass_id}', '${pm_ass_firstname}', '${pm_ass_lastname}', '${pm_ass_email}', '${pm_ass_status}', '${major_id}') on conflict (pm_ass_id) do nothing
    RETURNING CASE
    WHEN pm_ass_id = '${pm_ass_id}' THEN 'ID already exists'
    ELSE 'Conflict occurred'
    END AS message; 
    insert into users(userid, role, userpassword)
    values ('${pm_ass_id}', '3', '${userpassword}') on conflict (userid) do nothing;

    INSERT INTO user_document(userid , profileurl)
      VALUES('${pm_ass_id}','') on conflict (userid) do nothing
      RETURNING CASE
      WHEN userid = '${pm_ass_id}' THEN 'ID already exists'
      ELSE 'Conflict occurred'
      END AS message; 
    `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function createAdmin(
  connection,
  adminid,
  adminemail,
  admin_firstname,
  userpassword,
  admin_lastname,
  admin_status
) {
  try {
    let query = `
    insert into admin(adminid, adminemail, admin_firstname , admin_lastname , admin_status)
    values ('${adminid}', '${adminemail}', '${admin_firstname}' , '${admin_lastname}' , '${admin_status}') on conflict (adminid) do nothing
    RETURNING CASE
    WHEN adminid = '${adminid}' THEN 'ID already exists'
    ELSE 'Conflict occurred'
    END AS message; 
    insert into users(userid, role, userpassword)
    values ('${adminid}', '0', '${userpassword}') on conflict (userid) do nothing;

    INSERT INTO user_document(userid , profileurl)
      VALUES('${adminid}' , ' ') on conflict (userid) do nothing
      RETURNING CASE
      WHEN userid = '${adminid}' THEN 'ID already exists'
      ELSE 'Conflict occurred'
      END AS message; 
    `;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

//exist PM
async function getExistPM(connection, pm_email, major_id) {
  try {
    const query = `SELECT * FROM program_manager WHERE  pm_email='${pm_email}' AND major_id= '${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getExistASPM(connection, pm_ass_email, major_id) {
  try {
    const query = `SELECT * FROM program_manager_assistance WHERE  pm_ass_email='${pm_ass_email}' AND major_id= '${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getExistTeacher(connection, teacher_mail) {
  try {
    const query = `SELECT * FROM teachers WHERE  teacher_mail='${teacher_mail}'`;

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

//filter AttendanceStudent
async function filterStudentAttendance(
  connection,
  major_id,
  student_id,
  course_name,
  teacher_firstname,
  teacher_lastname,
  attendance_date,
  present
) {
  try {
    let query = `SELECT attendance .* , attendance_report.attendance_date , courses.course_name , 
    teachers.teacher_firstname , teachers.teacher_lastname 
    FROM attendance
    INNER JOIN attendance_report ON attendance.attendance_id = attendance_report.attendance_id
    INNER JOIN teachers ON attendance_report.teacher_id = teachers.teacher_id 
    INNER JOIN courses ON  attendance_report.course_id = courses.course_id 
    WHERE attendance_report.major_id = '${major_id}' AND attendance.student_id= '${student_id}' 
    `;
    if (teacher_firstname) {
      query += ` AND lower(trim(teachers.teacher_firstname)) LIKE lower(trim('%${teacher_firstname}%')) `;
    }
    if (teacher_lastname) {
      query += ` AND lower(trim(teachers.teacher_lastname)) LIKE lower(trim('%${teacher_lastname}%')) `;
    }
    if (course_name) {
      query += ` AND lower(trim(courses.course_name)) LIKE lower(trim('%${course_name}%')) `;
    }
    if (attendance_date != "") {
      query += ` AND attendance_report.attendance_date = '${attendance_date}'`;
    }
    if (present != "") {
      query += ` AND present = ${present}`;
    }
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

//create Teacher

async function createTeacher(
  connection,
  teacher_id,
  teacher_firstname,
  teacher_mail,
  teacher_lastname,
  teacher_mobile
) {
  try {
    const query = `INSERT INTO teachers (teacher_id ,teacher_firstname , teacher_mail , teacher_lastname , mobile_number) VALUES (
      ${teacher_id},
      '${teacher_firstname}', '${teacher_mail}','${teacher_lastname}' , '${teacher_mobile}') RETURNING teacher_id , teacher_firstname , teacher_lastname , teacher_mail , mobile_number`;
    const res = await connection.query(query);
    console.log('quary', query)
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function uploadTeacher(
  connection,
  { teacher_id, teacher_firstname, teacher_mail, teacher_lastname, teacher_mobile }
) {
  try {
    const query = {
      text: `INSERT INTO teachers (teacher_id ,teacher_firstname , teacher_mail , teacher_lastname , mobile_number) VALUES (
      $1,
      $2, 
      $3,
      $4,
      $5)`,
      values: [teacher_id, teacher_firstname, teacher_mail, teacher_lastname, teacher_mobile],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//get promotion
async function getSchedulePromotion(connection, major_id, attendance_id) {
  try {
    const query = `select tmpschedule .* , tmpclass.promotion , tmpclass.major_id
    from tmpschedule 
    inner join tmpclass on tmpschedule.class_id = tmpclass.tmpclass_id 
    
    WHERE tmpschedule.attendance_id = '${attendance_id}' AND tmpclass.major_id = '${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function CreateCourse(
  connection,
  { course_id, course_name, course_credit, course_type, major_id }
) {
  try {
    const query = {
      text: `INSERT INTO courses (course_id , course_name , course_credit , major_id , course_type) VALUES 
           ($1 , $2 , $3 ,$4 , $5)`,
      values: [course_id, course_name, course_credit, major_id, course_type],
    };
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getMajor(connection, major_name) {
  try {
    const query = `SELECT * FROM major WHERE major_name='${major_name}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
//scan student
async function uploadStudent(
  connection,
  {
    student_id,
    status,
    promotion,
    academic_year,
    student_firstname,
    student_lastname,
    major_id,
  }
) {
  try {
    const query = {
      text: `
        INSERT INTO student (
        student_id , 
        status , 
        promotion , 
        academic_year , 
        student_firstname , 
        student_lastname,
        major_id
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      on conflict (student_id) do nothing
      `,

      values: [
        student_id,
        status,
        promotion,
        academic_year,
        student_firstname,
        student_lastname,
        major_id,
      ],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function uploadInfo(
  connection,
  {
    userid,
    title,
    firstname,
    fathername,
    lastname,
    maidename,
    mothername,
    gender,
    dateofbirth,
    countryofbirth,
    placeofbirth,
    registernumber,
    martialstatus,
    firstnationality,
    secondnationality,
  }
) {
  try {
    // Perform date validation and conversion
    const validDate = new Date(dateofbirth);
    if (isNaN(validDate)) {
      throw new Error("Invalid date format for dateofbirth.");
    }
    const formattedDateOfBirth = dateofbirth.toISOString().split("T")[0];

    const query = {
      text: `  
        INSERT INTO user_personal_info 
        (userid, title, firstname, fathername, lastname,
        maidename, mothername, gender, dateofbirth, countryofbirth, placeofbirth,
        registrationnumber, maritalstatus, firstnationality, secondnationality)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)  on conflict (userid) do nothing`,
      values: [
        userid,
        title,
        firstname,
        fathername,
        lastname,
        maidename,
        mothername,
        gender,
        formattedDateOfBirth,
        countryofbirth,
        placeofbirth,
        registernumber,
        martialstatus,
        firstnationality,
        secondnationality,
      ],
    };

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function uploadContact(
  connection,
  { userid, email, email_two, mobile_number, landline_number }
) {
  try {
    const query = {
      text: ` 
        INSERT INTO user_contact 
        (userid , email , email_two , mobile_number , landline_number)
        VALUES($1 , $2, $3 , $4 , $5)  on conflict (userid) do nothing`,
      values: [userid, email, email_two, mobile_number, landline_number],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function uploadEmerg(
  connection,
  {
    userid,
    prefix,
    emerg_firstname,
    emerg_middlename,
    emerg_lastname,
    emerg_phonenumber,
    emerg_relationship,
    emerg_medicalhealth,
    emerg_diseasetype,
  }
) {
  try {
    const query = {
      text: `  INSERT INTO user_emergency_contact 
        (
          userid , prefix , emerg_firstname , emerg_middlename, emerg_lastname, 
          emerg_phonenumber , emerg_relationship , emerg_medicalhealth , emerg_diseasetype
          )
        VALUES($1 , $2, $3 , $4 , $5 , $6 , $7 , $8 , $9)  on conflict (userid) do nothing`,
      values: [
        userid,
        prefix,
        emerg_firstname,
        emerg_middlename,
        emerg_lastname,
        emerg_phonenumber,
        emerg_relationship,
        emerg_medicalhealth,
        emerg_diseasetype,
      ],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function uploadEducation(
  connection,
  {
    userid,
    degree_level,
    series,
    obtain_date,
    education_country,
    establishment,
    other_establishment,
  }
) {
  try {
    const query = {
      text: ` INSERT INTO user_education 
        (userid , degree_level , series , obtain_date, education_country,establishment , other_establishment)
        VALUES($1 , $2, $3 , $4 , $5 , $6 , $7)`,
      values: [
        userid,
        degree_level,
        series,
        obtain_date,
        education_country,
        establishment,
        other_establishment,
      ],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function uploadAddress(
  connection,
  {
    userid,
    address_country,
    address_region,
    address_city,
    address_street,
    address_building,
    address_floor,
    address_postal,
  }
) {
  try {
    const query = {
      text: ` INSERT INTO user_personal_address
        (
          userid , address_country , address_region , address_city ,address_street, 
          address_building, address_floor , address_postal
          )
        VALUES($1 , $2, $3 , $4 , $5 , $6 , $7 , $8 )`,
      values: [
        userid,
        address_country,
        address_region,
        address_city,
        address_street,
        address_building,
        address_floor,
        address_postal,
      ],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function ActiveUser(connection, { userid, userpassword }) {
  try {
    const query = `INSERT INTO users(  
      userid,
      role,
      userpassword
      )VALUES (
        '${userid}',
        '1',
        '${userpassword}'
      )`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function userDocument(connection, { userid }) {
  try {
    const query = `INSERT INTO user_document (userid , profileurl) VALUES ('${userid}' , ' ') on conflict (userid) do nothing`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getAdminExist(
  connection,
  admin_firstname,
  admin_lastname,
  adminemail
) {
  try {
    const query = `SELECT * FROM admin WHERE admin_firstname='${admin_firstname}' 
    AND admin_lastname='${admin_lastname}' AND adminemail='${adminemail}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function studentExist(
  connection,

  email,
  major_id
) {
  try {
    const query = `SELECT user_contact.* , student.major_id FROM user_contact 
    INNER JOIN users ON user_contact.userid = users.userid
    INNER JOIN student ON users.userid = student.student_id
    WHERE user_contact.email='${email}' AND  student.major_id='${major_id}' `;

    // console.log("query" , query)
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function promotionExist(connection, promotion_name) {
  try {
    const query = `SELECT * FROM promotions WHERE promotion_name= '${promotion_name}'`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function isPromotionMajor(connection, promotion_name, major_id) {
  try {
    const query = `SELECT * FROM promotions WHERE promotion_name = '${promotion_name}' AND major_id = '${major_id}'`;
    const res = await connection.query(query);
    // console.log(query)
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterStudentAdmin(
  connection,
  student_id,
  status,
  promotion,
  student_firstname,
  student_lastname
) {
  try {
    let query = `
      SELECT student.* , major.major_name FROM student
      INNER JOIN major ON student.major_id = major.major_id
      WHERE 1=1`;
    if (status.trim() != "") {
      query += ` AND lower(trim(student.status)) LIKE lower(trim('%${status}%'))`;
    }
    if (student_id.trim() != "") {
      query += ` AND lower(trim(student.student_id)) LIKE lower(trim('%${student_id}%'))`;
    }

    if (promotion.trim() != "") {
      query += ` AND lower(trim(promotion)) LIKE lower(trim('%${promotion}%'))`;
    }
    if (student_firstname.trim() != "") {
      query += ` AND lower(trim(student.student_firstname)) LIKE lower(trim('%${student_firstname}%'))`;
    }
    if (student_lastname != "") {
      query += ` AND lower(trim(student.student_lastname)) LIKE lower(trim('%${student_lastname}%'))`;
    }

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function updateStatusStudent(connection, student_id, status) {
  try {
    let query = `
    UPDATE student
    SET status = '${status}'
    WHERE student_id = '${student_id}'`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function addStudentActivityToLogs(
  connection,
  student_id,
  action,
  result,
  reason,
  done_by,
  date_time
) {
  try {
    let query = `
    INSERT INTO student_logs (student_id, action, result, reason, done_by, date_time) 
    VALUES ('${student_id}' , '${action}', '${result}', '${reason}', '${done_by}', '${date_time}') `;

    const response = await connection.query(query);
    return response;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
//filter schedule
async function getScheduleByPromo(connection, promotion_name, major_id) {
  try {
    let query = `
    SELECT  tmpschedule.* , tmpclass.promotion  , tmpclass.major_id , tmpclass.teacher_id,
tmpclass.course_id , courses.course_name , courses.course_type,rooms.room_name,
rooms.room_building , teachers.teacher_firstname,teachers.teacher_lastname
FROM tmpschedule
    INNER JOIN tmpclass ON tmpschedule.class_id = tmpclass.tmpclass_id
	INNER JOIN courses ON tmpclass.course_id = courses.course_id 
	INNER JOIN teachers ON tmpclass.teacher_id = teachers.teacher_id
	INNER JOIN rooms ON tmpschedule.room = rooms.room_id
        WHERE tmpclass.major_id = '${major_id}'
    `;
    if (promotion_name != undefined && promotion_name != "") {
      query += ` AND tmpclass.promotion ='${promotion_name}'`;
    }

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createPromotion(
  connection,
  promotion_name,
  academic_year,
  major_id
) {
  try {
    const query = `INSERT INTO promotions (promotion_name , academic_year , major_id)  VALUES ('${promotion_name}' , '${academic_year}' , ${major_id}) RETURNING promotion_id ,promotion_name , major_id ,academic_year `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createMajor(connection, major_id, major_name) {
  try {
    const query = `INSERT INTO major (major_id , major_name) VALUES ('${major_id}' , '${major_name}')  RETURNING major_id , major_name`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function create(connection, table, column, value) {
  try {
    const query = `INSERT INTO ${table} (${column}) VALUES ('${value}') RETURNING course_type_id , course_type`;

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function existMajor(connection, major_name) {
  try {
    const query = `SELECT * FROM major WHERE major_name = '${major_name}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function existType(connection, value) {
  try {
    const query = `SELECT * FROM course_type  WHERE course_type ='${value}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateStudentStatus(
  connection,
  { status, graduated_year, student_id }
) {
  try {
    const query = `UPDATE student SET status = '${status}' , graduated_year='${graduated_year}' WHERE
    student_id = '${student_id}' ;


    `;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}


async function profileStudent(connection, user_id) {
  try {
    let query = `SELECT student.* , major.major_name , user_contact.mobile_number , 
      user_personal_address.address_city , user_personal_address.address_street ,
      user_personal_address.address_building  
      from student inner join user_contact on user_contact.userid = student.student_id 
      inner join user_personal_address on user_personal_address.userid = student.student_id
      inner join major on student.major_id = major.major_id
      where student.student_id = '${user_id}'

    
      `;

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updateContactAddressProfile(
  connection,
  userid,
  mobile_number,
  address
) {
  const address_city = address.split(",")[0];

  const address_street = address.split(",")[1];

  const address_building = address.split(",")[2];
  try {
    const query = `UPDATE user_contact SET  mobile_number = '${mobile_number}' WHERE userid='${userid}';
                UPDATE user_personal_address SET address_city = '${address_city}' WHERE userid='${userid}';
                UPDATE user_personal_address SET address_street ='${address_street}' WHERE userid='${userid}';
                UPDATE user_personal_address SET address_building = '${address_building}' WHERE userid='${userid}'

      `;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getStudentFromBlueForLogs(connection, student_id) {
  try {
    let query = `
    SELECT * FROM student_logs WHERE student_id = '${student_id}' AND done_by = 'Blue' `;

    const response = await connection.query(query);
    return response;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function occupiedTeacher(connection, teacherId, attendance_date) {
  try {
    const query = `SELECT tmpschedule.* , tmpclass.teacher_id FROM tmpschedule
    INNER JOIN tmpclass ON tmpschedule.class_id = tmpclass.tmpclass_id
    WHERE day='${attendance_date}' AND tmpclass.teacher_id = '${teacherId}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function occupiedRoom(connection, attendance_date, room) {
  try {
    const query = `SELECT * FROM tmpschedule WHERE room = '${room}' AND day='${attendance_date}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateStatusBlue(connection, student_id) {
  try {
    const query = `UPDATE student SET status = 'limited'  WHERE student_id = '${student_id}'`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateStatusPreBlue(connection, student_id) {
  try {
    const query = `UPDATE student SET status = 'active'  WHERE student_id = '${student_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getStudentPromotionMajor(connection, major_id, promotion) {
  try {
    const query = `SELECT * FROM student WHERE major_id = '${major_id}' AND promotion = '${promotion}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); 
    return;
  }
}
async function uploadGrades(
  connnection,
  {
    student_id,
    student_firstname,
    student_lastname,
    course_id,
    grade,
    task_name,
    gpa,
    rank,
    semester,
    academic_year,
  }
) {
  try {
    const query = `INSERT INTO student_grades (student_id , first_name , last_name , course_id , grade, task_name ,gpa , rank , semester , academic_year) 
       VALUES ('${student_id}' , '${student_firstname}' , '${student_lastname}' , '${course_id}' , '${grade}' , '${task_name}' ,'${gpa}' , '${rank}','${semester}' , '${academic_year}')
    `;
    const res = await connnection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function uploadGMPGrade(
  connection,
  {
    student_id,
    student_firstname,
    student_lastname,
    academic_year,
    course_id,
    task_name,
    grade,
    comments,
  }
) {
  try {
    const query = {
      text: `  
      INSERT INTO grades_gmp (student_id , student_firstname , student_lastname  , academic_year, course_id , grades, comments , task_name)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) `,
      values: [
        student_id,
        student_firstname,
        student_lastname,
        academic_year,
        course_id,
        grade,
        comments,
        task_name,
      ],
    };

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterGrades(
  connection,
  student_id,
  first_name,
  last_name,
  promotion,
  major_id,
  course_id,
  grades,
  task_name,
  gpa,
  rank
) {
  try {
    let query = `SELECT student_grades .* ,  student.promotion , student.major_id
      FROM student_grades
      INNER JOIN student ON student_grades.student_id = student.student_id
      WHERE student.major_id = '${major_id}'  
      `;

    if (student_id != "") {
      query += ` AND student_id = '${student_id}'`;
    }
    if (first_name) {
      query += ` AND lower(trim(first_name)) LIKE lower(trim('%${first_name}%')) `;
    }
    if (last_name) {
      query += ` AND lower(trim(last_name)) LIKE lower(trim('%${last_name}%'))`;
    }
    if (task_name) {
      query += ` AND lower(trim(task_name)) LIKE lower(trim('%${task_name}%'))`;
    }
    if (promotion) {
      query += ` AND lower(trim(student.promotion)) LIKE lower(trim('%${promotion}%'))`;
    }
    if (course_id != "") {
      query += ` AND lower(trim(courseid)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (rank != "") {
      query += ` AND lower(trim(rank)) LIKE lower(trim('%${rank}%'))`;
    }
    if (grades != "") {
      query += ` AND grade = '${grades}'`;
    }
    if (gpa != "") {
      query += ` AND gpa = '${gpa}'  `;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateGrades(
  connection,
  grade,
  GPA,
  Rank,
  student_id,
  course_id,
  taskName
) {
  try {
    const query = `UPDATE student_grades SET grade = '${grade}' , gpa='${GPA}' , rank='${Rank}' 
      WHERE student_id='${student_id}' AND course_id='${course_id}' AND task_name = '${taskName}'`;
    console.log('query', query)
    const res = await connection.query(query);
    console.log('res', res)
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function studentForRequestTranscript(connection, student_id) {
  try {
    const query = `SELECT 
    student.student_id, 
    student.major_id,
      major.major_name,
   	user_contact.email
    FROM 
    student
   INNER JOIN
    major ON student.major_id = major.major_id 
	INNER JOIN user_contact ON student.student_id = user_contact.userid
	WHERE student.student_id='${student_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getPmDetailsForRequests(connection, major_id) {
  try {
    const query = `SELECT pm_firstname, pm_lastname, pm_email, pm_id 
    FROM program_manager
    WHERE major_id = '${major_id}'
    
    UNION
    
    SELECT program_manager.pm_firstname, program_manager.pm_lastname, program_manager.pm_email, program_manager_extra_major.pm_id 
    FROM program_manager_extra_major
    INNER Join program_manager ON program_manager_extra_major.pm_id = program_manager.pm_id
    WHERE program_manager_extra_major.major_id = '${major_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function addRequestForPm(
  connection,
  pm_id,
  student_id,
  student_email,
  major_id,
  promotion,
  gpa
) {
  try {
    const query = `INSERT INTO requests (pm_id, student_id, student_email, major_id, promotion, status, gpa, type)
    VALUES ('${pm_id}', '${student_id}', '${student_email}', '${major_id}', '${promotion}', 'pending', '${gpa}', 'transcript') `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// async function getRequestsForPm(connection, pm_id) {
//   try {
//     const query = `SELECT * FROM requests WHERE pm_id='${pm_id}' `;
//     const res = await connection.query(query);
//     return res;
//   } catch (error) {
//     console.log("error in the query file : ", error); return;
//   }
// }
async function getRequestsForPm(
  connection,
  pm_id,
  req_id,
  student_id,
  student_email,
  status,
  type,
  major_id
) {
  try {
    let query = `SELECT req_id , student_id,
    student_email,
    promotion,
    gpa,
    type,
    status FROM requests 
     WHERE pm_id='${pm_id}'`;

    if (req_id != "") {
      query += ` AND req_id=${req_id}`;
    }
    if (student_id.trim() != "") {
      query += ` AND lower(trim(requests.student_id)) LIKE lower(trim('%${student_id}%'))`;
    }
    if (student_email.trim() != "") {
      query += ` AND lower(trim(requests.student_email)) LIKE lower(trim('%${student_email}%'))`;
    }

    if (status.trim() != "") {
      query += ` AND lower(trim(requests.status)) LIKE lower(trim('%${status}%'))`;
    }
    if (type != "") {
      query += ` AND type='${type}'`;
    }
    if (major_id != "") {
      query += ` AND major_id='${major_id}'`;
    }
    const res = await connection.query(query);
    // console.log(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateRequestStatus(connection, req_id, status) {
  try {
    let query = `
    UPDATE requests
    SET status = '${status}'
    WHERE req_id = ${req_id}`;

    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

async function Promotion(connection) {
  try {
    const query = `SELECT promotions.* , major.major_name 
    FROM promotions INNER JOIN  major ON 
	promotions.major_id = major.major_id`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updateUsers(connection, accessToken, user_id) {
  try {
    const query = `UPDATE users SET access_token = '${accessToken}' WHERE userid='${user_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function roleStudent(connection, majorId) {
  try {
    const query = `
    SELECT major_id,status, 
       CASE 
           WHEN major_name LIKE 'EXED%' 
           THEN substring(major_name FROM 6)
           ELSE major_name 
       END AS modified_major_name
FROM major
WHERE  major_name LIKE 'EXED%'  AND major_id != '${majorId}' AND status = 'active';

    

    `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getSendMailInfo(connection, course_id) {
  try {
    const query = `SELECT tmpclass.tmpclass_id , tmpclass.course_id , tmpclass.promotion , tmpclass.startdate , courses.course_name, student.student_id, user_contact.email, 
    teachers.teacher_firstname, teachers.teacher_lastname
    FROM tmpclass 
      JOIN courses ON tmpclass.course_id = courses.course_id
      JOIN student ON tmpclass.promotion = student.promotion
      JOIN user_contact ON student.student_id = user_contact.userid
      JOIN teachers ON tmpclass.teacher_id = teachers.teacher_id
      
    WHERE tmpclass.course_id = '${course_id}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getClassForSendMail(connection) {
  try {
    const query = `SELECT course_id, promotion, startdate FROM tmpclass`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getRoomAndTimeForSendMail(connection, class_id) {
  try {
    const query = `SELECT from_time, to_time, room_name, room_building from tmpschedule 
    JOIN rooms ON tmpschedule.room = rooms.room_id
      WHERE class_id = ${class_id}
      LIMIT 1`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getRequests(connection) {
  try {
    const query = `SELECT * FROM request`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createCertificate(connection, majorId, name) {
  try {
    const query = `INSERT INTO major (major_id , major_name) VALUES ('${majorId}' , 'EXED-${name}') RETURNING major_id , major_name , status`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updateStatusActive(connection, status, majorId) {
  try {
    const query = `UPDATE major SET status = '${status}' WHERE major_id='${majorId}'`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function Certificate(connection, major_id) {
  try {
    const query = `
    SELECT major_id,status, 
       CASE 
           WHEN major_name LIKE 'EXED%' 
           THEN substring(major_name FROM 6)
           ELSE major_name 
       END AS modified_major_name
FROM major
WHERE  major_name LIKE 'EXED%' AND major_id = '${major_id}'
    `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getGradeStudent(connection, table, studentId) {
  try {
    const query = `
    SELECT ${table}.*, courses.course_name 
    FROM ${table} 
    INNER JOIN courses ON ${table}.course_id = courses.course_id
    WHERE student_id = '${studentId}'
    `;

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterGMPGrades(
  connection,
  student_id,
  first_name,
  last_name,
  promotion,
  major_id,
  course_id,
  grades,
  task_name
) {
  try {
    let query = `SELECT grades_gmp.* ,  student.promotion , student.major_id
      FROM grades_gmp
      INNER JOIN student ON grades_gmp.student_id = student.student_id
      WHERE student.major_id = '${major_id}'  
      `;

    if (student_id != "") {
      query += ` AND student.student_id = '${student_id}'`;
    }
    if (first_name) {
      query += ` AND lower(trim(grades_gmp.student_firstname)) LIKE lower(trim('%${first_name}%')) `;
    }
    if (last_name) {
      query += ` AND lower(trim(grades_gmp.student_lastname)) LIKE lower(trim('%${last_name}%'))`;
    }
    if (task_name) {
      query += ` AND lower(trim(grades_gmp.task_name)) LIKE lower(trim('%${task_name}%'))`;
    }
    if (promotion) {
      query += ` AND lower(trim(student.promotion)) LIKE lower(trim('%${promotion}%'))`;
    }
    if (course_id != "") {
      query += ` AND lower(trim(grades_gmp.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }

    if (grades != "") {
      query += ` AND grades_gmp.grades = '${grades}'`;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function updateGradesExED(
  connection,
  table,
  grades,
  student_id,
  course_id,
  task_name
) {
  try {
    const query = `UPDATE ${table} SET grades = '${grades}' WHERE student_id = '${student_id}' AND course_id='${course_id}' AND task_name='${task_name}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function searchEmailStudent(connection, major_id, promotion_name) {
  try {
    const query = `SELECT student.*, user_contact.email
     FROM student INNER JOIN user_contact 
     ON student.student_id = user_contact.userid 

     WHERE student.major_id ='${major_id}' AND student.promotion ='${promotion_name}' AND student.status = 'active'`;
    console.log('student', query)
    const res = await connection.query(query);
    return res;

    // =======
    //      WHERE student.major_id ='${major_id}' AND student.status = 'active'`;
    //     const res = await connection.query(query);
    //     return res;
    // >>>>>>> main

    //      WHERE student.major_id ='${major_id}'`;
    //     const res = await connection.query(query);
    //     return res;
    // >>>>>>> main
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function uploadGradesRTF(
  connection,
  {
    student_id,
    student_firstname,
    student_lastname,
    academic_year,
    course_id,
    task_name,
    grade_over_20,
    grade_over_30,
  }
) {
  try {
    const query = {
      text: `  
      INSERT INTO grades_rtf (student_id , student_firstname , student_lastname  , academic_year, course_id ,task_name, grade_over_20, grade_over_30)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) `,
      values: [
        student_id,
        student_firstname,
        student_lastname,
        academic_year,
        course_id,
        task_name,
        grade_over_20,
        grade_over_30,
      ],
    };

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterRTFGrades(
  connection,
  student_id,
  first_name,
  last_name,
  promotion,
  major_id,
  course_id,
  grades_over_20,
  grades_over_30,
  task_name
) {
  try {
    let query = `SELECT grades_rtf.* ,  student.promotion , student.major_id
      FROM grades_rtf
      INNER JOIN student ON grades_rtf.student_id = student.student_id
      WHERE student.major_id = '${major_id}'  
      `;

    if (student_id != "") {
      query += ` AND student.student_id = '${student_id}'`;
    }
    if (first_name) {
      query += ` AND lower(trim(grades_rtf.student_firstname)) LIKE lower(trim('%${first_name}%')) `;
    }
    if (last_name) {
      query += ` AND lower(trim(grades_rtf.student_lastname)) LIKE lower(trim('%${last_name}%'))`;
    }
    if (task_name) {
      query += ` AND lower(trim(grades_rtf.task_name)) LIKE lower(trim('%${task_name}%'))`;
    }
    if (promotion) {
      query += ` AND lower(trim(student.promotion)) LIKE lower(trim('%${promotion}%'))`;
    }
    if (course_id != "") {
      query += ` AND lower(trim(grades_rtf.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }

    if (grades_over_20 != "") {
      query += ` AND grades_rtf.grade_over_20 = '${grades_over_20}'`;
    }

    if (grades_over_30 != "") {
      query += ` AND grades_rtf.grade_over_30 = '${grades_over_30}'`;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateGradesRTF(
  connection,
  table,
  grade_over_20,
  grade_over_30,
  student_id,
  course_id,
  task_name
) {
  try {
    const query = `UPDATE ${table} SET grade_over_20 = '${grade_over_20}' , grade_over_30 ='${grade_over_30}' WHERE student_id = '${student_id}' AND course_id='${course_id}' AND task_name='${task_name}'`;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function uplaodEXEDGrade(
  connnection,
  {
    student_id,
    student_firstname,
    student_lastname,
    course_id,
    task_name,
    academic_year,
    grades,
    comments,
  }
) {
  try {
    const query = {
      text: `  
      INSERT INTO grade_exed (student_id , student_firstname , student_lastname , course_id,task_name,academic_year , grades, comments)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) `,
      values: [
        student_id,
        student_firstname,
        student_lastname,
        course_id,
        task_name,
        academic_year,
        grades,
        comments,
      ],
    };
    const res = await connnection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function filterEXEDGrade(
  connection,
  student_id,
  first_name,
  last_name,
  promotion,
  major_id,
  course_id,
  task_name,
  grades
) {
  try {
    let query = `SELECT grade_exed.* ,  student.promotion , student.major_id
      FROM grade_exed
      INNER JOIN student ON grade_exed.student_id = student.student_id
      WHERE student.major_id = '${major_id}'  
      `;

    if (student_id != "") {
      query += ` AND student.student_id = '${student_id}'`;
    }
    if (first_name) {
      query += ` AND lower(trim(grade_exed.student_firstname)) LIKE lower(trim('%${first_name}%')) `;
    }
    if (last_name) {
      query += ` AND lower(trim(grade_exed.student_lastname)) LIKE lower(trim('%${last_name}%'))`;
    }
    if (task_name) {
      query += ` AND lower(trim(grade_exed.task_name)) LIKE lower(trim('%${task_name}%'))`;
    }
    if (promotion) {
      query += ` AND lower(trim(student.promotion)) LIKE lower(trim('%${promotion}%'))`;
    }
    if (course_id != "") {
      query += ` AND lower(trim(grade_exed.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }

    if (grades != "") {
      query += ` AND grade_exed.grades = '${grades}'`;
    }

    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

// async function getPromtionsMajor(connection, major_id, date) {
// // <<<<<<< batoul
// //   try {
// //     const query = `SELECT * FROM promotions WHERE major_id = '${major_id}' AND academic_year = '${date}'`
// //     const res = await connection.query(query)
// //     console.log('res', res)
// //     return res
// //   } catch (error) {
// //     console.log("error in the query file : ", error); return
// //   }
// // }

// // async function getMajorPMExtra(connection, pm_id) {
// //   try {
// //     const query = `SELECT program_manager_extra_major.* , major.major_name , major.status
// //     FROM program_manager_extra_major
// // 	INNER JOIN major ON program_manager_extra_major.major_id = major.major_id
// //     WHERE pm_id ='${pm_id}'
// //     `
// //     const res = await connection.query(query)

// //     return res
// //   } catch (error) {
// //     console.log("error in the query file : ", error); return
// //   }
// // }

// // async function getMajorFromPM (connection , pm_id){
// //   try {
// //     const query = `
// //     SELECT
// //         pm.pm_id,
// //         pm.pm_firstname AS name,
// //         pm.major_id AS major_id,
// //         m.major_name AS major_name
// //     FROM
// //         program_manager pm
// //     LEFT JOIN
// //         major m ON pm.major_id = m.major_id
// //     WHERE
// //         pm.pm_id = 'PM7143'

// //     UNION

// //     SELECT
// //         pmem.pm_id,
// //         pmem.pm_id AS name,
// //         pmem.major_id AS major_id,
// //         m.major_name AS major_name
// //     FROM
// //         program_manager_extra_major pmem
// //     JOIN
// //         major m ON pmem.major_id = m.major_id
// //     WHERE
// //         pmem.pm_id = '${pm_id}';
// //     `

// //     const res = await connection.query(query)
// //     return res
// // =======
//   try {
//     const query = `SELECT * FROM promotions WHERE major_id = '${major_id}' AND academic_year = '${date}'`;
//     const res = await connection.query(query);
//     console.log("res", res);
//     return res;
//   } catch (error) {
//     console.log("error in the query file : ", error); return;
//   }
// }

async function getMajorPMExtra(connection, pm_id, table, pmID) {
  try {
    const query = `SELECT ${table}.* , major.major_name , major.status
    FROM ${table} 
	INNER JOIN major ON ${table}.major_id = major.major_id
    WHERE ${pmID} ='${pm_id}'
    `;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getPromtionsMajor(connection, major_id, date) {
  try {
    const query = `SELECT * FROM promotions WHERE major_id = '${major_id}' AND academic_year = '${date}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getClassInfoForEmail(connection, class_id) {
  try {
    const query = `SELECT tmpclass.* , teachers.teacher_firstname, teachers.teacher_lastname , courses.course_name
    FROM tmpclass JOIN teachers ON tmpclass.teacher_id = teachers.teacher_id 
    JOIN courses ON tmpclass.course_id = courses.course_id
    WHERE tmpclass_id = '${class_id}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getLocationInfo(connection, room_id) {
  try {
    const query = `SELECT * FROM rooms WHERE room_id = '${room_id}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getStudentEmailsForEmailClass(connection, promo) {
  try {
    const query = `SELECT user_contact.email ,student.student_id FROM student JOIN user_contact ON student.student_id = user_contact.userid WHERE promotion = '${promo}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// <<<<<<< Hassan
async function updateEmailForEditProfile(connection, email, user_id) {
  try {
    const query = ` UPDATE user_contact
    SET email = '${email}' 
    WHERE userid = '${user_id}'`;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
// // =======
async function getMajorFromPM(connection, pm_id) {
  try {
    const query = `
    SELECT
        pm.pm_id,
        pm.pm_firstname AS name,
        pm.major_id AS major_id,
        m.major_name AS major_name
    FROM
        program_manager pm
    LEFT JOIN
        major m ON pm.major_id = m.major_id
    WHERE
        pm.pm_id = '${pm_id}'
    
    UNION
    
    SELECT
        pmem.pm_id,
        pmem.pm_id AS name,
        pmem.major_id AS major_id,
        m.major_name AS major_name
    FROM
        program_manager_extra_major pmem
    JOIN
        major m ON pmem.major_id = m.major_id
    WHERE
        pmem.pm_id = '${pm_id}';
    `;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function exportAttendanceData(
  connection,
  major_id,
  student_id,
  student_firstname,
  student_lastname,
  course_id,
  course_name,
  attendance_date,
  present
) {
  try {
    let query = `
    SELECT 
    attendance_report.*,
    attendance.student_id,
    CASE 
      WHEN attendance.present = true THEN 'Present'
      ELSE 'Absent'
    END AS attendance_status,
    student.student_firstname,
    student.student_lastname,
    courses.course_name,
    teachers.teacher_firstname,
    teachers.teacher_lastname,
    major.major_name
  FROM 
    attendance_report
    INNER JOIN courses ON attendance_report.course_id = courses.course_id
    INNER JOIN teachers ON attendance_report.teacher_id = teachers.teacher_id
    INNER JOIN major ON attendance_report.major_id = major.major_id
    INNER JOIN attendance ON attendance_report.attendance_id = attendance.attendance_id
    INNER JOIN student ON attendance.student_id = student.student_id
  WHERE 
    attendance_report.major_id ='${major_id}'`;
    if (course_id != "") {
      query += ` AND lower(trim(attendance_report.course_id)) LIKE lower(trim('%${course_id}%'))`;
    }
    if (student_id != "") {
      query += ` AND lower(trim(attendance.student_id)) LIKE lower(trim('%${student_id}%'))`;
    }
    if (student_firstname != "") {
      query += ` AND lower(trim(student.student_firstname)) LIKE lower(trim('%${student_firstname}%'))`;
    }
    if (student_lastname != "") {
      query += ` AND lower(trim(student.student_lastname)) LIKE lower(trim('%${student_lastname}%'))`;
    }
    if (course_name != "") {
      query += ` AND lower(trim(courses.course_name)) LIKE lower(trim('%${course_name}%'))`;
    }
    if (attendance_date != "") {
      query += ` AND attendance_date = '${attendance_date}'`;
    }
    if (present != "") {
      query += ` AND present = '${present}'`;
    }

    const res = connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
    // >>>>>>> main
  }
}
async function updateScheduleSharepointID(connection, sharepointId, attendanceId) {
  try {
    const query = `UPDATE tmpschedule Set sharepoint_id =${sharepointId} WHERE attendance_id ='${attendanceId}' `

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function createBooking(connection,
  { bookingId, room, space, bookingBy, date, fromTime, toTime }) {
  try {
    const query = `INSERT INTO booking (booking_id , rooms , space ,bookingby ,date_booking , from_time , to_time) VALUES (${bookingId} , '${room}' , '${space}' ,'${bookingBy}' ,'${date}' , '${fromTime}' , '${toTime}')`

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file in the createBooking function : ", error); return
  }
}
async function deleteBooking(connection) {
  try {
    const query = `DELETE FROM booking`
    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function SearchBooking(connection, space, date, fromTime, toTime) {
  try {
    const query = `SELECT * FROM booking WHERE space='${space}' AND date_booking ='${date}' AND from_time='${fromTime}' AND to_time='${toTime}'`

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file in the searchBooking function : ", error); return
  }
}
async function AddRoomFromSharePoint(connection, roomName, roomBuilding) {
  try {
    const query = `INSERT INTO rooms (room_name , room_building) VALUES ('${roomName}' , '${roomBuilding}')`

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function getRoom(connection) {
  try {
    const query = `SELECT * FROM rooms`

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}
async function deleteSharepointId(connection, attendance_id) {
  try {
    const query = `UPDATE tmpschedule
    SET sharepoint_id = NULL
    WHERE attendance_id = '${attendance_id}';
    `
    const res = await connection.query(query)
    return res

  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function updateOnlineSchedule(connection, zoom_id, zoom_url, attendance_id) {
  try {
    const query = `UPDATE tmpschedule SET zoom_meeting_id = '${zoom_id}' , zoom_url='${zoom_url}' WHERE attendance_id ='${attendance_id}'`

    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function deleteZoomId(connection, attendance_id) {
  try {
    const query = `UPDATE tmpschedule
    SET zoom_meeting_id = NULL,
    zoom_url=NULL
    WHERE attendance_id = '${attendance_id}';
    `
    const res = await connection.query(query)
    return res

  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function updateCourseType(connection, course_id, course_credit, course_name, course_type) {
  try {
    let result = connection.query(`UPDATE courses
    SET course_name ='${course_name}',
    course_credit = '${course_credit}',
    course_type='${course_type}'
    WHERE course_id = '${course_id}'`);
    return result;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function AddStudentAlumni(
  connection,
  { status, graduated_year, student_id, promotion, major_id, firstname, lastname, academic_year, email, mobile_number }
) {
  try {

    // Insert into the "student" table
    const query = `
    INSERT INTO users (userid, role)
    VALUES ('${student_id}', '1');
    INSERT INTO user_contact (userid, email , mobile_number)
    VALUES ('${student_id}', '${email}' , '${mobile_number}');
      INSERT INTO student (student_id, status, promotion, academic_year, student_firstname, student_lastname, major_id, graduated_year)
      VALUES ('${student_id}', '${status}','${promotion}', '${academic_year}' ,'${firstname}','${lastname}', '${major_id}', '${graduated_year}')
    `;
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function createExtraAS(connection, pm_id, major_id) {
  try {
    const query = `INSERT INTO program_manager_assistance_extra_major (pm_ass_id , major_id) VALUES ('${pm_id}' , '${major_id}')`;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}

async function getMajorFromAS(connection, pm_ass_id) {
  try {
    const query = `
    SELECT
        pm.pm_ass_id,
        pm.pm_ass_firstname AS name,
        pm.major_id AS major_id,
        m.major_name AS major_name
    FROM
      program_manager_assistance pm
    LEFT JOIN
        major m ON pm.major_id = m.major_id
    WHERE
        pm.pm_ass_id = '${pm_ass_id}'
    
    UNION
    
    SELECT
        pmem.pm_ass_id,
        pmem.pm_ass_id AS name,
        pmem.major_id AS major_id,
        m.major_name AS major_name
    FROM
      program_manager_assistance_extra_major pmem
    JOIN
        major m ON pmem.major_id = m.major_id
    WHERE
        pmem.pm_ass_id = '${pm_ass_id}';
    `;

    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function updateEmailForEditProfilePM(connection, email, status, mobile_number, user_id) {
  try {
    const query = ` UPDATE user_contact
    SET email = '${email}' , mobile_number ='${mobile_number}'
    WHERE userid = '${user_id}';
    UPDATE student SET status ='${status}' WHERE student_id='${user_id}' `;
    const res = await connection.query(query);

    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function ExistGrades(connection, student_id, course_id, task_name) {
  try {
    const query = `SELECT * FROM grades_gmp WHERE student_id = '${student_id}' AND course_id = '${course_id}' AND task_name='${task_name}'`

    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function ExistGradesDT(connection, student_id, course_id, task_name) {
  try {
    const query = `SELECT * FROM grades_rtf WHERE student_id = '${student_id}' AND course_id = '${course_id}' AND task_name='${task_name}'`

    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}
async function ExistGradesEXED(connection, student_id, course_id, task_name) {
  try {
    const query = `SELECT * FROM grade_exed WHERE student_id = '${student_id}' AND course_id = '${course_id}' AND task_name='${task_name}'`

    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}
async function ExistGradesStudent(connection, student_id, course_id, task_name) {
  try {
    const query = `SELECT * FROM student_grades WHERE student_id = '${student_id}' AND course_id = '${course_id}' AND task_name='${task_name}'`

    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }
}

async function insertGoogleEventDetails(connection, student_id, event_id, attendance_id) {
  try {
    const query = `INSERT INTO google_calendar (user_id , event_id , attendence_id) VALUES ('${student_id}' , '${event_id}' , '${attendance_id}')`
    console.log('query', query)
    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }

}

async function deleteGoogleEventDetails(connection, student_id) {
  try {
    const query = `DELETE google_calendar WHERE user_id = '${student_id}'`
    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return
  }

}

async function uploadStudentFinancial(
  connection,
  {
    student_id,
    pims_id,
  }
) {
  try {
    const query = {
      text: `
        INSERT INTO student_financial (
        stundent_financial_id,
        pims_id
      ) VALUES (
        $1,
        $2
      )
      `,

      values: [
        student_id,
        pims_id
      ],
    };
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function findUserRole(connection, userid) {
  try {
    const query = `SELECT * FROM users WHERE userid= '${userid}'`
    const res = await connection.query(query)
    return res
  } catch (error) {
    return error
  }
}
async function teacherReport(connection, teacher_ids, pmMajor, majorId) {
  try {
    let query = `
    SELECT tmpschedule.*, tmpclass.teacher_id, 
    teachers.teacher_firstname, 
    teachers.teacher_lastname,
    courses.course_name,
    rooms.room_name,
    rooms.room_building,
    tmpclass.promotion
    FROM tmpschedule 
    LEFT JOIN tmpclass ON tmpschedule.class_id = tmpclass.tmpclass_id 
    LEFT JOIN teachers ON tmpclass.teacher_id = teachers.teacher_id 
    LEFT JOIN courses ON tmpclass.course_id = courses.course_id
    LEFT JOIN rooms ON tmpschedule.room = rooms.room_id
    WHERE `;

    if (Array.isArray(teacher_ids) && teacher_ids.length > 0) {
      query += '(';
      for (let i = 0; i < teacher_ids.length; i++) {
        query += `tmpclass.teacher_id = '${teacher_ids[i]}'`;
        if (i !== teacher_ids.length - 1) {
          query += ' OR ';
        }
      }
      query += ')';
    } else {
      query += `tmpclass.teacher_id = '${teacher_ids}'`;
    }

    // Add the pm_id = PMmajor condition for all cases
    query += ` AND (tmpclass.major_id = '${pmMajor}' OR tmpclass.major_id = '${majorId}')`;


    const res = await connection.query(query);
    return res;
  } catch (error) {
    return error;
  }
}

async function getStudentsAndPims(connection, major_id, extra_major = 'null') {
  try {

    let query = `SELECT student.student_firstname, student.student_lastname, student.student_id, 
student_financial.pims_id from student
INNER JOIN student_financial ON student.student_id = student_financial.stundent_financial_id
where student.major_id = '${major_id}'`;
    if (extra_major !== 'null') {
      query += ` OR student.major_id = '${extra_major}'`;
    }
    const res = connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file in getStudentsAndPims function : ", error); return
  }
}
async function pmExtraMajor(connection, pmID) {
  try {
    const query = `SELECT major_id FROM program_manager_extra_major WHERE pm_id = '${pmID}'`;
    const res = await connection.query(query)
    return res;
  } catch (error) {
    console.log("error in the query file in the pmExtraMajor function : ", error); return;
  }
}


async function filterStudentAlumni(
  connection,
  id,
  firstname,
  lastname,
  major,
  promotion,
  graduationYear

) {
  try {
    let query = `
      SELECT student.*, major.major_name, user_contact.email, user_contact.mobile_number
      FROM student
      LEFT JOIN major ON student.major_id = major.major_id
      LEFT JOIN user_contact ON student_id = user_contact.userid
      WHERE student.major_id = '${major}' AND student.status='Alumni'`;

    if (id.trim() != "") {
      query += ` AND lower(trim(student_id)) LIKE lower(trim('%${id}%'))`;
    }
    if (firstname.trim() != "") {
      query += ` AND lower(trim(student_firstname)) LIKE lower(trim('%${firstname}%'))`;
    }
    if (lastname.trim() != "") {
      query += ` AND lower(trim(student_lastname)) LIKE lower(trim('%${lastname}%'))`;
    }
    if (promotion.trim() != "") {
      query += ` AND promotion = '${promotion}'`;
    }

    if (graduationYear != "") {
      query += ` AND graduated_year = '${graduationYear}'`;
    }
    const result = await connection.query(query);
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}
async function assignPM(connection, pm_id, major_id) {
  try {
    const query = `INSERT INTO program_manager_extra_major (pm_id , major_id) VALUES ('${pm_id}' , '${major_id}')`
    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function getassignPM(connection, table, pm_id, major_id) {
  try {
    const query = `SELECT * FROM ${table} WHERE pm_id = '${pm_id}' AND major_id='${major_id}'`
    const res = await connection.query(query)
    return res
  } catch (error) {
    console.log("error in the query file : ", error); return;
  }
}
async function insertMajor(connection, table, columns, values) {
  try {
    const columnList = columns.join(", ");
    const valueList = values.map((val) => `'${val}'`).join(", ");
    const result = await connection.query(
      `INSERT INTO ${table} (${columnList}) VALUES (${valueList}) 
      ON CONFLICT (major_name) DO NOTHING`
    );
    return result;
  } catch (err) {
    console.log("error in the query file : ", err); return;
  }
}

// async function getStudentStatistics(connection, major_id,promotion){
//   try {
//     const query = `SELECT s.student_id, upi.gender, upi.dateofbirth
//     FROM student s
//     INNER JOIN user_personal_info upi ON s.student_id = upi.userid
//     WHERE s.major_id = '${major_id}' AND s.promotion ='${promotion}';`
//     const res = await connection.query(query);
//     return res;
//   } catch (error) {
//     console.log("error in the query getStudentStatistics function : ", error); return;
//   }
// }

async function getStudentStatistics(connection, major_id, promotion) {
  try {
    // Base query
    let query = `SELECT s.student_id, upi.gender, upi.dateofbirth
    FROM student s
    INNER JOIN user_personal_info upi ON s.student_id = upi.userid
    WHERE s.major_id = '${major_id}'`;

    // Add promotion condition if promotion is not null
    if (promotion) {
      query += ` AND s.promotion = '${promotion}'`;
    }

    query += ';';

    // Execute the query
    const res = await connection.query(query);
    return res;
  } catch (error) {
    console.log("Error in the query getStudentStatistics function: ", error);
    return;
  }
}



async function getStudentStatisticsCompany(connection, studentIDs){
  try {
    const query = `SELECT userid, establishment 
        FROM user_education 
        WHERE userid = ANY($1)`;
        const values = [studentIDs];
    const res = await connection.query(query, values);
    return res;
  } catch (error) {
    console.log("error in the query getStudentStatistics function : ", error); return;
  }
}


/* End Postegresql */

module.exports = {
  teacherReport,
  findUserRole,
  deleteGoogleEventDetails,
  insertGoogleEventDetails,
  ExistGradesStudent,
  ExistGradesEXED,
  ExistGradesDT,
  ExistGrades,
  updateEmailForEditProfilePM,
  getMajorFromAS,
  AddStudentAlumni,
  updateCourseType,
  getRoom,
  AddRoomFromSharePoint,
  SearchBooking,
  deleteBooking,
  exportAttendanceData,
  getMajorFromPM,
  getMajorPMExtra,
  getPromtionsMajor,
  uplaodEXEDGrade,
  filterEXEDGrade,
  updateGradesRTF,
  filterRTFGrades,
  uploadGradesRTF,
  searchEmailStudent,
  updateGradesExED,
  filterGMPGrades,
  getGradeStudent,
  Certificate,
  updateStatusActive,
  createCertificate,
  roleStudent,
  updateGrades,
  uploadGrades,
  filterGrades,
  getStudentPromotionMajor,
  updateStatusPreBlue,
  updateStatusBlue,
  occupiedRoom,
  occupiedTeacher,
  updateContactAddressProfile,
  profileStudent,
  updateStudentStatus,
  existType,
  existMajor,
  create,
  createPromotion,
  isPromotionMajor,
  promotionExist,
  userDocument,
  ActiveUser,
  uploadAddress,
  uploadEducation,
  uploadEmerg,
  uploadContact,
  uploadInfo,
  uploadStudent,
  getMajor,
  Promotion,
  updateUsers,
  CreateCourse,
  addStudentActivityToLogs,
  createTeacher,
  getScheduleByPromo,
  filterStudentAttendance,
  getStudentAssigned,
  getElectiveCourse,
  createElective,
  ExistElective,
  filterElective,
  getPromotion,
  getStudentPromotion,
  createCourse,
  coursesTeachers,
  uploadTeacher,
  assignmentTeacherCourse,
  unassign,
  getSchedulePromotion,
  getScheduleToStudents,
  AttendanceView,
  filterAttendances,
  filterStudent,
  getTeachersByMajorCourse,
  getAllStudent,
  getStudentByYear,
  getAll,
  getExistCourse,
  createAttendance,
  createMajor,
  updatePresent,
  insertData,
  getCourse,
  findData,
  filterTeacher,
  AttendanceDetails,
  filterCourses,
  filterpm,
  filterassistance,
  updateStatusPM,
  updateStatusAssistance,
  enableUserpm,
  deleteUserpm,
  enableUserAs,
  newEmailToken,
  Userinfo,
  createAttendanceStudent,
  UpdateData,
  UpdateActivityTime,
  teacherCourse,
  findDataForResetPassword,
  getClassDetails,
  UpdateToken,
  newpassword,
  filterStudentAdmin,
  getCourseMajor,
  updateCourse,
  filterCourseMajor,
  createClass,
  studentExist,
  getAllCourses,
  updateStatusStudent,
  createSchedule,
  getAttendanceByCTD,
  getAllById,
  getScheduleByPM,
  updateAssign,
  deleteByID,
  addSchedule,
  updateSchedule,
  copySchedule,
  copyClass,
  UpdateAdminStatus,
  insertPromotion,
  getTeachersCourses,
  getUserTeacher,
  uploadFile,
  getExistASPM,
  getExistPM,
  getExistTeacher,
  getAllMajor,
  createASAccount,
  createPMAccount,
  getStudentFromBlueForLogs,
  createAdmin,
  filterAdmin,
  getAdminExist,
  enableUserAdmin,
  getAllMajors,
  studentForRequestTranscript,
  getPmDetailsForRequests,
  addRequestForPm,
  getRequestsForPm,
  updateRequestStatus,
  uploadGMPGrade,
  getStdEmailForEditProfile,
  getTheMajors,
  getEmailsByMajorId,
  insertNotifications,
  countNotification,
  getEmailsSender,
  getSendMailInfo,
  getClassForSendMail,
  getRoomAndTimeForSendMail,
  changeViewed,
  getRequests,
  getMajorPM,
  filterStudentForResetPassword,
  createExtra,
  getClassInfoForEmail,
  getLocationInfo,
  getStudentEmailsForEmailClass,
  updateEmailForEditProfile,
  updateScheduleSharepointID,
  createBooking,
  deleteSharepointId,
  createScheduleOnline,
  updateZoomInfo,
  updateOnlineSchedule,
  deleteZoomId,
  createExtraAS,
  uploadStudentFinancial,
  getStudentsAndPims,
  pmExtraMajor,
  filterStudentAlumni,
  assignPM,
  getassignPM,

  getPromotionByMajorId,
  getStudentStatistics,
  getStudentStatisticsCompany,
  insertMajor

};
