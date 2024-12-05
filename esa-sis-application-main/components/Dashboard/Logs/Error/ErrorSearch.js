/*
 * Created By: Jaber Mohamad/Mohammad Yassine
 * Project: SIS Application
 * File: components/Admin/Logs/Error/ErrorSearch.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { React, useState } from 'react';
import ErrorListTable from './ErrorListTable';
const ErrorSearch = ({
  onSearchParamsChange,
  Filteredlogs,
  handleLogsChange,
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onSearchParamsChange(name, value);
  };
  const [showAll, setShowAll] = useState(0);
  const handleShowAll = async () => {
    setShowAll(1);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-3 min-[850px]:grid-cols-2 min-[1340px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
        <label>
          Role:
          <select
            className="ml-12 w-40"
            name="role"
            onChange={handleInputChange}
          >
            <option></option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </label>

        <label>
          Email:
          <input
            type="email"
            className="ml-8 w-40 max-[850px]:ml-10"
            name="email"
            onChange={handleInputChange}
          />
        </label>

        {/* <label>
          Action:
          <select
            className="ml-7 w-40"
            name="action"
            onChange={handleInputChange}
          >
            <option></option>
          </select>
        </label> */}

        <label>
          Message:
          <input
            type="text"
            className="ml-3 w-40 max-[850px]:ml-4"
            name="message"
            onChange={handleInputChange}
          />
        </label>

        <label>
          From Date:
          <input
            className="ml-1 w-40"
            type="date"
            name="fromDate"
            onChange={handleInputChange}
          />
        </label>

        <label>
          To Date:
          <input
            className=" ml-4 w-40 max-[850px]:ml-6"
            type="date"
            name="toDate"
            onChange={handleInputChange}
          ></input>
        </label>

        <label>
          Browser:
          <select
            className="ml-4 w-40 max-[900px]:ml-5"
            name="browser"
            onChange={handleInputChange}
          >
            <option></option>
            <option>Chrome</option>
            <option>Firefox</option>
            <option>Microsoft Edge</option>
            <option>Safari</option>
            <option>Opera</option>
            <option>Internet Explorer</option>
            <option>Brave</option>
          </select>
        </label>

        <label>
          OS:
          <select className="ml-14 w-40" name="os" onChange={handleInputChange}>
            <option></option>
            <option>Windows</option>
            <option>macOS</option>
            <option>Linux</option>
            <option>Ubuntu</option>
            <option>iOS</option>
            <option>Android</option>
          </select>
        </label>

        <div className="flex gap-4">
          <button
            className="primary-button w-60 hover:text-white hover:font-bold"
            type="submit"
          >
            Search
          </button>

          <button
            className="primary-button  w-60 hover:text-white hover:font-bold"
            type="button"
            onClick={handleShowAll}
          >
            Show All
          </button>
        </div>
      </div>
      <ErrorListTable
        handleLogsChange={handleLogsChange}
        Filteredlogs={Filteredlogs}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </>
  );
};

export default ErrorSearch;
