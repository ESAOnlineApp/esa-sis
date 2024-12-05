import Link from 'next/link';
import React from 'react';

export const GoToLogin = () => {
  return (
    <div className='flex justify-center mt-2'>
      <Link href='/user/login'>
        <div className='flex justify-center uppercase rounded-lg w-28 font-bold text-md p-1 bg-blue-500 text-white hover:bg-gray-400 hover:text-blue-800'>
          Go To Login
        </div>
      </Link>
    </div>
  );
};
