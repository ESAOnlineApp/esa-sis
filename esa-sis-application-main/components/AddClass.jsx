import React from "react";
import CustomSelectBox from "../pages/programManager/customSelectBox";

export default function AddClass({
  promotion,
  handlePromotionClass,
  dateFrom,
  handleDateFromChange,
  dateTo,
  handleDateToChange,
  courses,
  handleCourse,
  teachers,
  handleTeacher,
  handleCancel,
  handleSave,
  // error,
  errorCourse,
  errorTeacher,
  errorStart,
  errorEnd,
  errorPromotion,
}) {
  // const handleCancel = () => {
  //     setOpen(false)
  // }


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-full max-w-4xl mx-auto my-6">
          {/* Modal content */}
          <div className="border border-gray-300 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-gray-700 text-3xl font-bold">Create Class</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleCancel()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 flex-auto">
              {/* Form fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Course:</label>
                  <CustomSelectBox
                    options={courses}
                    placeholder="Select Course"
                    onSelect={handleCourse}
                    styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    enable={false}
                  />
                  <div className="text-red-500 mt-1">{errorCourse}</div>
                </div>
                <div>
                  <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Teacher:</label>
                  <CustomSelectBox
                    options={teachers}
                    placeholder="Select Teacher"
                    onSelect={handleTeacher}
                    styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    enable={false}
                  />
                  <div className="text-red-500 mt-1">{errorTeacher}</div>
                </div>
                <div>
                  <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Promotion:</label>
                  <CustomSelectBox
                    options={promotion}
                    placeholder="Select Promotion"
                    onSelect={handlePromotionClass}
                    styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    enable={false}
                  />
                  <div className="text-red-500 mt-1">{errorPromotion}</div>
                </div>

              </div>
              <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2 lg:pr-2">
                    <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Start Date:</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={handleDateFromChange}
                      className="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    />
                    <div className="text-red-500 mt-1">{errorStart}</div>
                  </div>
                  <div className="w-full lg:w-1/2 lg:pl-2">
                    <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">End Date:</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={handleDateToChange}
                      className="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    />
                    <div className="text-red-500 mt-1">{errorEnd}</div>
                  </div>
                </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
              <button
                className="primary-button btnCol text-white hover:text-white hover:font-bold mr-4"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                type="button"
                onClick={() => handleCancel()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
  
  
  
}
