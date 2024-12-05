/*
 * Created By: Jaber Mohamad/Mohammad Yassine
 * Project: SIS Application
 * File: components/Admin/Logs/Error/Error.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { React, useState } from "react";
import ErrorSearch from "./ErrorSearch";

const SearchError = () => {
  const [searchParams, setSearchParams] = useState({
    role: "",
    email: "",
    action: "",
    message: "",
    fromDate: "",
    toDate: "",
    browser: "",
    os: "",
  });
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const handleSubmit = async (event) => {
    await event.preventDefault();
    let newFilteredLogs = [...logs];
    if (searchParams.role) {
      newFilteredLogs = newFilteredLogs.filter(
        (log) => log.role === searchParams.role
      );
    }
    if (searchParams.email) {
      newFilteredLogs = newFilteredLogs.filter(
        (log) => log.email === searchParams.email
      );
    }
    if (searchParams.action) {
      newFilteredLogs = newFilteredLogs.filter(
        (log) => log.action === searchParams.action
      );
    }
    if (searchParams.message) {
      newFilteredLogs = newFilteredLogs.filter((log) =>
        log.message.toLowerCase().includes(searchParams.message)
      );
    }
    if (searchParams.browser) {
      newFilteredLogs = newFilteredLogs.filter(
        (log) => log.browser === searchParams.browser
      );
    }
    if (searchParams.os) {
      // console.log(searchParams.os);
      newFilteredLogs = newFilteredLogs.filter(
        (log) => log.os === searchParams.os
      );
    }
    if (searchParams.fromDate && searchParams.toDate) {
      // console.log(searchParams.os);
      newFilteredLogs = newFilteredLogs.filter(
        (log) =>
          log.date >= searchParams.fromDate && log.date <= searchParams.toDate
      );
    }
    setFilteredLogs(newFilteredLogs);
    //// console.log(newFilteredLogs)
    //return filteredLogs;
  };

  const handleSearchParamsChange = (name, value) => {
    setSearchParams((prevState) => ({ ...prevState, [name]: value }));
    // console.log(name);
    // console.log(value);
  };

  const handleLogsChange = async (newLogs) => {
    //// console.log('New logs:', newLogs);
    setLogs(newLogs);
  };

  //const Filteredlogs=async(log)=>{
  //// console.log(log)
  // return log;
  //}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ErrorSearch
          onSearchParamsChange={handleSearchParamsChange}
          handleLogsChange={handleLogsChange}
          Filteredlogs={filteredLogs}
        />
      </form>
    </>
  );
};

export default SearchError;
