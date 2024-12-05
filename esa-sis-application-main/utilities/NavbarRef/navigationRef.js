/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\NavbarRef\navigationRef.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
function NavigationRef(role, major, locale) {
  let href;
  if (role === '1') {
    href = '/user/sis/main';
    return href;
  } else {
    href = '/admin/main';
    return href;
  }
}
export default NavigationRef;
