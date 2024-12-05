import SendEmailTo from "./scheduleConf";

const { connect, disconnect } = require("../../../../utilities/db");

const cron = require("node-cron");

let isScheduled = false;

async function handler(req, res) {
  try {
    const { emails, content } = req.body;
  
    const cronSchedule = '30 10 * * *'; // Updated cron expression for 2:55 PM

    if (!cronSchedule) {
      return res.status(200).json({
        success: false,
        code: 200,
        message: "Missing 'cronSchedule' in the request body.",
      });
    }

    if (!isScheduled) {
      cron.schedule(cronSchedule, async () => {
        try {
          const connection = await connect();

          // Call the SendEmailTo function
          await SendEmailTo(emails, content);
        

          disconnect(connection);
          console.log("Email sent successfully.");
        } catch (error) {
          console.error("Error sending email:", error);
          return;
        }
      });

      isScheduled = true;
    }

    return res.status(200).send("Scheduled email sending task.");
  } catch (error) {
    console.error("Error in the handler:", error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  }
}

export default handler;
