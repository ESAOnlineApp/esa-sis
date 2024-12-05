/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\ExcelExport\getColumnNames.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

function getColumnNames(numCols) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const columnNames = [];

  for (let i = 0; i < numCols; i++) {
    let name = '';
    let num = i;

    while (num >= 0) {
      const remainder = num % 26;
      name = alphabet[remainder] + name;
      num = Math.floor(num / 26) - 1;
    }

    columnNames.push(name);
  }

  return columnNames;
}

export default getColumnNames;