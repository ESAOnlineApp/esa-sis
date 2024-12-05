/*
 * Created By: Batoul Hareb
 * Project: SIS Application
 * File: pages\api\controller\queries.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
const { occupiedTeacher } = require("../../controller/queries");
import moment from "moment-timezone";
const OccupiedTeacher = async( 
    connection , 
    attendance_date, 
    teacherId, 
    fromTime, 
    toTime

    )=>{
      try{
        let occupied = false;

        const teacherAvailability = await occupiedTeacher(connection , teacherId , attendance_date);

        for (let i = 0; i < teacherAvailability.rowCount; i++) {
          
          const inputStart = moment(fromTime, "HH:mm:ss");

          const inputEnd = moment(toTime, "HH:mm:ss");

          const startTime = moment(teacherAvailability.rows[i].from_time, "HH:mm:ss");
       
          const endTime = moment(teacherAvailability.rows[i].to_time, "HH:mm:ss");
          if (
            inputStart.isBetween(startTime, endTime) ||
            inputStart.isSame(startTime) ||
            inputStart.isSame(endTime) ||
            inputEnd.isBetween(startTime, endTime) ||
            inputEnd.isSame(startTime) ||
            inputEnd.isSame(endTime) ||
            (inputStart.isBefore(startTime) && inputEnd.isAfter(startTime))
          ) {
            occupied = true;
          }
        }
        return occupied;
      } catch (error) {
        console.log('in the teacherOccupied.js in exist in pmApi: ',error)  
        return;
    }
    

}
export default OccupiedTeacher;