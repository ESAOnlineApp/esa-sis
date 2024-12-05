// /*
//  * Created By: KANSO Adi
//  * Project: SIS Application
//  * File: pages\api\slack\sendErrorToSlack.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// // import { IncomingWebhook } from '@slack/webhook';
// import { WebClient } from '@slack/web-api';
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';

// // import selection_data from './selection_data';

// // const SLACK_WEBHOOK_URL = selection_data.SLACK_WEBHOOK_URL;
// // const slack = new IncomingWebhook(SLACK_WEBHOOK_URL);

// // const sendErrorToSlack = async (error) => {
// //   try {
// //     const result = await slack.send({
// //       text: error.message,
// //     });
// //     // console.log(`Message sent to Slack: ${result.text}`);
// //   } catch (error) {
// //     console.error(`Error sending message to Slack: ${error}`);
// //   }
// // };
// // export default sendErrorToSlack;

// export default async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }
//   const encryptedBody = req.body.data;
//   // // console.log(encryptedBody);
//   const { text, channel } = JSON.parse(decrypt(encryptedBody));
//   // // console.log(email + ' is signing out.');
//   const webClient = new WebClient(SLACK_APP_TOKEN || SLACK_BOT_TOKEN);

//   try {
//     const result = await webClient.chat.postMessage({
//       text,
//       channel,
//     });
//     const res = await fetch(result.response_url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(text),
//     });
//     // console.log(`Message sent to Slack: ${result.text}`);
//   } catch (error) {
//     console.error(`Error sending message to Slack: ${error}`);
//   }

//   res.send({
//     message: 'logged',
//   });
// }
