const { connect, disconnect } = require("../../../utilities/db");
const { updateEmailForEditProfilePM } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const { email, status, mobile_number, user_id } = req.body;

   
    const data = await updateEmailForEditProfilePM(connection, email, status, mobile_number,user_id);
    // console.log(data);

    await disconnect(connection);
    return res.status("200").json(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
