
import Link from 'next/link';
import React from 'react';

export default function PMmain() {
  return (
    <>
      <div className="flex items-center justify-center h-[300px] gap-6">
        <div className="flex font-bold text-xl">
          <Link href="/programManager/Create/createAttendance">
            <button
              className="primary-button hover:text-white hover:font-bold  justify-center text-white font-bold py-2 px-4 border-b-4 border-red-700  rounded uppercase"
              type="button"
            >
              Create Attendance
            </button>
          </Link>
        </div>

        <div className="flex font-bold text-xl">
          <Link href="/programManager/attendance">
            <button
              className="primary-button hover:text-white hover:font-bold  justify-center text-white font-bold py-2 px-4 border-b-4 border-red-700  rounded uppercase"
              type="button"
            >
              View or Edit attendance
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
PMmain.auth = true;
PMmain.adminOnly = true;
