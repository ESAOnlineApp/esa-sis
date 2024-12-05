const { connect } = require("../../../utilities/db");
const { getPmDetailsForRequests } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { major_id } = req.body;
    const data = await getPmDetailsForRequests(connection, major_id);
    // console.log(data);

    return res.status("200").json(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
// module.exports = handler;
export default handler;