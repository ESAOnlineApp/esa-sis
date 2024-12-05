/*
 * Created By: Batoul Hareb
 * Project: SIS Application
 * File: pages\api\controller\queries.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
const { occupiedRoom } = require("../../controller/queries");
import moment from "moment-timezone";
const OccupiedRoom = async( 
    connection , 
    attendance_date,
    fromTime,
    toTime,
    room

    )=>{
      try{
        let occupied = false;
        const roomAvailability = await occupiedRoom(connection ,  attendance_date ,room );
        console.log('room',roomAvailability)
        
        for (let i = 0; i < roomAvailability.rowCount; i++) {
          
          const inputStart = moment(fromTime, "HH:mm:ss");

          const inputEnd = moment(toTime, "HH:mm:ss");

          const startTime = moment(roomAvailability.rows[i].from_time, "HH:mm:ss");
       
          const endTime = moment(roomAvailability.rows[i].to_time, "HH:mm:ss");
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
        console.log('in the roomOccupied.js in exist in pmApi: ',error)  
    }
}
export default OccupiedRoom;




