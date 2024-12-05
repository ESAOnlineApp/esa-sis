/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\logger.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import selection_data from '../../utilities/selection_data';
// const fetch = require('node-fetch');
// const { env } = require('process');
const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file');
// import decrypt from '../../utilities/encrypt_decrypt/decryptText';

// try{
// Fetching the logger_max_file_size and logger_expiry_day from the API
let maxSize, maxFiles;
maxSize = '20m';
    maxFiles = '30d';
// (async () => {
//   try {
//     const response = await fetch(
//       `${env.NEXTAUTH_URL}api/controller/settingdata`
//     );
//     const data = await response.json();
//     const decryptedData = JSON.parse(decrypt(data.data));
//     maxSize = decryptedData.setting[0].logger_max_file_size;
//     maxFiles = decryptedData.setting[0].logger_expiry_day;
//   } catch (error) {
//     console.error(`Error fetching settings from API: ${error.message}`);
//     process.exit(1);
//   }
// })();

// Creating the winston logger instances
const loggerError = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winstonDaily({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: maxSize,
      maxFiles: maxFiles,

      debug: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          return `${timestamp} ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
  ],
});

const loggerInfo = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winstonDaily({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: maxSize,
      maxFiles: maxFiles,
      debug: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          return `${timestamp} ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
  ],
});

// const loggerWarning = winston.createLogger({
//   level: 'warn',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winstonDaily({
//       filename: 'logs/warn-%DATE%.log',
//       datePattern: 'DD-MM-YYYY',
//       // datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: maxSize,
//       maxFiles: maxFiles,
//       debug: true,
//     }),
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple(),
//         winston.format.printf(({ level, message, timestamp, ...meta }) => {
//           return `${timestamp} ${level}: ${message} ${
//             Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
//           }`;
//         })
//       ),
//       // debug: process.env.NODE_ENV !== 'production',
//     }),
//   ],
// });


// const sis_app_logger = winston.createLogger({
//   transports: [loggerInfo, loggerError],
// });

const sis_app_logger = {
  info: (message) => {
    loggerInfo.log({
      level: 'info',
      message: message
    });
  },
  error: (message) => {
    loggerError.log({
      level: 'error',
      message: message
    });
  }
};
export default sis_app_logger;
// }catch(error){
//   console.log('the error is in logger.js in api : ', error)
// }

