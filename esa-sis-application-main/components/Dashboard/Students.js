/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\Students.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useState } from 'react';
// import selection_data from '../../utilities/selection_data';
import axios from 'axios';
// import CustomPagination from './Pagination';
import decrypt from '../../utilities/encrypt_decrypt/decryptText';
import StudentsList from './StudentsList';

export const Students = () => {
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [majorlist] = useState([]);
  const [statuelist] = useState([]);
  const [formData, setFormData] = useState({
    ID: '',
    // Name: '',
    Lname: '',
    Fname: '',
    from: '',
    to: '',
    major: '',
    status: '',
    promotion: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value === 'All' ? '' : value,
    });
  };
  // useEffect(() => {
  //   // Added as per owner request
  //   const handleShowAll = async () => {
  //     try {
  //       const response = await axios.get('/api/admin/listusers');
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {
  //         setUsers(incomingData);
  //         setFormData({
  //           ID: '',
  //           // Name: '',
  //           Lname: '',
  //           Fname: '',
  //           from: '',
  //           to: '',
  //           major: '',
  //           status: '',
  //         });
  //         setError('');
  //       } else {
  //         // If the server sends an empty array of users,
  //         // set the message state to indicate that no users were found
  //         setUsers([]);
  //         setError('No users found');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError(error.response.data.message);
  //     }
  //   };
  //   handleShowAll();

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/controller/majoritems');
  //       const incomingeData = JSON.parse(decrypt(response.data.data));
  //       setmajorList(incomingeData.majors);
  //       setStatueList(incomingeData.status);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('/api/admin/listusers', {
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
      const response = await axios.get('/api/admin/listusers');
      const incomingData = JSON.parse(decrypt(response.data.data));
      if (response.status === 200) {
        setUsers(incomingData);
        setFormData({
          ID: '',
          // Name: '',
          Lname: '',
          Fname: '',
          from: '',
          to: '',
          major: '',
          status: '',
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
        <div className='grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2'>
          <label>
            ID:
            <input
              className='ml-16 w-40'
              type='number'
              name='ID'
              value={formData.ID}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            First Name:
            <input
              className='ml-2 w-40 max-[850px]:ml-1'
              type='text'
              name='Fname'
              value={formData.Fname}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            Last Name:
            <input
              className='ml-1 w-40 max-[850px]:ml-1'
              type='text'
              name='Lname'
              value={formData.Lname}
              onChange={handleChange}
            ></input>
          </label>
          {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
          <label>
            Major:
            <select
              className='ml-10 w-40 max-[850px]:ml-9'
              name='major'
              value={formData.major}
              onChange={handleChange}
            >
              {majorlist.map((major, index) => (
                <option className='text-black' key={index}>
                  {major.program}
                </option>
              ))}
            </select>
          </label>
          <label>
            From:
            <input
              className='ml-12 w-40 max-[850px]:ml-10'
              type='date'
              name='from'
              value={formData.from}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            To:
            <input
              className='ml-16 w-40 max-[850px]:ml-[60px]'
              type='date'
              name='to'
              value={formData.to}
              onChange={handleChange}
            ></input>
          </label>
          {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3 pb-4  border-blue-300 border-b-2"> */}
          <label>
            Promotion:
            <input
              type='text'
              className='ml-2 w-40 max-[850px]:ml-1'
              name='promotion'
              value={formData.promotion}
              onChange={handleChange}
            ></input>
          </label>

          <label>
            Status:
            <select
              className='ml-10 w-40 max-[850px]:ml-9'
              name='status'
              value={formData.status}
              onChange={handleChange}
            >
              {statuelist.map((status, index) => (
                <option className='text-black' key={index}>
                  {status.status_name}
                </option>
              ))}
            </select>
          </label>
          <div className='flex flex-col min-[850px]:flex-row gap-4'>
            <button
              className='primary-button w-60 hover:text-white hover:font-bold'
              type='submit'
            >
              Search
            </button>
            <button
              className='primary-button  w-60 hover:text-white hover:font-bold'
              type='button'
              onClick={handleShowAll}
            >
              Show All
            </button>
          </div>
        </div>
        <StudentsList users={users} setUsers={setUsers} />
      </form>
    </>
  );
};
