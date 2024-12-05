import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import NavigationRef from '../utilities/NavbarRef/navigationRef';

export const ApplyNow = () => {
  const { data: session } = useSession();
  const [href, sethref] = useState();

  const userState = useSelector(
    (state) => state.persistedReducer.user_state.userState
  );

  useEffect(() => {
    sethref(
      NavigationRef(
        session?.user.role,
        session?.user.major,
        userState.user.application_Language
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.major, userState.user.application_Language]);

  return (
    <div className='flex justify-center mt-2'>
      {!session?.user.role ? (
        <Link href='/user/login'>
          <div className='flex justify-center uppercase rounded-lg w-32 font-bold text-xl p-2 bg-gray-600 text-white hover:bg-blue-700 opacity-90'>
            Login
          </div>
        </Link>
      ) : (
        <Link href={`${href}`}>
          <div className='flex justify-center uppercase rounded-lg w-92 font-bold text-xl p-2 bg-gray-600 text-white hover:bg-blue-700 opacity-90'>
            {session?.user.role === '1'
              ? 'Go To Your Dashboard'
              : 'Go To Dashbord'}
          </div>
        </Link>
      )}
    </div>
  );
};
