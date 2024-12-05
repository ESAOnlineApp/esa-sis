
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import selection_data from '../utilities/selection_data';
export const ESAHome = () => {
    const router = useRouter();
    let ref;
     if (router.locale === 'fr')
           ref=selection_data.where_going_after_save_fr;
           else ref=selection_data.where_going_after_save_en;
 return (
    <div className='flex justify-center mt-2'>
      <Link href={ref}>
        <div className='flex justify-center uppercase rounded-lg w-28 font-bold text-md p-1 bg-blue-500 text-white hover:bg-gray-400 hover:text-blue-800'>
          Home
        </div>
      </Link>
    </div>
  );
};
