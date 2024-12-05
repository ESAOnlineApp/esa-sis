import React, { useEffect, useState } from 'react';
import { FiEdit3, FiCheck, FiX } from 'react-icons/fi';
// import dynamic from 'next/dynamic';
import axios from 'axios';
import { useSession } from 'next-auth/react';
// const ReactSpeedometer = dynamic(() => import('react-d3-speedometer'), {
//   ssr: false,
// });

const StudentProfile = () => {
  const { data: session } = useSession();

  const [studentData, setStudentData] = useState([]);
  const [showAddressError, setShowAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState('');

  const [isEditingMobileNumber, setIsEditingMobileNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');

  useEffect(() => {
    fetchStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudentData = async () => {
    try {
      const user_id = session.user.userid;
      const response = await axios.post('/api/user/studentProfile', {
        user_id,
      });
      const data = response.data.data[0];
      setStudentData(data);
      setEditedAddress(
        `${data.address_city}, ${data.address_street}, ${data.address_building}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  // const averageGrades = 60;

  const updateDetails = async () => {
    try {
      if (!editedAddress.includes(',')) {
        setAddressErrorMessage(
          'Please enter a comma between city, street, and building in the address.'
        );
        setShowAddressError(true);
        return;
      }

      const payload = {
        userid: session.user.userid,
        mobile_number: studentData.mobile_number,
        address: editedAddress,
      };
      const response = await axios.post(
        '/api/user/editProfileStudent',
        payload
      );

      if (response.data.success === true) {
        setIsEditingMobileNumber(false);
        setIsEditingAddress(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
      <div className="md:w-1/2 lg:w-2/3 md:pl-4 mb-6">
        <div className="text-center md:text-center ml-12">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {studentData.student_firstname} {studentData.student_lastname}
          </h2>
          <p className="text-gray-700 text-sm md:text-base lg:text-lg font-bold">
            {studentData.major_name}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-end lg:flex-row ">
        <div className="md:w-1/2 lg:w-1/3 md:pr-4 max-sm:overflow-auto">
{/* <<<<<<< HEAD
        
=======
>>>>>>> 049f7915655ca52c8086eba51b82a86c3f6592df */}
          {/* <ReactSpeedometer
            value={averageGrades}
            minValue={0}
            maxValue={100}
            startColor="red"
            needleTransitionDuration={9000}
            needleTransition="easeElastic"
            endColor="green"
            needleColor="blue"
            width={300}
            height={200}
            customSegmentStops={[0, 25, 50, 70, 100]}
            segmentColors={['#CCCCFF', '#89CFF0', '#4169E1', '#000080']}
            currentValueText={`Avg. Grades: ${averageGrades}%`}
            needleHeightRatio={0.6}
          /> */}
{/* <<<<<<< HEAD
          
=======
>>>>>>> 049f7915655ca52c8086eba51b82a86c3f6592df */}
        </div>
        <div className="md:w-1/2 lg:w-2/3 md:pl-4 ml-12">
          <div className="mb-4 flex items-center">
            <p className="text-primary text-sm md:text-base lg:text-lg">
              Mobile Number:
            </p>
            {isEditingMobileNumber ? (
              <div className="flex">
                <input
                  type="text"
                  value={studentData.mobile_number}
                  className="text-primary text-sm md:text-base lg:text-lg"
                  onChange={(e) =>
                    setStudentData({
                      ...studentData,
                      mobile_number: e.target.value,
                    })
                  }
                />
                <button onClick={() => updateDetails()}>
                  <FiCheck className="text-green-600 text-sm md:text-base lg:text-lg" />
                </button>
                <button onClick={() => setIsEditingMobileNumber(false)}>
                  <FiX className="text-red-600 text-sm md:text-base lg:text-lg" />
                </button>
              </div>
            ) : (
              <div className="flex">
                <p className="text-primary text-sm md:text-base lg:text-lg">
                  {studentData.mobile_number}
                </p>
                <button onClick={() => setIsEditingMobileNumber(true)}>
                  <FiEdit3 className="text-primary text-sm md:text-base lg:text-lg hover:text-third hover:font-bold" />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <p className="text-primary text-sm md:text-base lg:text-lg">
              Address:
            </p>
            {isEditingAddress ? (
              <div className="flex">
                <input
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  className="text-primary text-sm md:text-base lg:text-lg"
                />
                {showAddressError && (
                  <div className="text-red-500 text-xs md:text-sm lg:text-base mt-2">
                    {addressErrorMessage}
                  </div>
                )}
                <button onClick={() => updateDetails()}>
                  <FiCheck className="text-green-600 text-sm md:text-base lg:text-lg" />
                </button>
                <button onClick={() => setIsEditingAddress(false)}>
                  <FiX className="text-red-600 text-sm md:text-base lg:text-lg" />
                </button>
              </div>
            ) : (
              <div className="flex">
                <p className="text-primary text-sm md:text-base lg:text-lg">
                  {editedAddress}
                </p>
                <button onClick={() => setIsEditingAddress(true)}>
                  <FiEdit3 className="text-primary text-sm md:text-base lg:text-lg hover:text-third hover:font-bold" />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <p className="text-primary text-sm md:text-base lg:text-lg">
              Promotion:
            </p>
            <p className="text-primary text-sm md:text-base lg:text-lg">
              {studentData.promotion}
            </p>
          </div>

          <div className="mb-4 flex items-center">
            <p className="text-primary text-sm md:text-base lg:text-lg">
              Status:
            </p>
            <p
              className={`text-sm md:text-base lg:text-lg ${
                studentData.status === 'active'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {studentData.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
