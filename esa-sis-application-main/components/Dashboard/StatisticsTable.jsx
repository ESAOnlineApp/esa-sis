/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";

const StatisticsTable = ({ theselMajor, promotionValue, themalepercent, thefemalepercent, theAvg,companyStats }) => {
 
  return (
    <>
<table className="min-w-full table-auto bg-white rounded-lg overflow-hidden shadow-lg mt-3">
    <thead className="bg-secondary text-white">
        <tr>
            <th className="p-4 text-left">MajorName</th>
            <th className="p-4 text-left">Promotion</th>
            <th className="p-4 text-left">Male Ratio</th>
            <th className="p-4 text-left">Female Ratio</th>
            <th className="p-4 text-left">Average Age</th>
            {companyStats.map((element, index) => {
                return <th key={index} className="p-4 text-left">{element.establishment}</th>
            })}
        </tr>
    </thead>
    <tbody className="text-gray-700">
        <tr className="hover:bg-gray-100">
            <td className="p-4 border-t border-gray-300">{theselMajor}</td>
            <td className="p-4 border-t border-gray-300">{promotionValue}</td>
            <td className="p-4 border-t border-gray-300">{themalepercent}</td>
            <td className="p-4 border-t border-gray-300">{thefemalepercent}</td>
            <td className="p-4 border-t border-gray-300">{theAvg}</td>
            {companyStats.map((element,index) => {
                return <th key={index} className="p-4 text-left">{element.percentage} %</th>
            })}
        </tr>
    </tbody>
</table>
    </>
  );
};

export default StatisticsTable;
