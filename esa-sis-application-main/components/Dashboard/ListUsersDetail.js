import React, { useState } from 'react';
import axios from 'axios';
import selection_data from '../../utilities/selection_data';
import moment from 'moment';
// import ListUserChart from './listuserchart';

export default function ListUsersDetail() {
  const [formData, setFormData] = useState({
    Name: '',
    from: '',
    to: '',
    major: '',
    ID: '',
    status: '',
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Memoize the handleChange function so that it is only recreated if the formData state changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value === 'All' ? '' : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('/api/admin/listusers', {
        params: formData,
      })
      .then((response) => {
        // If the server sends a response with a non-empty array of users,
        // set the users state to the array of users
        if (response.data.length > 0) {
          setUsers(response.data);
          setMessage('');
          setError('');
        } else {
          // If the server sends an empty array of users,
          // set the message state to indicate that no users were found
          setUsers(null);

          setMessage('No users were found');
        }
      })
      .catch((error) => {
        console.error(error);
        // If there was an error, set the error state to the error message
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      {error && <div className="mt-5 text-red-600">{error}</div>}
      {message && <div className="mt-5">{message}</div>}

      <form onSubmit={handleSubmit} className="block">
        <label className="flex w-1/2">
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="block border-solid border-gray-300 w-full"
          />
        </label>
        <label className="flex w-1/2">
          From:
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="block border-solid border-gray-300 w-full"
          />
        </label>
        <label className="flex w-1/2">
          To:
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="block border-solid border-gray-300 w-full"
          />
        </label>
        <label className="flex w-1/2">
          Major:
          <select
            className="block border-solid border-gray-300 w-full"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
          >
            {selection_data.Academic_program.map((e) => (
              <option className="text-black" key={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label className="flex w-1/2">
          ID:
          <input
            type="text"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            className="block border-solid border-gray-300 w-full"
          />
        </label>
        <label className="flex w-1/2">
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block border-solid border-gray-300 w-full"
          >
            <option>All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
            <option value="inprogress">In Progress</option>
          </select>
        </label>
        <button
          type="submit"
          className="text-center block bg-blue-500 text-white py-2 px-4 rounded-full"
        >
          Search
        </button>
      </form>
      {users && users.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Mobile Number</th>
              <th className="px-4 py-2">Major</th>
              <th className="px-4 py-2">Promotion</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Intial Date</th>
              <th className="px-4 py-2">Submission Date</th>
              <th className="px-4 py-2">reportURL</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user.ID}</td>
                <td className="px-4 py-2">
                  {user.fname} {user.lname}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.mobileNumber}</td>
                <td className="px-4 py-2">{user.major}</td>
                <td className="px-4 py-4">{user.promotion}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">
                  {moment(user.createdAt).format('MM/DD/YYYY')}
                </td>
                <td className="px-4 py-2">
                  {moment(users.updatedAt).format('MM/DD/YYYY')}
                </td>
                <td>
                  {user.reportURL ? (
                    <a href={user.reportURL}>{user.reportURL}</a>
                  ) : (
                    'Not available'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-5 text-red-600">No users were found</div>
      )}
      {/* <ListUserChart users={users} /> */}
    </div>
  );
}
