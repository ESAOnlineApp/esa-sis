const { connect, disconnect } = require("../../../utilities/db");
const { getLocationInfo } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const { room_id } = req.body;
    const data = await getLocationInfo(connection, room_id);

    await disconnect(connection);

    return res.status("200").send(data);
  } catch (error) {
    return res.status("401").send(error);
  }
}

export default handler;
