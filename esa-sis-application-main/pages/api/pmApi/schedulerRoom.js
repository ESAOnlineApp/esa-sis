const { connect, disconnect } = require("../../../utilities/db");
const { getRoom, AddRoomFromSharePoint } = require('../controller/queries');
const dotenv = require("dotenv");
dotenv.config("../env");

const axios = require("axios");

const CompareRooms = (roomFromDB, roomFromSharePoint) => {
    try {
        // console.log('roomFromDB:', roomFromSharePoint);


        // Ensure roomFromDB is an array
        if (!Array.isArray(roomFromDB)) {
            throw new Error('roomFromDB is not an array');
        }
    
        // Filter new rooms to add
        const roomsToAdd = roomFromSharePoint.filter(
            (sharepointRoom) => !roomFromDB.some((dbRoom) => dbRoom.room_name === sharepointRoom.Room)
        );
       

        // Return the result
        return {
            roomsAarray: roomsToAdd
        };
    } catch (error) {
        // Handle errors and throw an error
        throw new Error(`Error in CompareRooms: ${error.message}`);
    }
};
const getAccessToken = async ()=>{
    const encodeFormData = (data) => {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    };
    try {
        const URL = process.env.TENANTID
 
  
            const tokenEndpoint = `https://accounts.accesscontrol.windows.net/${URL}/tokens/OAuth/2`;
            const data = {
                grant_type: 'client_credentials',
                client_id: process.env.SHAREPOINT_CLIENTID ,
                client_secret: process.env.SHAREPOINT_SECRET,
                resource: process.env.SHAREPOINT_SOURCES
            };
        
            const response = await axios.post(
                tokenEndpoint,
                encodeFormData(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            return  response.data.access_token
    } catch (error) {
        throw new Error(`Error in access token :${error.message}`)
    }
}

async function handler(req, res) {
    try {
        // Establish a database connection
        const connection = await connect();

        // Retrieve rooms from the database
        const databaseRoom = await getRoom(connection);
        const access_token = await getAccessToken()
      
  
        const apiUrl = `https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('Classes')/items`;

        const getRoomsResponse = await axios.get(apiUrl, {
            headers: {
                Accept: 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                Authorization: `Bearer ${access_token}`,
            },
        });
        // console.log('getRoom' , getRoomsResponse)
        
       

        // Check if the request was successful (status code 200)
        if (getRoomsResponse.status === 200) {
            // Extract JSON data from the response
            const getRoomsData = getRoomsResponse.data.d.results;
            // console.log('getRoomsData',getRoomsDatadata.d.results)
            // Continue with your logic
            const newRooms = CompareRooms(databaseRoom.rows, getRoomsData);
            
            
          
            // Add new rooms to SharePoint
            if(newRooms.roomsAarray.length >0){
                for(let i = 0 ; newRooms.roomsAarray.length ; i++){
                    
                    await AddRoomFromSharePoint(connection, newRooms.roomsAarray[i].Room , newRooms.roomsAarray[i].Title);
                }


            // Disconnect from the database
            await disconnect(connection);

            // Respond with a success message
            return res.status(201).json({
                code: 201,
                success: true,
                message: `Room Add Successfully`
            });

            }else{
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: `No new Room `
                });
            }
           
            

        } else {
            // Handle non-successful response (e.g., log an error or throw an exception)
            console.error('Failed to fetch rooms:', getRoomsResponse.statusText);
            throw new Error(`Failed to fetch rooms: ${getRoomsResponse.statusText}`);
        }


    } catch (error) {
        // Handle errors and respond with an error message
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}

// export default handler;
module.exports = handler;