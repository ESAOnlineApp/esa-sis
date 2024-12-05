const schedule = require('node-schedule');
const roomSyncHandler = require('./schedulerRoom');


 schedule.scheduleJob({ hour: 16, minute: 30, tz: 'Asia/Beirut' }, async function () {

    try {
        const response = {
            // Mocked response object, adjust as needed
            status: () => {},
            json: () => {}
        };

         await roomSyncHandler({}, response);
   
        console.log('Room sync job completed successfully');
    } catch (error) {
        console.error('Room sync job failed:', error.message);
    }
});
