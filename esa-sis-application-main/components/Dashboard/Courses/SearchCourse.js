import React, { useState } from 'react';
import CoursesData from './CoursesData';

const courses = [
  {},
  {
    id: 1,
    name: 'Management',
    academicLevel: 'Undergrauate',
    desc: 'course description',
  },
  {
    id: 2,
    name: 'Business math',
    academicLevel: 'Graduate',
    desc: 'course description',
  },
  {
    id: 3,
    name: 'Statistics',
    academicLevel: 'Diploma',
    desc: 'course description',
  },
  {
    id: 4,
    name: 'Marketing',
    academicLevel: 'Diploma',
    desc: 'course description',
  },
  {
    id: 5,
    name: 'Finance',
    academicLevel: 'Diploma',
    desc: 'course description',
  },
  {
    id: 6,
    name: 'Accounting',
    academicLevel: 'Undergrauate',
    desc: 'course description',
  },
];

const SearchCourse = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [message, setMessage] = useState('');

  const searchHandler = () => {
    if (searchValue !== '') {
      const filter = courses.filter((course) => {
        return Object.values(course)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      {
        filter.length === 0 ? setMessage('No Results Found') : setMessage('');
      }

      setFilteredCourses(filter);
    }
  };

  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='flex flex-col gap-5 justify-center content-center '>
      <h1>Search Courses</h1>
      <form className='w-full mb-5'>
        <select
          className='mx-auto border border-black'
          value={searchValue}
          onChange={inputChangeHandler}
          type='text'
        >
          {courses.map((course) => (
            <option key={course.id}>{course.name}</option>
          ))}
        </select>
        <div className='flex justify-center content-center'>
          <button
            className='bg-gray-600 hover:bg-blue-700 p-2 text-white rounded-lg w-48'
            type='button'
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </form>
      {filteredCourses.length > 0 && (
        <div>
          <CoursesData courses={filteredCourses} />
        </div>
      )}
      <h2 className='text-center font-bold'>{message}</h2>
    </div>
  );
};

export default SearchCourse;
