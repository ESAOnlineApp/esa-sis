/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\encrypt_decrypt\decryptText.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import CryptoJS from 'crypto-js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const secretKey = publicRuntimeConfig.ENCRYPT_SECRET_KEY;

export default function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}