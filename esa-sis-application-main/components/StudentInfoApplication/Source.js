// /*
//  * Created By: KANSO Adi
//  * Project: SIS Application
//  * File: components\Source.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */
// import React from 'react';
// import { useState, useReducer } from 'react';
// import useTranslation from 'next-translate/useTranslation';
// import selection_data from '../utilities/selection_data';
// import { useRouter } from 'next/router';

// const Source = ({ data, dispatch }) => {
//   let { t } = useTranslation();

//   const [isChecked, setIsChecked] = useState(false);
//   const [selectedothersource, setSelectedothersource] = useState('');
//   const [isCheckedothersource, setIsCheckedothersource] = useState(false);
//   const inpuChangeHandler = (e) => {
//     const inputValue = e.target.value;
//     // // console.log('Source=', inputValue);
//     if (inputValue === 'Other' || inputValue === 'Autre') {
//       setIsCheckedothersource(!isCheckedothersource);
//       setSelectedothersource(inputValue);
//     }
//     setIsChecked(!isChecked);
//   };

//   //  Change the dropdown menu, YUP Schema and source according to current language
//   let selection_data_source = [];
//   const router = useRouter();
//   router.locale === 'en-US'
//     ? (selection_data_source = selection_data.source_en)
//     : (selection_data_source = selection_data.source_fr);
//   let register, errors, message;
//   return (
//     <>
//       <h1 className="my-6 text-xl shadow-sm font-bold">Source</h1>
//       <div className="w-1/2 p-5 bg-gray-100">
//         <h2> {t('studentApp:source_title')}</h2>
//         {selection_data_source.map((sources, index) => (
//           <div className="mt-3" key={index}>
//             <div className="mt-2">
//               <label>
//                 <input
//                   name={sources}
//                   id={index}
//                   type="checkbox"
//                   className="mr-5"
//                   checked={isChecked[sources]}
//                   value={sources}
//                   {...register('source', {
//                     onChange: inpuChangeHandler,
//                   })}
//                 />
//                 {sources}
//               </label>
//             </div>
//           </div>
//         ))}
//         {(selectedothersource === 'Other' && isCheckedothersource) ||
//         (selectedothersource === 'Autre' && isCheckedothersource) ? (
//           <input
//             type="text"
//             className="ml-7 mt-2 h-6 border-black inline"
//             placeholder="Specfiy"
//             {...register('otherSource')}
//           ></input>
//         ) : null}
//       </div>
//       {errors && (
//         <div className="text-red-500 text-xl font-bold w-full text-center mt-4 mb-4">
//           {message}
//         </div>
//       )}
//     </>
//   );
// };

// export default Source;
