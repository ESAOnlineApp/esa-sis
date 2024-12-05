const { connect, disconnect } = require("../../../utilities/db");
const { getClassForSendMail } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const data = await getClassForSendMail(connection);
    // console.log(data);

    await disconnect(connection);
    return res.status("200").json(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
// module.exports = handler;
export default handler;
