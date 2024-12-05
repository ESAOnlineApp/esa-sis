
const { connect,disconnect } = require("../../../../utilities/db");
const { changeViewed } = require("../../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { userID } = req.query;
    const data = await changeViewed(connection, userID);
    await disconnect(connection);
    return res.status("200").json(data);
  } catch (error) {
    return res.status("401").send(error);
  }
}
// module.exports = handler;
export default handler;