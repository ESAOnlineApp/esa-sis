/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: middleware\middleware.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { getSession } from 'next-auth/react';

const sessionMiddleware = (handler) => async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    // If the session doesn't exist, redirect to the login page
    res.writeHead(307, { Location: '/user/login' });
    res.end();
  } else {
    // If the session exists, pass control to the next handler
    return handler(req, res);
  }
};

export default sessionMiddleware;
