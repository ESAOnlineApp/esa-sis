import React from 'react';
import { GoToLogin } from './GoToLogin';

const UserAccessDenied = () => {
  return (
    <>
      <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className='text-2xl mb-4 font-bold'>Access Denied!</h1>
        <p className='text-red-700 font-bold'>Unauthorized Url</p>
        <p className='text-red-700 font-bold'>
          Click the button below to return back To Login Page.
        </p>
        <GoToLogin />
      </div>
    </>
  );
};

export default UserAccessDenied;
