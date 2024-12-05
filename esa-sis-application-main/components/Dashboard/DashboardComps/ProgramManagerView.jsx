import React from 'react';

import {
  PencilIcon,
  // Cog8ToothIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  // PencilSquareIcon,
  // HandRaisedIcon,
  UserGroupIcon,
  // NewspaperIcon,
  ClipboardDocumentIcon,
  AcademicCapIcon,
  WalletIcon,
  EnvelopeOpenIcon,
  // PaperAirplaneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

// // >>>>>>> main
const ProgramManagerView = () => {
  const { data: session } = useSession();
  const router = useRouter();






  // Function to extract the first word before a hyphen "-"
  const getFirstWordBeforeHyphen = (text) => {
    if (text) {
      const words = text.split("-");
      if (words.length > 0) {
        return words[0];
      }
    }
    return "";
  };

  const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);

  const isExeMajor = firstMajorWord === "EXED";


  return (
    <>
      <div className="flex flex-col">

        {session.user?.hasMultiMajor === 'true' ?
          <>

            <Link href="/programManager/studentView">
              {/* <Link href='/admin/courses'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/studentView' ||
                  router.pathname == '/programManager/StudentByMajor'

                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
                disabled={true}
              >
                <div className="mr-2">
                  <TableCellsIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>List of Students</p>
                </div>
              </div>
            </Link>


            {/* Users Section */}

            <Link href="/programManager/teachers">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/teachers'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Teachers</p>
                </div>
              </div>
            </Link>

            {/* financial */}

            <Link href="/programManager/financial">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/financial'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Financial</p>
                </div>
              </div>
            </Link>

            {/* Course */}

            <Link href="/programManager/courseView">
              {/* <Link href='/admin/profile'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/courseView' ||
                  router.pathname == '/programManager/CourseByMajor'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <div>
                  <p> Courses</p>
                </div>
              </div>
            </Link>

            <Link href="/programManager/History">
              {/* <Link href='/admin/profile'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                ${
                  router.pathname == '/programManager/History'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <div>
                  <p> History</p>
                </div>
              </div>
            </Link>


            {/* Class Section */}
            <Link href="/programManager/classView">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                ${router.pathname == '/programManager/classView' ||
                    router.pathname == '/programManager/ClassByMajor'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Class</p>
                </div>
              </div>
            </Link>

            <Link href="/programManager/scheduleView">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/scheduleView'
                  || router.pathname == '/programManager/ScheduleById'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Schedule</p>
                </div>
              </div>
            </Link>

            {/* Payment Section */}

            {/* <Link href="/programManager/attendance"> */}
            {/* <Link href='/admin/payments'> */}
            {/* <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/programManager/attendance'
                ? // router.pathname == '/admin/Payments'
                  'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Attendance</p>
            </div>
          </div> */}
            {/* </Link> */}
            {/*create in PM */}
            <Link href="/programManager/attendanceView">
              {/* <Link href='/admin/payments'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/attendanceView' ||
                  router.pathname == '/programManager/AttendanceById'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Attendance</p>
                </div>
              </div>
            </Link>
            <Link href="/programManager/TeacherAttendace">
              {/* <Link href='/admin/payments'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/TeacherAttendace'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Teachers Attendance</p>
                </div>
              </div>
            </Link>


            {/* course Management system */}
            {
              isExeMajor
                ?
                <>
                  <Link href="/programManager/Certificate">
                    {/* <Link href='/admin/payments'> */}
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/programManager/Certificate"

                        ? // router.pathname == '/programManager/Create/createAttendance'
                        // router.pathname == '/admin/Payments'
                        'bg-blue-100 text-blue-500'
                        : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                        }`}
                    >
                      <div className="mr-2">
                        <UserGroupIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p>Certificate</p>
                      </div>
                    </div>
                  </Link>
                </> :
                <Link href="/programManager/ViewAssign">
                  {/* <Link href='/admin/payments'> */}
                  <div
                    className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/programManager/ViewAssign" ||
                      router.pathname == '/programManager/teacherCourse'
                      ? // router.pathname == '/programManager/Create/createAttendance'
                      // router.pathname == '/admin/Payments'
                      "bg-blue-100 text-blue-500"
                      : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
                      }`}
                  >
                    <div className="mr-2">
                      <UserGroupIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p>Assign</p>
                    </div>
                  </div>
                </Link>
            }

            {/* grade */}
            <Link href="/programManager/gradeView" disabled>
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/gradeView' ||
                  router.pathname == '/programManager/GradesById'
                  ? // router.pathname == '/admin/Settings/DropDownList'
                  // router.pathname == '/programManager/downloadGrades'
                  'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <AcademicCapIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Grades</p>
                </div>
              </div>
            </Link>


            <Link href="/programManager/requests">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'
                  router.pathname == '/programManager/requests' ||

                    router.pathname == "/programManager/request"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"

                  }`}
              >
                <div className="mr-2">
                  <EnvelopeOpenIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Requests</p>
                </div>
              </div>
            </Link>

            {isExeMajor ?

              <Link href="/programManager/send">
                {/* <Link href='/admin/Settings/Settings'> */}
                <div
                  className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                    // router.pathname == '/admin/Settings/Settings' ||
                    // router.pathname == '/admin/Settings/General' ||
                    // router.pathname == '/admin/Settings/DropDownList'
                    router.pathname == '/programManager/send'

                      ? 'bg-blue-100 text-blue-500'
                      : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                    }`}
                >
                  <div className="mr-2">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p>Send</p>
                  </div>
                </div>
              </Link> : <></>
            }
            <Link href="/programManager/report">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'
                  router.pathname == '/programManager/report' ||
                    router.pathname == '/programManager/ReportById'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Reports</p>
                </div>
              </div>
            </Link>

            <Link href="/programManager/statistics">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'
                  router.pathname == '/programManager/statistics' ||
                    router.pathname == '/programManager/statistics'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Statistics</p>
                </div>
              </div>
            </Link>

            {/* Edit Profile */}
            <Link href="/programManager/profile">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'

                  router.pathname == "/programManager/profile"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"

                  }`}
              >
                <div className="mr-2">
                  <PencilIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Edit Profile</p>
                </div>
              </div>
            </Link>

            {/* Dashboard Section */}
            <Link href="/programManager/main">
              <div
                className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
             `}
              >
                <div className="mr-2">
                  <ComputerDesktopIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Main Board</p>
                </div>
              </div>
            </Link>

            {/* Settings Section */}




          </> :
          <>

            <Link href="/programManager/students">
              {/* <Link href='/admin/courses'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/students'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
                disabled={true}
              >
                <div className="mr-2">
                  <TableCellsIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>List of Students</p>
                </div>
              </div>
            </Link>

            {/* Users Section */}

            <Link href="/programManager/teachers">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/teachers'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Teachers</p>
                </div>
              </div>
            </Link>

            
            {/* financial */}

            <Link href="/programManager/financial">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/financial'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Financial</p>
                </div>
              </div>
            </Link>
            {/* Course */}

            <Link href="/programManager/courses">
              {/* <Link href='/admin/profile'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/courses'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <div>
                  <p> Courses</p>
                </div>
              </div>
            </Link>

            {/* Report Section */}

            {/* Class Section */}
            <Link href="/programManager/class">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/class'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Class</p>
                </div>
              </div>
            </Link>

            <Link href="/programManager/Schedule">
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/Schedule'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Schedule</p>
                </div>
              </div>
            </Link>
            <Link href="/programManager/TeacherAttendace">
              {/* <Link href='/admin/payments'> */}
              <div
                className={`pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/attendanceView' ||
                  router.pathname == '/programManager/TeacherAttendace'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Teachers Attendance</p>
                </div>
              </div>
            </Link>

            {/*create in PM */}
            <Link href="/programManager/Create/PMmain">
              {/* <Link href='/admin/payments'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/programManager/Create/PMmain' ||
                  router.pathname == '/programManager/Create/createAttendance' ||
                  router.pathname == '/programManager/attendance'

                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Attendance</p>
                </div>
              </div>
            </Link>


            <Link href="/programManager/History">
              {/* <Link href='/admin/profile'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                ${
                  router.pathname == '/programManager/History'
                  ? 'bg-blue-100 text-blue-500'
                  : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <div>
                  <p> History</p>
                </div>
              </div>
            </Link>

            {/* course Management system */}
            {
              isExeMajor
                ?
                <>
                  <Link href="/programManager/Certificate">
                    {/* <Link href='/admin/payments'> */}
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/programManager/Certificate"

                        ? // router.pathname == '/programManager/Create/createAttendance'
                        // router.pathname == '/admin/Payments'
                        'bg-blue-100 text-blue-500'
                        : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                        }`}
                    >
                      <div className="mr-2">
                        <UserGroupIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p>Certificate</p>
                      </div>
                    </div>
                  </Link>
                </> :
                <Link href="/programManager/ViewAssign">
                  {/* <Link href='/admin/payments'> */}
                  <div
                    className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/programManager/ViewAssign" ||
                      router.pathname == '/programManager/teacherCourse'
                      ? // router.pathname == '/programManager/Create/createAttendance'
                      // router.pathname == '/admin/Payments'
                      "bg-blue-100 text-blue-500"
                      : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
                      }`}
                  >
                    <div className="mr-2">
                      <UserGroupIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p>Assign</p>
                    </div>
                  </div>
                </Link>
            }

            {/* grade */}
            <Link href="/programManager/grades" disabled>
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  router.pathname == '/programManager/grades'
                    ? // router.pathname == '/admin/Settings/DropDownList'
                    // router.pathname == '/programManager/downloadGrades'
                    'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <AcademicCapIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Grades</p>
                </div>
              </div>
            </Link>

            <Link href="/programManager/requests">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'

                  router.pathname == "/programManager/requests"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"

                  }`}
              >
                <div className="mr-2">
                  <EnvelopeOpenIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Requests</p>
                </div>
              </div>
            </Link>

            {isExeMajor ?

              <Link href="/programManager/send">
                {/* <Link href='/admin/Settings/Settings'> */}
                <div
                  className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                    // router.pathname == '/admin/Settings/Settings' ||
                    // router.pathname == '/admin/Settings/General' ||
                    // router.pathname == '/admin/Settings/DropDownList'
                    router.pathname == '/programManager/send'
                      ? 'bg-blue-100 text-blue-500'
                      : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                    }`}
                >
                  <div className="mr-2">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p>Send</p>
                  </div>
                </div>
              </Link> : <></>
            }

            <Link href="/programManager/Repotrs">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'
                  router.pathname == '/programManager/Repotrs' ||
                    router.pathname == '/programManager/Reports'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                  }`}
              >
                <div className="mr-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Reports</p>
                </div>
              </div>
            </Link>




            {/* Edit Profile */}
            <Link href="/programManager/profile">
              {/* <Link href='/admin/Settings/Settings'> */}
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  // router.pathname == '/admin/Settings/Settings' ||
                  // router.pathname == '/admin/Settings/General' ||
                  // router.pathname == '/admin/Settings/DropDownList'

                  router.pathname == "/programManager/profile"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"

                  }`}
              >
                <div className="mr-2">
                  <PencilIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Edit Profile</p>
                </div>
              </div>
            </Link>



            {/* Dashboard Section */}
            <Link href="/programManager/main">
              <div
                className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
             `}
              >
                <div className="mr-2">
                  <ComputerDesktopIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Main Board</p>
                </div>
              </div>
            </Link>

            {/* Settings Section */}



          </>}
        {/* Courses Section */}


      </div>
    </>
  );


};

export default ProgramManagerView;
