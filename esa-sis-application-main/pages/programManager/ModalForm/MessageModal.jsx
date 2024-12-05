import React from "react";
import { BsX  , BsExclamationTriangle , BsCheckCircleFill} from "react-icons/bs";

export default function MessageModal({ setShowModal , data}) {
  
  return (
    <>
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2">
                  {/* <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3> */}
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <BsX />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {data.code === 200 ? <>
                    
                  <p className="text-yellow-500 font-bold p-2 grid place-items-center gap-4">
                  <BsExclamationTriangle className="h-24 w-24 text-yellow-500 item-center mb-3" /> {data.message}
                      
                  </p></>:<></>}
                  {data.code === 201? <><p className="text-gray-700 mb-10 font-bold p-2 grid place-items-center gap-4">
                    <BsCheckCircleFill className="h-24 w-24 text-gray-700 item-center mb-3 "/>
                      {data.message}
                  </p></>:<></>}
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    </>
  );
}