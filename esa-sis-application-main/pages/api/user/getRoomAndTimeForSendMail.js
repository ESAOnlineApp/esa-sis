const { connect, disconnect } = require("../../../utilities/db");
const { getRoomAndTimeForSendMail } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const { class_id } = req.body;

    const data = await getRoomAndTimeForSendMail(connection, class_id);
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
