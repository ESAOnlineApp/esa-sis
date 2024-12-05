import React from 'react';
import { DashboardBtn } from './DashboardBtn';

const AccessDenied = () => {
  return (
    <>
      <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className='text-2xl mb-4 font-bold'>Access Denied!</h1>
        <p className='text-red-700 font-bold'>Unauthorized Url</p>
        <p className='text-red-700 font-bold'>
          Click the button below to return back To Dashboard.
        </p>
        <DashboardBtn />
      </div>
    </>
  );
};

export default AccessDenied;

AccessDenied.getLayout = function (page) {
  return (<>{page}</>);
};


