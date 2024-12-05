import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CertificateModal({ closeModal, setUsers }) {
  const [certificateName, setCertificateName] = useState('')
  const [counter, setCounter] = useState(1)
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState()

  const getAllMajors = async () => {
    try {
      let majorData = await axios.get("/api/admin/adminApi/getMajor");
      majorData.data.sort((a, b) => parseInt(b.major_id) - parseInt(a.major_id)); // Sort majors in descending order
      // setMajor(majorData.data);
      // Get the largest major_id from the sorted array
      const largestMajorId = majorData.data[0].major_id;
      // Store the largest major_id in local storage
      setCounter(parseInt(largestMajorId) + 1);
      localStorage.setItem('largestMajorId', largestMajorId);
    } catch (error) {
      return error;
    }
  };


  useEffect(() => {
    getAllMajors()
  }, [])


  const handleCreateCertificate = async () => {
    try {

      const errors = {};
      if (certificateName === '') {
        errors.certificateName = "Certificate Name required";
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }


      const payload = {
        majorId: counter,
        name: certificateName
      }
      const data = await axios.post('/api/pmApi/createCertificate', payload)
    
    
      if (data.data.code === 200) {
        
        setMessage(data.data.message)
        setCertificateName('')
      } else if (data.data.code === 201) {
        const rowCertificate = {
          major_id: data.data.data.rows[0].major_id,
          status: data.data.data.rows[0].status,
          modified_major_name: data.data.data.rows[0].major_name.replace('EXED-', ' ')
        }
        setUsers((prevStatus) => [
          ...prevStatus,
          rowCertificate
          // ...data.data.data.rows.map((item) => ({
          //     ...item,
          //     major_name: majors_name
          // }))
        ]);
        setMessage(data.data.message)
        setCertificateName('')
      }

    } catch (error) {
      return error
    }
  }




  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center h-screen">
        <div className="flex items-center justify-center h-1/2 w-1/2 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Overlay */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* Modal */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            {/* Header */}
            <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-2xl font-semibold">
                Create Certificate
              </h3>
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Body */}
            <div className="px-4 pb-6 sm:p-6 sm:pb-4">
              <div className="text-center text-red-500 font-bold p-2">{message}</div>
              <p className="mt-4 text-gray-700 font-bold p-2">Enter Certificate Name</p>
              <input
                type="text"
                value={certificateName}
                onChange={(e) => {setCertificateName(e.target.value) , setFormErrors({})}}
                className="mt-2 p-2 border border-gray-300 w-full"
              />
              {formErrors.certificateName && (
                <div className="text-center text-red-500 font-bold p-2">
                  {formErrors.certificateName}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleCreateCertificate}
                className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );



}