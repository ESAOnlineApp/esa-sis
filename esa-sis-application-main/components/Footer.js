/*
 * Created By: KANSO Adi,Jaber Mohamad
 * Project: SIS Application
 * File: components\Footer.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';
export const Footer = () => {
  // Edited By Mohammad jaber to change year Automatically in the Header.
  const date = new Date().getFullYear();
  // let router = useRouter();
  return (
    <footer className='text-center h-10 shadow-inner'>
      <div className='flex justify-center align-middle items-center p-2'>
        
        <p>© {date} ESA Business School</p>
      </div>
    </footer>
  );
};
