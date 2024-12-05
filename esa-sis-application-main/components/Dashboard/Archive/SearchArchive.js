/*
 * Created By: Jaber Mohamad
 * Project: SIS Application
 * File: components/Admin/Archive/SearchArchive.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
import ArchiveListTable from './ArchiveListTable';

export const SearchArchive = () => {
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [majorlist, setmajorList] = useState([]);
  const [formData, setFormData] = useState({
    ID: '',
    Lname: '',
    Fname: '',
    email: '',
    from: '',
    to: '',
    major: '',
    promotion: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value === 'All' ? '' : value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/controller/majoritems');
        const incomingeData = JSON.parse(decrypt(response.data.data));
        setmajorList(incomingeData.majors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('/api/admin/archive/listusersarchive', {
        params: formData,
      });
      const incomingData = JSON.parse(decrypt(response.data.data));
      if (response.status === 200) {
        setUsers(incomingData);
        setError('');
      } else {
        setUsers([]);
        setError('No users found');
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  const handleShowAll = async () => {
    try {
      const response = await axios.get('/api/admin/archive/listusersarchive');
      const incomingData = JSON.parse(decrypt(response.data.data));
      if (response.status === 200) {
        setUsers(incomingData);
        setFormData({
          ID: '',
          Lname: '',
          Fname: '',
          email: '',
          from: '',
          to: '',
          major: '',
          promotion: '',
        });
        setError('');
      } else {
        // If the server sends an empty array of users,
        // set the message state to indicate that no users were found
        setUsers([]);
        setError('No users found');
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
          <label>
            ID:
            <input
              className="ml-[64px] w-40 max-[850px]:ml-[65px]"
              type="number"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            First Name:
            <input
              className="ml-2 w-40 max-[850px]:ml-1"
              type="text"
              name="Fname"
              value={formData.Fname}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            Last Name:
            <input
              className="ml-2 w-40 max-[850px]:ml-1"
              type="text"
              name="Lname"
              value={formData.Lname}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            Email:
            <input
              className="ml-10 w-40"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            Major:
            <select
              className="ml-10 w-40 max-[850px]:ml-9"
              name="major"
              value={formData.major}
              onChange={handleChange}
            >
              {majorlist.map((major, index) => (
                <option className="text-black" key={index}>
                  {major.program}
                </option>
              ))}
            </select>
          </label>

          <label>
            Promotion:
            <input
              type="text"
              className="ml-2 w-40 max-[850px]:ml-1"
              name="promotion"
              value={formData.promotion}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            From:
            <input
              className="ml-10 w-40"
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            To:
            <input
              className="ml-16 w-40 max-[850px]:ml-[60px]"
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
            ></input>
          </label>
          <div className="flex flex-col min-[850px]:flex-row gap-4">
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
        <ArchiveListTable users={users} setUsers={setUsers} />
      </form>
    </>
  );
};
