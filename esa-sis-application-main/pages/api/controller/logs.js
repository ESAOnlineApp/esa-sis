/*
 * Created By:MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import zlib from 'zlib';
import stream from 'stream';
const handler = nextConnect().get(async (req, res) => {
  const logtype = req.query.logtype;
  try {
    const logDir = './logs';
    const logFiles = fs.readdirSync(logDir);
    // const logs = [];
    let data = [];
    let totalLogsProcessed = 0;
    if (logtype === 'info') {
      const fileFilter = new RegExp(
        `^${logtype}-\\d{2}-\\d{2}-\\d{4}\\.log(\\.gz)?$`
      );
      const promises = logFiles.map(async (file) => {
        const match = fileFilter.exec(file);
        if (match) {
          // const date = match[1];
          const filePath = path.join(logDir, file);
          const fileStream = fs.createReadStream(filePath);
          const lineStream = fileStream.pipe(
            match[1] ? zlib.createGunzip() : new stream.PassThrough()
          );
          const lineReader = readline.createInterface({
            input: lineStream,
            crlfDelay: Infinity,
          });
          const fileLogs = [];
          lineReader.on('line', (line) => {
            const { message, level, timestamp } = JSON.parse(line);
            const parts = message.split('=');
            const formatTimestamp = (timestamp) => {
              const date = new Date(timestamp);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              return `${hours}:${minutes}:${seconds}`;
            };
            const log = {
              parts: parts,
              level: level,
              timestamp: new Date(timestamp).toISOString().split('T')[0],
              Athour: formatTimestamp(timestamp),
            };
            fileLogs.push(log);
          });

          return new Promise((resolve) => {
            lineReader.on('close', () => {
              fileLogs.forEach((log, index) => {
                const [
                  date,
                  role,
                  action,
                  email,
                  os,
                  osVersion,
                  browser,
                  browserSource,
                  device,
                ] = log.parts;
                data.push({
                  id: index + totalLogsProcessed,
                  level: log.level,
                  timestamp: date,
                  Athour: log.Athour,
                  action: action,
                  role: role,
                  email: email,
                  os: os,
                  osVersion: osVersion,
                  browser: browser,
                  browserSource: browserSource,
                  device: device,
                  date: log.timestamp,
                });
              });
              totalLogsProcessed += fileLogs.length;
              resolve();
            });
          });
        }
      });
      await Promise.all(promises);

      res.status(200).json({ message: 'success', data: data });
    } else if (logtype === 'error') {
      const fileFilter = new RegExp(
        `^${logtype}-\\d{2}-\\d{2}-\\d{4}\\.log(\\.gz)?$`
      );
      const promises = logFiles.map(async (file) => {
        const match = fileFilter.exec(file);
        if (match) {
          // const date = match[1];
          const filePath = path.join(logDir, file);
          const fileStream = fs.createReadStream(filePath);
          const lineStream = fileStream.pipe(
            match[1] ? zlib.createGunzip() : new stream.PassThrough()
          );
          const lineReader = readline.createInterface({
            input: lineStream,
            crlfDelay: Infinity,
          });
          const fileLogs = [];
          lineReader.on('line', (line) => {
            const { message, level, timestamp } = JSON.parse(line);
            const formatTimestamp = (timestamp) => {
              const date = new Date(timestamp);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              return `${hours}:${minutes}:${seconds}`;
            };
            const parts = message.split('=');
            const log = {
              parts: parts,
              level: level,
              timestamp: new Date(timestamp).toISOString().split('T')[0],
              Athour: formatTimestamp(timestamp),
            };
            fileLogs.push(log);
          });

          return new Promise((resolve) => {
            lineReader.on('close', () => {
              fileLogs.forEach((log, index) => {
                const [
                  date,
                  action,
                  role,
                  email,
                  message,
                  os,
                  osVersion,
                  browser,
                  browserSource,
                ] = log.parts;
                data.push({
                  id: index + totalLogsProcessed,
                  level: log.level,
                  timestamp: date,
                  Athour: log.Athour,
                  action: action,
                  role: role,
                  email: email,
                  message: message,
                  os: os,
                  osVersion: osVersion,
                  browser: browser,
                  browserSource: browserSource,
                  date: log.timestamp,
                });
              });
              totalLogsProcessed += fileLogs.length;
              resolve();
            });
          });
        }
      });
      await Promise.all(promises);
      res.status(200).json({ message: 'success', data: data });
    } else if (logtype === 'warn') {
      const fileFilter = new RegExp(
        `^${logtype}-\\d{2}-\\d{2}-\\d{4}\\.log(\\.gz)?$`
      );
      const promises = logFiles.map(async (file) => {
        const match = fileFilter.exec(file);
        if (match) {
          // const date = match[1];
          const filePath = path.join(logDir, file);
          const fileStream = fs.createReadStream(filePath);
          const lineStream = fileStream.pipe(
            match[1] ? zlib.createGunzip() : new stream.PassThrough()
          );
          const lineReader = readline.createInterface({
            input: lineStream,
            crlfDelay: Infinity,
          });
          const fileLogs = [];
          lineReader.on('line', (line) => {
            const { message, level, timestamp } = JSON.parse(line);
            const formatTimestamp = (timestamp) => {
              const date = new Date(timestamp);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              return `${hours}:${minutes}:${seconds}`;
            };
            const parts = message.split('=');
            const log = {
              parts: parts,
              level: level,
              timestamp: new Date(timestamp).toISOString().split('T')[0],
              Athour: formatTimestamp(timestamp),
            };
            fileLogs.push(log);
          });

          return new Promise((resolve) => {
            lineReader.on('close', () => {
              fileLogs.forEach((log, index) => {
                const [
                  date,
                  action,
                  role,
                  email,
                  message,
                  os,
                  osVersion,
                  browser,
                  browserSource,
                ] = log.parts;
                data.push({
                  id: index + totalLogsProcessed,
                  level: log.level,
                  timestamp: date,
                  Athour: log.Athour,
                  action: action,
                  role: role,
                  email: email,
                  message: message,
                  os: os,
                  osVersion: osVersion,
                  browser: browser,
                  browserSource: browserSource,
                  date: log.timestamp,
                });
              });
              totalLogsProcessed += fileLogs.length;
              resolve();
            });
          });
        }
      });
      await Promise.all(promises);
      res.status(200).json({ message: 'success', data: data });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'error', error: error });
  }
});

export default handler;
