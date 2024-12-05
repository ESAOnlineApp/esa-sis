const { connect, disconnect } = require("../../../utilities/db");
const { getClassInfoForEmail } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const { class_id } = req.body;
    const data = await getClassInfoForEmail(connection, class_id);

    await disconnect(connection);

    return res.status("200").send(data);
  } catch (error) {
    return res.status("401").send(error);
  }
}

// module.exports = handler;
export default handler;
