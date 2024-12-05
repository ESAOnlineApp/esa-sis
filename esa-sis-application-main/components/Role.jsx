/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Role() {
  const [certificate, setCertificate] = useState([]);
  const { data: session } = useSession();

  const fetchCertificate = async () => {
    try {
      const payload = {
        majorId: session.user?.majorid,
      };
      const response = await axios.post('/api/user/Certificate', payload);
      setCertificate(response.data.data.rows);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const constructCertificateURL = (majorName) => {
    // Remove 'Exe-' from majorName
    const cleanedMajorName = majorName.replace('Exe-', '');

    // Construct the URL based on the cleaned majorName
    return `https://www.esa.edu.lb/french/executive-education/certificates/${cleanedMajorName}`;
  };
  const constructCertificateName = (majorName) => {
    // Remove 'Exe-' from majorName
    const cleanedMajorName = majorName.replace('Exe-', '');

    // Construct the URL based on the cleaned majorName
    return cleanedMajorName;
  };

  return (
    <>
      <div className="flex flex-row justify-center p-6">
        <div className="max-w-screen-lg flex flex-row space-x-4 space-y-4 justify-center ">
          {certificate.length > 0 &&
            certificate.map((item, index) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src="/docs/images/blog/image-1.jpg"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {constructCertificateName(item.major_name)}
                    </h5>
                  </a>
                  {item.major_name !== 'Exe' && (
                    <a
                      href={constructCertificateURL(item.major_name)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
