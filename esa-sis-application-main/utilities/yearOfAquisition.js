/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\yearOfAquisition.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import selection_data from './selection_data';
function yearOfAquisition() {
  // Creating acquisition Date for bacaloreate degree
  const year = [];
  const date = new Date().getFullYear();
  for (
    let i = date - selection_data.education_Year_of_Acquisition_Limit;
    i <= date;
    i++
  ) {
    year.push(i);
  }
  return year;
}
export default yearOfAquisition;

