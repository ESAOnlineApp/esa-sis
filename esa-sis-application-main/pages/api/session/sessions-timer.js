/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\api\session\sessions-timer.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import axios from 'axios';

const SESSION_DURATION = 4 * 60 * 1000; // 5 minutes in milliseconds
let timer;

// Start the sessions timer
export const startSessionsTimer = () => {
  try{
  // Clear any existing timer to prevent duplicates
  if (timer) clearTimeout(timer);

  // Set a new timer for the session duration
  timer = setTimeout(async () => {
    // Make a request to the check-sessions API route
    try {
      await axios.get('/api/session/check-sessions');
    } catch (error) {
      console.error(error);
    }

    // Restart the sessions timer
    startSessionsTimer();
  }, SESSION_DURATION);
  }catch(error){
    console.log('the error is in sessions-timer.js in session in api : ', error)
    return
  }
};
