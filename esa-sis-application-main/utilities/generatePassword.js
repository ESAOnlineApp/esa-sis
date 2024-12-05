/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\generatePassword.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import crypto from 'crypto';

/* Generating a random password. */
function generatePasswod(length) {
  const paternlist =
    '0123456789ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnpqrstuvwxyz#$%&()*+,-./:;<=>!?@[]^_`{|}~';
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => paternlist[x % paternlist.length])
    .join('');
}
export default generatePasswod;
