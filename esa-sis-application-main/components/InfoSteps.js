// Created by: Kanso Adi,
// Date: 05/10/2022
// Purpose:

import React from 'react';

export default function InfoSteps({ activeStep = 0 }) {
  const infoSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  // const infoSteps = [
  //   'Information academique/Academic Information',
  //   'Informations personnelles/ Personal information',
  //   'Adresse/ Address',
  //   'Informations de contact/ Contact information',
  //   'Informations démographiques/ Demographics',
  //   'Information sur la citoyenneté/ Citizenship Information',
  //   'Langues / Languages',
  //   'Résultats des tests/ Tests results',
  //   'Emergency Contacts',
  // ];
  // const infoSteps = [
  //   [
  //     'Information academique/Academic Information',
  //     'Informations personnelles/ Personal information',
  //   ],
  //   ['Adresse/ Address', 'Informations de contact/ Contact information'],
  //   [
  //     'Informations démographiques/ Demographics',
  //     'Information sur la citoyenneté/ Citizenship Information',
  //     'Langues / Languages',
  //     'Résultats des tests/ Tests results',
  //     'Emergency Contacts',
  //   ],
  // ];

  return (
    <div className="mb-5 flex flex-wrap">
      {infoSteps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-indigo-500   text-indigo-500'
           : 'border-gray-400 text-gray-400'
       }
          
       `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
