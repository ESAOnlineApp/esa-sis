/*
 * Created By: Jaber Mohamad
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/ListContent.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import selection_data from '../../../../utilities/selection_data';

const ListContent = ({ value }) => {
  const AcademicProgram = selection_data.Academic_program_inList;
  const isAcademicProgram = AcademicProgram === 'Academic Program';

  return (
    <>
      <div className="font-bold">Drop Down List Content:</div>
      {value ? (
        <div className="flex justify-center overflow-scroll max-h-96">
          <table className="table-auto min-[200px]:w-full border border-black text-center p-4 m-4">
            <thead className="text-lg">
              {isAcademicProgram ? (
                <>
                  <th className="border border-black">EN</th>
                  <th className="border border-black">FR</th>
                  <th className="border border-black">Promotion</th>
                  <th className="border border-black">Action</th>
                </>
              ) : (
                <>
                  <th className="border border-black">EN</th>
                  <th className="border border-black">FR</th>
                  <th className="border border-black">Action</th>
                </>
              )}
            </thead>
            {isAcademicProgram &&
              AcademicProgram.map((data, index) => (
                <tr
                  className="text-center mx-2 text-sm border border-black"
                  key={index}
                >
                  <td className="border border-black md:w-72 mt-5 p-1">
                    {data}
                  </td>
                  <td className="border border-black md:w-72 mt-5 p-1">
                    {data}
                  </td>
                  {isAcademicProgram ? (
                    <td className="border border-black md:w-72 mt-5 p-1">
                      Promotion
                    </td>
                  ) : null}
                  <td className="mt-5 pb-2 md:w-36">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white w-[50px] p-1 font-bold rounded-lg">
                      <SaveOutlinedIcon fontSize="small" />
                    </button>
                    <button className="bg-blue-500 mx-2 md:mt-2 hover:bg-blue-700 text-white w-[50px] p-1 font-bold rounded-lg">
                      <DeleteForeverIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      ) : (
        <div className="flex justify-center"> No Content to Show!</div>
      )}
    </>
  );
};
export default ListContent;
