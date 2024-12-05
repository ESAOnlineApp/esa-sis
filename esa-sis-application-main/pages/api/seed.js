// import UserProfile from '../../models/user/ProfileModel';
// import db from '../../utilities/connectToDb';
// import data from '../../utilities/data';

// const handler = async (req, res) => {
//   await db.connect();
//   // await UserProfile.deleteMany();
//   await UserProfile.insertMany(data.profiles);
//   await db.disconnect();
//   res.send({ message: 'Seeded Successfully' });
// };
// export default handler;

const fs = require("fs");
const path = require("path");

const logDir = "../../logs"; // directory where log files are stored
const logFiles = fs.readdirSync(logDir); // get list of log files

try{
const logs = []; // array to store log objects

// iterate over log files
for (const file of logFiles) {
  // check if file name matches pattern "info-YYYY-MM-DD.log"
  const match = /^info-(\d{2}-\d{2}-\d{4})\.log$/.exec(file);
  if (match) {
    const date = match[1]; // extract date from file name
    const filePath = path.join(logDir, file); // build full file path
    const fileContent = fs.readFileSync(filePath, "utf8"); // read file contents
    const lines = fileContent.trim().split("\n"); // split into lines

    for (const line of lines) {
      const { message } = JSON.parse(line); // parse JSON and extract message
      // // console.log('message=', message);
      const parts = message.split("="); // split message into parts
      logs.push({ date, parts }); // store log object with date and parts array
    }
  }
}
}catch(error){
  console.log('the error is in seed.js in api : ', error)
}

// console.log(logs); // print array of log objects
