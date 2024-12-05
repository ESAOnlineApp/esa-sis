/*
 * Created By: Jaber Mohamad
 * Project: SIS Application
 * File: components\GradeTable.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';

const GradeTable = () => {
  return (
    <>
      <table className="table-auto w-full border border-full text-center mt-5">
        <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <th className=" px-6"></th>
            <th className=" px-6">Math</th>
            <th className=" px-6">Hist</th>
            <th className=" px-6">Geo</th>
            <th className=" px-6">Economie (optional)</th>
            <th className=" px-6">Mean / 20</th>
            <th className=" px-6">Range</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <th>Second*</th>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <select className="w-full">
                <option></option>
              </select>
            </td>
          </tr>

          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="w-full">Premiere*</th>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <select className="w-full">
                <option></option>
                <option>one</option>
              </select>
            </td>
          </tr>

          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="w-full">Terminale*</th>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <select className="w-full">
                <option></option>
                <option>one</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GradeTable;
