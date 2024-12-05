import { parseForm, FormidableError } from "../../../lib/parse-form";
// FIXME: ADD the code to write file path and name in the database
const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  // let log = {
  //   host: req.hostname,
  //   ip: req.ip,
  //   originalUrl: req.originalUrl,

  //   method: req.method,
  //   path: req.path,
  //   url: req.url,
  //   body: req.body,
  //   params: req.params,
  //   query: req.query,
  //   response: {
  //     body: res.body,
  //   },
  // };

  // Just after the "Method Not Allowed" code
  try {
    const {
      //  fields,
      files,
    } = await parseForm(req);
    const file = files.files;
    // console.log('fields=:', fields);
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

    return res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      return res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      return res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
