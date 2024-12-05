import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { isLogout } from '../redux/slices/userSlice';
import encrypt from '../utilities/encrypt_decrypt/encryptText';
import selection_data from '../utilities/selection_data';

// function clearLocalStorageAndSession() {
//   localStorage.clear();
//   sessionStorage.clear();
// }

export const SignOut = () => {
  const { data: session } = useSession();
  // const [session, loading] = useSession();
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center mt-2">
      {session && (
        <div className="flex justify-center uppercase rounded-lg w-50 font-normal text-sm p-1 bg-blue-300 text-white hover:bg-gray-200 hover:text-blue-800 hover:font-bold">
          <button
            onClick={async () => {
              dispatch(isLogout(true));
              const emailWas = session?.user.email;
              const role = session?.user.role;
              await signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}${selection_data.where_going_after_logout}`,
              });
              // dispatch(logoutSuccess());

              const encryptedEmail = encrypt(
                JSON.stringify({
                  email: emailWas,
                  role,
                  info: 'user signout due to Browser problem',
                })
              );
              await axios.post('/api/logger/sendInfoToLogger', {
                data: encryptedEmail,
              });
              // localStorage.clear();
              sessionStorage.clear();
            }}
          >
            Click here if the problem persists
          </button>
        </div>
      )}
      {!session && (
        // {!session && !loading && (
        <div className="flex justify-center uppercase rounded-lg w-50 font-normal text-sm p-1 bg-blue-300 text-white hover:bg-gray-200 hover:text-blue-800 hover:font-bold">
          <button
            onClick={() => {
              // localStorage.clear();
              sessionStorage.clear();
              
            }}
          >
            Clear session
            {/* Clear session and local storage */}
          </button>
        </div>
      )}
    </div>
  );
};
