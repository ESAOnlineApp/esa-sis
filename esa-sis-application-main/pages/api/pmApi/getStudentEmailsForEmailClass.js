const { connect, disconnect } = require("../../../utilities/db");
const { getStudentEmailsForEmailClass } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();

    const { promo } = req.body;
    const data = await getStudentEmailsForEmailClass(connection, promo);

    await disconnect(connection);

    return res.status("200").send(data);
  } catch (error) {
    return res.status("401").send(error);
  }
}

// module.exports = handler;
export default handler;
