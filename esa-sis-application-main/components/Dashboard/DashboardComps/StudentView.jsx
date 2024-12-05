import React from "react";
// import axios from 'axios';
import {
  PencilIcon,
  // Cog8ToothIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  // ClipboardDocumentListIcon,
  // PencilSquareIcon,
  // HandRaisedIcon,
  // UserGroupIcon,
  NewspaperIcon,
  AcademicCapIcon,
  // WalletIcon ,
  LockClosedIcon,
  PaperAirplaneIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const StudentView = () => {
  const { data: session } = useSession();

  let isLimited;
  if (session?.user.status == "limited") {
    isLimited = true;
  }
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
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col">
        {/* Main Section */}
        <Link href="/student/main">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/main"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <ComputerDesktopIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Basic Information</p>
            </div>
          </div>
        </Link>

        {/* Classes Section */}
{session?.user.pimsId &&
        <Link href="/student/financial">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/financial"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <TableCellsIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Financial</p>
            </div>
          </div>
        </Link>
}
        {/* Grades Section */}

        <Link href="/student/schedule">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center  cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/schedule"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
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

        {/* Attendance Section */}
        <Link href="/student/attendance">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/attendance"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
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
        <Link href="/student/requests">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/requests"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <PaperAirplaneIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Request</p>
            </div>
          </div>
        </Link>
        <Link href="/student/surveys">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/surveys"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </div>
            <div>
              <p> Surveys</p>
            </div>
          </div>
        </Link>

        {isExeMajor && (
          <Link href="/student/InRole">
            <div
              className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname == "/student/InRole"
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
              }`}
            >
              <div className="mr-2">
                <NewspaperIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Enrollment</p>
              </div>
            </div>
          </Link>
        )}

        {/* Payment Section */}

        {/* <Link href='/user/sis/payments'>
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  router.pathname == '/user/sis/payments'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <div className='mr-2'>
                  <PencilIcon className='h-5 w-5' />
                </div>
                <div>
                  <p>Edit Profile</p>
                </div>
              </div>
            </Link> */}

        {/* Courses */}
        {/* <Link href='/user/sis/courses'>
              <div
                className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  router.pathname == '/user/sis/courses'
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <div className='mr-2'>
                  <PencilSquareIcon className='h-5 w-5' />
                </div>
                <div>
                  <p> Register Courses</p>
                </div>
              </div>
            </Link> */}
        {/* Schedule Section */}
        {!isLimited && (
          <Link href="/student/grades">
            <div
              className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname == "/student/grades"
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
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
        )}

        {isLimited && (
          <div
            // className={`pl-2 py-3 mx-5 rounded pointer-events-none text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == '/student/grades'
            //     ? 'bg-blue-100 text-blue-500'
            //     : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'

            //   }`}
            className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
            `}
          >
            <div className="mr-2">
              <AcademicCapIcon className="h-5 w-5" />
            </div>
            <div className="flex">
              <p>Grades </p>
              <LockClosedIcon className="h-4 w-4 ml-2" />
            </div>
          </div>
        )}

        {/* Edit Profile */}

        <Link href="/student/profile">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/student/profile"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <PencilIcon className="h-5 w-5" />
            </div>
            <div>
              <p> Edit Profile</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StudentView;
