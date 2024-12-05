const { connect, disconnect } = require("../../../utilities/db");
const { createBooking } = require("../controller/queries");
const moment = require('moment-timezone');

async function handler(req, res) {

  try {
    
    // const { booking } = req.body;
    // console.log('tryBooking', booking)
    const connection = await connect();

    for (const currentBooking of req.body) {
      if (currentBooking && currentBooking.Id) {
        const formattedDate = moment(currentBooking.BookingDate).format('YYYY-MM-DDT00:00:00[Z]');
        await createBooking(connection, {
          bookingId: currentBooking.Id,
          room: currentBooking.Title,
          space: currentBooking.Space,
          bookingBy: currentBooking.BookedBy,
          date: formattedDate,
          fromTime: currentBooking.FromTime,
          toTime: currentBooking.ToTime
        });
      } else {
        console.log("Invalid booking element:", currentBooking);
      }
    }

    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}

export default handler;
