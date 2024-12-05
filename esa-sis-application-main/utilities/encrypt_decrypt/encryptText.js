/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\encrypt_decrypt\encryptText.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import CryptoJS from 'crypto-js';
import getConfig from 'next/config';

// Issue with Jest and next/config
// Try to get the publicRuntimeConfig property in config object

// const config = getConfig();
// const publicRuntimeConfig = config.publicRuntimeConfig;

// or use the default value

const { publicRuntimeConfig } = getConfig();
const secretKey = publicRuntimeConfig.ENCRYPT_SECRET_KEY;

export default function encrypt(plaintext) {
  return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
}
