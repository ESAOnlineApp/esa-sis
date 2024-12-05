/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\error.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
/**
 * If the error has a response and the response has data and the data has a message, return the
 * message, otherwise return the error message.
 * @param err - The error object
 */
const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export { getError };
